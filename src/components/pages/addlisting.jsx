import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { supabase } from "../../utils/supabase";
import sustain from "../../assets/3726696.jpg";
import { Skeleton } from "primereact/skeleton";
import { Card } from "primereact/card";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------- LAZY ---------------- */
const Toast = lazy(() =>
  import("primereact/toast").then((m) => ({ default: m.Toast }))
);
const InputText = lazy(() =>
  import("primereact/inputtext").then((m) => ({ default: m.InputText }))
);
const InputTextarea = lazy(() =>
  import("primereact/inputtextarea").then((m) => ({ default: m.InputTextarea }))
);
const Dropdown = lazy(() =>
  import("primereact/dropdown").then((m) => ({ default: m.Dropdown }))
);
const InputNumber = lazy(() =>
  import("primereact/inputnumber").then((m) => ({ default: m.InputNumber }))
);
const Button = lazy(() =>
  import("primereact/button").then((m) => ({ default: m.Button }))
);
const Divider = lazy(() =>
  import("primereact/divider").then((m) => ({ default: m.Divider }))
);
const Root = lazy(() => import("../structure/root"));

/* ---------------- ANIMATED BUTTON ---------------- */
const AnimatedButton = ({ children, loading, onClick, ...props }) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 300 }}
    onClick={onClick}
    {...props}
    className={`relative overflow-hidden ${props.className}`}
  >
    <motion.div
      className="absolute inset-0 bg-white/10 opacity-0"
      whileHover={{ opacity: 1 }}
    />
    {loading ? <i className="pi pi-spin pi-spinner" /> : children}
  </motion.button>
);

