import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowBack,
  AddAPhoto,
  Close,
  Image as ImageIcon,
  VerifiedUser,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useDb } from "../../context/dbContext";
import { supabase } from "../../utils/supabase";
import Swal from "sweetalert2";

export default function AddItems() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createRecord } = useDb();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    gearName: "",
    category: "Photography",
    description: "",
    condition: "Excellent",
    transactionType: "Rent",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      Swal.fire(
        "Hold up",
        "You need to be logged in to post gear, bro.",
        "error"
      );
      return;
    }

    if (!formData.gearName || !formData.price) {
      Swal.fire(
        "Missing Info",
        "Make sure you name the gear and set a price!",
        "warning"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      let image_path = null;

      // Upload image to the bucket first, organized by User ID
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("item-img")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("item-img")
          .getPublicUrl(fileName);

        image_path = publicUrlData.publicUrl;
      }

      // Build payload for the edge function
      const payload = {
        hoster_uid: user.id,
        item_name: formData.gearName,
        transaction_type: formData.transactionType,
        price: parseFloat(formData.price),
        condition: formData.condition,
        item_type: formData.category,
        description: formData.description,
        image_path: image_path,
      };

      await createRecord("items", payload);

      Swal.fire({
        title: "Massive W!",
        text: "Your gear is live and ready.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate(-1), 2000);
    } catch (error) {
      console.error("Submission L:", error.message);
      Swal.fire("Oops", "Something went wrong uploading your gear.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen relative overflow-hidden font-body">
      {/* Aesthetic Decoration Backgrounds */}
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

      <nav className="h-20 flex items-center px-6 md:px-12 fixed top-0 w-full z-40 bg-surface/80 glass-panel">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowBack className="text-[18px]" />
            <span className="text-sm font-medium tracking-tight">
              Back to Dashboard
            </span>
          </button>
        </div>
      </nav>

      <main className="pt-28 pb-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-on-surface">
            List New Gear
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-light">
            Share your professional equipment with the Rent Back community.
            High-quality imagery and detailed descriptions ensure higher
            conversion rates.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Media Upload Section */}
          <section className="p-8 rounded-xl bg-surface-container border border-dashed border-outline/30 hover:border-primary/40 transition-colors group">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <AddAPhoto className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-on-surface">
                Upload Visual Assets
              </h3>
              <p className="text-on-surface-variant text-sm mb-8 max-w-xs">
                Drag and drop high-resolution JPG or PNG files.
              </p>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 rounded-full bg-surface-container-highest text-primary font-semibold text-sm hover:bg-primary hover:text-on-primary transition-all"
              >
                Select Files
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {imagePreview ? (
                <div className="aspect-square rounded-lg bg-surface-container-high overflow-hidden relative group/item">
                  <img
                    className="w-full h-full object-cover transition-opacity"
                    src={imagePreview}
                    alt="Gear Preview"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-red-500 hover:scale-110 transition-transform"
                  >
                    <Close className="text-[16px]" />
                  </button>
                </div>
              ) : (
                <div className="aspect-square rounded-lg bg-surface-container-high border-2 border-outline/20 flex items-center justify-center">
                  <ImageIcon className="text-outline/30 text-[32px]" />
                </div>
              )}
            </div>
          </section>

          {/* Basic Info Section */}
          <section className="bg-surface-container rounded-xl p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-primary font-bold">
                  Gear Name
                </label>
                <input
                  name="gearName"
                  value={formData.gearName}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="e.g. Sony Alpha a7 IV Mirrorless"
                  className="w-full bg-surface-container-high border-none rounded-lg p-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary/30 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-primary font-bold">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-surface-container-high border-none rounded-lg p-4 text-on-surface appearance-none focus:ring-1 focus:ring-primary/30 outline-none"
                >
                  <option>Photography</option>
                  <option>Audio & Sound</option>
                  <option>Cinematography</option>
                  <option>Lighting</option>
                  <option>Drones</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-primary font-bold">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Detail the technical specifications, included accessories, and any usage notes..."
                className="w-full bg-surface-container-high border-none rounded-lg p-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-1 focus:ring-primary/30 transition-all resize-none outline-none"
              ></textarea>
            </div>
          </section>

          {/* Condition & Transaction Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-surface-container rounded-xl p-8">
              <label className="text-xs uppercase tracking-widest text-primary font-bold block mb-6">
                Condition
              </label>
              <div className="space-y-3">
                {["Mint", "Excellent", "Good", "Fair"].map((cond) => {
                  const isActive = formData.condition === cond;
                  return (
                    <label
                      key={cond}
                      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors group ${
                        isActive
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-surface-container-high hover:bg-surface-container-highest border border-transparent"
                      }`}
                    >
                      <span
                        className={`font-medium ${
                          isActive ? "text-primary" : "text-on-surface"
                        }`}
                      >
                        {cond}
                      </span>
                      <input
                        type="radio"
                        name="condition"
                        value={cond}
                        checked={isActive}
                        onChange={handleChange}
                        className={`focus:ring-0 bg-surface ${
                          isActive
                            ? "text-primary border-primary"
                            : "border-outline"
                        }`}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="bg-surface-container rounded-xl p-8 flex flex-col justify-between">
              <div>
                <label className="text-xs uppercase tracking-widest text-primary font-bold block mb-6">
                  Transaction Type
                </label>
                <div className="flex p-1 bg-surface-container-high rounded-xl gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, transactionType: "Rent" })
                    }
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                      formData.transactionType === "Rent"
                        ? "bg-primary text-on-primary shadow-lg shadow-primary/10"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    Rent
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, transactionType: "Sell" })
                    }
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                      formData.transactionType === "Sell"
                        ? "bg-primary text-on-primary shadow-lg shadow-primary/10"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <label className="text-xs uppercase tracking-widest text-primary font-bold block">
                  Pricing
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">
                    ₹
                  </span>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    required
                    placeholder="0.00"
                    className="w-full bg-surface-container-high border-none rounded-lg p-4 pl-10 text-on-surface text-2xl focus:ring-1 focus:ring-primary/30 transition-all outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                    {formData.transactionType === "Rent" ? "/ day" : "total"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <footer className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-outline/10">
            <div className="flex items-center gap-3">
              <VerifiedUser className="text-primary text-[24px]" />
              <p className="text-xs text-on-surface-variant max-w-[240px]">
                By publishing, you agree to our gear safety and insurance
                protocols.
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 md:flex-none px-12 py-4 rounded-full signature-gradient text-on-primary font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Publishing..." : "Publish Listing"}
              </button>
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
}
