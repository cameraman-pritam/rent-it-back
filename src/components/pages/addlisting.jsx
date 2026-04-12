import React, { useState, useRef, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import Root from "../structure/root";
import sustain from "../../assets/3726696.jpg";

const AddListing = () => {
  const toast = useRef(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState([]); // {id, file, preview}
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Tools",
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

  // Cleanup object URLs on unmount
  const attachmentsRef = useRef([]);
  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  useEffect(() => {
    return () => {
      attachmentsRef.current.forEach((att) => {
        if (att.preview) URL.revokeObjectURL(att.preview);
      });
    };
  }, []);

  const handleFiles = (newFiles) => {
    const imageFiles = Array.from(newFiles).filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length === 0) return;

    const currentCount = attachments.length;
    let filesToAdd = imageFiles;

    if (currentCount + imageFiles.length > 10) {
      toast.current.show({
        severity: "warn",
        summary: "Limit Reached",
        detail: `Max 10 images allowed (${10 - currentCount} more possible)`,
        life: 3000,
      });
      filesToAdd = imageFiles.slice(0, 10 - currentCount);
      if (filesToAdd.length === 0) return;
    }

    const newAttachments = filesToAdd.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36)}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeAttachment = (index) => {
    const att = attachments[index];
    if (att?.preview) URL.revokeObjectURL(att.preview);
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (uid) => {
    const urls = [];
    for (const att of attachments) {
      const filePath = `${uid}/${Date.now()}-${att.file.name}`;
      const { error } = await supabase.storage
        .from("listings")
        .upload(filePath, att.file);

      if (!error) {
        const { data } = supabase.storage
          .from("listings")
          .getPublicUrl(filePath);
        urls.push(data.publicUrl);
      }
    }
    return urls;
  };

  const handleSubmit = async () => {
    if (
      !formData.title?.trim() ||
      !formData.price ||
      !formData.location?.trim()
    ) {
      toast.current.show({
        severity: "warn",
        summary: "Hold Up",
        detail: "Title, Price, and Location are required.",
        life: 3000,
      });
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.current.show({
        severity: "error",
        summary: "Access Denied",
        detail: "Log in to post your gear.",
        life: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      let imageUrls = [];
      if (attachments.length > 0) {
        imageUrls = await uploadImages(user.id);
      }

      const finalData = {
        ...formData,
        title: formData.title.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        images: imageUrls,
        uid: user.id,
        userName: user.user_metadata?.name || "Anonymous",
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      const { error } = await supabase.from("items").insert([finalData]);

      if (error) throw error;

      attachments.forEach((att) => {
        if (att.preview) URL.revokeObjectURL(att.preview);
      });

      toast.current.show({
        severity: "success",
        summary: "Item Live!",
        detail: "Your listing is officially on the grid.",
        life: 3000,
      });

      setFormData({
        title: "",
        category: "Tools",
        description: "",
        transactionType: "Rent",
        price: null,
        location: "",
        condition: "Like New",
      });
      setAttachments([]);
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Glitch",
        detail: "Failed to upload. Check console.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <Root />
      <Toast ref={toast} />
      <main className="pt-32 pb-24 max-w-5xl mx-auto px-6">
        {/* Progress Bar Section */}
        <header className="mb-16">
          <p className="text-4xl font-extrabold tracking-tight mb-8">
            Post a Listing
          </p>
          <div className="flex items-center w-full gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <div className="h-1.5 w-full bg-primary rounded-full" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest font-label">
                Basics
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full" />
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest font-label">
                Media
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full" />
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest font-label">
                Details
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full" />
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest font-label">
                Review
              </span>
            </div>
          </div>
        </header>

        <div className="flex items-center gap-2 lg:grid-cols-12">
          {/* Left Column: Form Content */}
          <div className="lg:col-span-8 space-y-12 w-7/10">
            {/* Section 1: Item Basics */}
            <section className="bg-surface-container-low p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                  <i className="pi pi-info-circle text-primary text-xl"></i>
                </div>
                <p className="text-2xl font-bold tracking-tight">Item Basics</p>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-on-surface-variant font-label">
                    Title
                  </label>
                  <InputText
                    className="w-full bg-surface-container-highest border-none focus:border-b-2 focus:border-primary focus:ring-0 rounded-lg p-4 text-on-surface placeholder:text-slate-500"
                    placeholder="e.g. Professional Concrete Drill"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-on-surface-variant font-label">
                    Category
                  </label>
                  <Dropdown
                    value={formData.category}
                    options={categoryOptions}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.value })
                    }
                    pt={{
                      root: {
                        className:
                          "w-full bg-surface-container-highest border-none rounded-lg focus:border-b-2 focus:border-primary focus:ring-0 flex items-center",
                      },
                      input: { className: "p-4 text-on-surface" },
                      trigger: {
                        className:
                          "w-12 text-on-surface-variant flex items-center justify-center",
                      },
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-on-surface-variant font-label">
                    Description
                  </label>
                  <InputTextarea
                    className="w-full bg-surface-container-highest border-none focus:border-b-2 focus:border-primary focus:ring-0 rounded-lg p-4 text-on-surface placeholder:text-slate-500"
                    placeholder="Describe your item, its features, and any specific quirks..."
                    rows={4}
                    autoResize
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Media */}
            <section className="bg-surface-container-low p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                  <i className="pi pi-camera text-primary text-xl"></i>
                </div>
                <p className="text-2xl font-bold tracking-tight">Media</p>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
                  isDragging
                    ? "border-primary bg-primary/10"
                    : "border-outline-variant/30 hover:border-primary/50"
                }`}
              >
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {attachments.length > 0 ? (
                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 w-full">
                      {attachments.map((att, index) => (
                        <div
                          key={att.id}
                          className="relative aspect-square group/item"
                        >
                          <img
                            src={att.preview}
                            alt={`preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeAttachment(index);
                            }}
                            className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg transition-all"
                          >
                            <i className="pi pi-times text-xs"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-on-surface-variant text-sm font-label mt-4">
                      Click or drag here to add more ({attachments.length}/10)
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                      <i className="pi pi-cloud-upload text-3xl text-on-surface-variant group-hover:text-primary transition-colors"></i>
                    </div>
                    <p className="text-lg font-semibold font-headline mb-1">
                      Drag and drop photos here
                    </p>
                    <p className="text-on-surface-variant text-sm font-label">
                      Or click to browse from your computer (Up to 10 photos)
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* Section 3: Availability & Pricing */}
            <section className="bg-surface-container-low p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                  <i className="pi pi-tag text-primary text-xl"></i>
                </div>
                <p className="text-2xl font-bold tracking-tight">
                  Availability & Pricing
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-on-surface-variant font-label">
                    Transaction Type
                  </label>
                  <div className="flex gap-2">
                    {["Rent", "Sell", "Share"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, transactionType: type })
                        }
                        className={`flex-1 font-bold py-3 rounded-lg transition-colors ${
                          formData.transactionType === type
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-highest text-on-surface hover:bg-surface-bright"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-on-surface-variant font-label">
                    Price per Day ($)
                  </label>
                  <InputNumber
                    inputId="currency-us"
                    value={formData.price}
                    onValueChange={(e) =>
                      setFormData({ ...formData, price: e.value })
                    }
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                    placeholder="$0.00"
                    className="w-full"
                    inputClassName="w-full bg-surface-container-highest border-none focus:border-b-2 focus:border-primary focus:ring-0 rounded-lg p-4 text-on-surface placeholder:text-slate-500"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-on-surface-variant font-label">
                    Location
                  </label>
                  <div className="p-input-icon-left w-full relative">
                    <i className="pi pi-map-marker text-on-surface-variant text-lg absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                    <InputText
                      className="w-full bg-surface-container-highest border-none focus:border-b-2 focus:border-primary focus:ring-0 rounded-lg p-4 pl-12 text-on-surface placeholder:text-slate-500"
                      placeholder="Search for your neighborhood or city..."
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Condition */}
            <section className="bg-surface-container-low p-8 rounded-xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                  <i className="pi pi-box text-primary text-xl"></i>
                </div>
                <p className="text-2xl font-bold tracking-tight">Condition</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["New", "Like New", "Good", "Fair"].map((cond) => (
                  <label key={cond} className="cursor-pointer">
                    <input
                      className="hidden peer"
                      name="condition"
                      type="radio"
                      checked={formData.condition === cond}
                      onChange={() =>
                        setFormData({ ...formData, condition: cond })
                      }
                    />
                    <div className="p-4 border border-outline-variant/30 rounded-xl text-center peer-checked:bg-primary-container peer-checked:border-primary transition-all">
                      <span className="text-sm font-bold font-headline block">
                        {cond}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-8 border-t border-outline-variant/20 w-3/10">
              <Button
                label="Save Draft"
                icon="pi pi-save"
                className="px-8 py-3 text-primary font-semibold hover:bg-white/5 rounded-full transition-all flex items-center gap-2 bg-transparent border-none"
                text
              />
              <Button
                label={loading ? "Processing..." : "Next Step"}
                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-arrow-right"}
                iconPos="right"
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !formData.title?.trim() ||
                  !formData.price ||
                  !formData.location?.trim()
                }
                className="bg-linear-to-br from-primary to-on-primary-container px-10 py-4 text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed border-none hover:shadow-primary/40 transition-all"
              />
            </div>
          </div>

          {/* Right Column: Sidebar Guidance */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-high rounded-xl p-6 sticky top-32">
              <p className="text-xl font-bold mb-4 flex items-center gap-2 text-tertiary">
                <i className="pi pi-lightbulb text-xl text-yellow-400"></i>
                Pro-Tip
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6 font-label">
                Clear, high-quality photos in natural light can increase your
                rental requests by up to 40%. Make sure to photograph any
                existing wear or unique identifying marks.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <i className="pi pi-check-circle text-sky-400 mt-0.5 text-lg"></i>
                  <span className="text-sm font-medium">
                    Use descriptive titles like "Heavy Duty Bosch Hammer Drill"
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <i className="pi pi-check-circle text-sky-400 mt-0.5 text-lg"></i>
                  <span className="text-sm font-medium">
                    Be honest about the condition to build community trust
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <i className="pi pi-check-circle text-sky-400 mt-0.5 text-lg"></i>
                  <span className="text-sm font-medium">
                    Fair pricing leads to repeat borrowers
                  </span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-outline-variant/30">
                <img
                  alt="Sustainability illustration"
                  className="w-3/10 h-full object-cover rounded-lg mb-4"
                  src={sustain}
                />
                <p className="text-xs text-on-surface-variant text-center italic">
                  By sharing, you've saved 4.2kg of CO2 today.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default AddListing;