const AddListing = () => {
  const toast = useRef(null);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: null,
    description: "",
    transactionType: "Rent",
    price: null,
    location: "",
    condition: "Like New",
  });

  const categoryOptions = [
    { label: "Tools", value: "Tools" },
    { label: "Electronics", value: "Electronics" },
    { label: "Outdoor Gear", value: "Outdoor Gear" },
    { label: "Vehicle", value: "Vehicle" },
    { label: "Home Goods", value: "Home Goods" },
  ];

  /* ---------------- DRAFT ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("listing_draft");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  const saveDraft = () => {
    localStorage.setItem("listing_draft", JSON.stringify(formData));
    toast.current.show({ severity: "info", summary: "Draft Saved" });
  };

  /* ---------------- VALIDATION ---------------- */
  const isValid = () => {
    const checks = {
      title: formData.title.trim().length >= 3,
      price: Number(formData.price) > 0,
      location: formData.location.trim().length >= 2,
      category: !!formData.category,
    };

    console.log("VALIDATION CHECK:", checks);

    return Object.values(checks).every(Boolean);
  };

  /* ---------------- FILE HANDLING ---------------- */
  const handleFiles = (files) => {
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));

    if (!imgs.length) return;

    if (attachments.length + imgs.length > 10) {
      toast.current.show({ severity: "warn", summary: "Max 10 images" });
      return;
    }

    const mapped = imgs.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...mapped]);
  };

  const removeAttachment = (i) => {
    URL.revokeObjectURL(attachments[i].preview);
    setAttachments((prev) => prev.filter((_, idx) => idx !== i));
  };

  /* ---------------- UPLOAD ---------------- */
  const uploadImages = async (uid) => {
    const urls = [];

    for (const att of attachments) {
      const path = `${uid}/${Date.now()}-${att.file.name}`;
      const { error } = await supabase.storage
        .from("listings")
        .upload(path, att.file);

      if (!error) {
        const { data } = supabase.storage.from("listings").getPublicUrl(path);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    console.log("FORM DATA:", formData);

    if (!isValid) {
      console.warn("Validation failed");
      toast.current.show({
        severity: "warn",
        summary: "Invalid input",
      });
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("USER:", user);

    if (!user) {
      toast.current.show({
        severity: "error",
        summary: "Login required",
      });
      return;
    }

    setLoading(true);

    try {
      const images = attachments.length ? await uploadImages(user.id) : [];

      const finalData = {
        ...formData,
        price: Number(formData.price),
        images,
        uid: user.id,
        userEmail: user.email,
        userName: user.user_metadata?.name || "Anonymous",
        createdAt: new Date().toISOString(),
      };

      console.log("SENDING:", finalData);

      const { data, error } = await supabase
        .from("items")
        .insert([finalData])
        .select();

      if (error) {
        console.error("INSERT ERROR:", error);
        throw error;
      }

      console.log("SUCCESS:", data);

      toast.current.show({
        severity: "success",
        summary: "Listing created!",
      });
    } catch (err) {
      console.error("FINAL ERROR:", err);
      toast.current.show({
        severity: "error",
        summary: "Failed",
      });
    }

    setLoading(false);
  };

  return (
    <Suspense fallback={<Skeleton height="100vh" />}>
      <Root />
      <Toast ref={toast} />

      <Card className="pt-32 pb-24 px-6">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-4xl font-extrabold mb-8">Post a Listing</p>
          <Divider />
        </motion.header>

        <div className="flex flex-col lg:grid lg:grid-cols-10 gap-12">
          {/* MAIN */}
          <div className="lg:col-span-8 space-y-8">
            {/* TITLE */}
            <InputText
              value={formData.title}
              placeholder="Enter item title..."
              className="w-full p-4"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            {/* CATEGORY */}
            <Dropdown
              value={formData.category}
              options={categoryOptions}
              placeholder="Select category"
              onChange={(e) => setFormData({ ...formData, category: e.value })}
              className="w-full"
            />

            {/* DESCRIPTION */}
            <InputTextarea
              value={formData.description}
              placeholder="Describe your item..."
              rows={4}
              className="w-full p-4"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            {/* TRANSACTION */}
            <div className="flex gap-2">
              {["Rent", "Sell", "Share"].map((type) => (
                <motion.button
                  key={type}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    backgroundColor:
                      formData.transactionType === type ? "#6366f1" : "#e5e7eb",
                    color: formData.transactionType === type ? "#fff" : "#111",
                  }}
                  className="flex-1 py-3 rounded-lg font-bold"
                  onClick={() =>
                    setFormData({ ...formData, transactionType: type })
                  }
                >
                  {type}
                </motion.button>
              ))}
            </div>

            {/* PRICE */}
            <InputNumber
              value={formData.price}
              onValueChange={(e) =>
                setFormData({ ...formData, price: e.value })
              }
              inputClassName="w-full p-4"
              placeholder="Enter price"
            />

            {/* LOCATION */}
            <InputText
              value={formData.location}
              placeholder="Enter location..."
              className="w-full p-4"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />

            {/* CONDITION */}
            <div className="grid grid-cols-2 gap-3">
              {["New", "Like New", "Good", "Fair"].map((cond) => (
                <motion.div
                  key={cond}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    backgroundColor:
                      formData.condition === cond ? "#6366f1" : "transparent",
                    color: formData.condition === cond ? "#fff" : "#000",
                  }}
                  className="p-4 border rounded-xl cursor-pointer text-center font-semibold"
                  onClick={() => setFormData({ ...formData, condition: cond })}
                >
                  {cond}
                </motion.div>
              ))}
            </div>

            {/* IMAGES */}
            <motion.div
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition ${
                isDragging ? "bg-primary/10 border-primary" : "border-gray-300"
              }`}
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="file"
                hidden
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files)}
              />

              {/* EMPTY STATE */}
              {attachments.length === 0 && (
                <div className="flex flex-col items-center gap-3">
                  <i className="pi pi-cloud-upload text-4xl text-gray-400"></i>
                  <p className="font-semibold">Click or drag images here</p>
                  <p className="text-sm text-gray-500">
                    Upload up to 10 images
                  </p>
                </div>
              )}

              {/* IMAGE PREVIEW GRID */}
              {attachments.length > 0 && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <AnimatePresence>
                      {attachments.map((att, i) => (
                        <motion.div
                          key={att.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          whileHover={{ scale: 1.05 }}
                          className="relative"
                        >
                          <img
                            src={att.preview}
                            className="w-full h-28 object-cover rounded-lg"
                            alt="preview"
                          />

                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeAttachment(i);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                          >
                            ×
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <p className="text-sm text-gray-500">
                    {attachments.length}/10 images added
                  </p>
                </div>
              )}
            </motion.div>
            {/* BUTTONS */}
            <div className="flex justify-between">
              <AnimatedButton
                onClick={saveDraft}
                className="px-6 py-3 bg-gray-200 rounded-full"
              >
                Save Draft
              </AnimatedButton>

              <AnimatedButton
                onClick={handleSubmit}
                loading={loading}
                disabled={false}
                className="px-8 py-3 bg-primary text-white rounded-full"
              >
                {loading ? "Posting..." : "Post Listing"}
              </AnimatedButton>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-2">
            <div className="p-6 bg-surface-container-high rounded-xl sticky top-32">
              <p className="text-xl font-bold mb-4">Pro Tips</p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✔ Use clear images</li>
                <li>✔ Be honest</li>
                <li>✔ Price fairly</li>
              </ul>
              <img src={sustain} className="rounded-lg mb-4" />
              <p className="text-xs text-center italic">
                You've saved CO₂ today 🌱
              </p>
            </div>
          </aside>
        </div>
      </Card>
    </Suspense>
  );
};

export default AddListing;
