import React, { useState, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../utils/firebase";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

const AddListingBento = () => {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Tools",
    description: "",
    transactionType: "Rent",
    price: "",
    location: "",
    condition: "Like New",
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.price || !formData.location) {
      toast.current.show({
        severity: "warn",
        summary: "Hold Up",
        detail: "Title, Price, and Location are required.",
        life: 3000,
      });
      return;
    }

    const user = auth.currentUser;
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
      await addDoc(collection(db, "items"), {
        ...formData,
        price: parseFloat(formData.price),
        uid: user.uid,
        createdAt: serverTimestamp(),
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
        price: "",
        location: "",
        condition: "Like New",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.current.show({
        severity: "error",
        summary: "Glitch",
        detail: "Failed to upload.",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-inherit text-slate-200 font-sans p-6 md:p-12">
      <Toast ref={toast} />

      {/* Header */}
      <header className="max-w-6xl mx-auto flex justify-between items-end mb-10 border-b border-slate-800 pb-6">
        <div>
          <p className="text-sky-400 font-bold tracking-widest uppercase text-sm mb-2">
            Digital Commons
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Drop New Gear
          </h1>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
          <i className="pi pi-times-circle text-xl"></i>
          <span className="hidden md:inline font-semibold">Cancel</span>
        </button>
      </header>

      {/* Bento Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Box 1: Media Upload (Spans 5 cols) */}
        <div className="md:col-span-5 bg-slate-900 rounded-[2rem] p-8 border border-slate-800/60 shadow-2xl flex flex-col justify-center items-center text-center group cursor-pointer hover:border-sky-500/50 hover:bg-slate-800/50 transition-all min-h-[300px]">
          <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner shadow-slate-800">
            <i className="pi pi-camera text-3xl text-sky-400"></i>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Add Photos</h3>
          <p className="text-slate-400 text-sm max-w-xs">
            Drag and drop up to 10 high-res images here to make your listing
            pop.
          </p>
        </div>

        {/* Box 2: The Basics (Spans 7 cols) */}
        <div className="md:col-span-7 bg-slate-900 rounded-[2rem] p-8 border border-slate-800/60 shadow-2xl flex flex-col gap-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-white">
              <i className="pi pi-box text-orange-400 mr-2"></i> Core Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400">
                Item Title
              </label>
              <InputText
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-slate-950 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-sky-400"
                placeholder="e.g. Sony A7III Camera"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400">
                Category
              </label>
              <Dropdown
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.value })
                }
                options={[
                  "Tools",
                  "Electronics",
                  "Outdoor Gear",
                  "Vehicle",
                  "Home Goods",
                ]}
                className="w-full bg-slate-950 border-none rounded-xl text-white h-[56px] flex items-center px-2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-grow">
            <label className="text-sm font-semibold text-slate-400">
              Description
            </label>
            <InputTextarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-slate-950 border-none rounded-xl p-4 text-white focus:ring-2 focus:ring-sky-400 flex-grow resize-none"
              placeholder="What makes this item sick? Any quirks?"
              rows={3}
            />
          </div>
        </div>

        {/* Box 3: Logistics (Spans 8 cols) */}
        <div className="md:col-span-8 bg-slate-900 rounded-[2rem] p-8 border border-slate-800/60 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">
            <i className="pi pi-wallet text-sky-400 mr-2"></i> Logistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-semibold text-slate-400">
                Location
              </label>
              <div className="relative">
                <i className="pi pi-map-marker absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10"></i>
                <InputText
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full bg-slate-950 border-none rounded-xl p-4 pl-12 text-white focus:ring-2 focus:ring-sky-400"
                  placeholder="City or Zip Code"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400">
                Rate / Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold z-10">
                  $
                </span>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full bg-slate-950 border-none rounded-xl p-4 pl-10 text-white focus:ring-2 focus:ring-sky-400 outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 md:col-span-3 mt-2">
              <label className="text-sm font-semibold text-slate-400">
                Transaction Type
              </label>
              <div className="flex bg-slate-950 p-1 rounded-2xl gap-1">
                {["Rent", "Sell", "Share"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setFormData({ ...formData, transactionType: type })
                    }
                    className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                      formData.transactionType === type
                        ? "bg-sky-500 text-slate-950 shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Box 4: Condition & Action (Spans 4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-[2rem] p-8 border border-slate-800/60 shadow-2xl flex-grow">
            <h2 className="text-xl font-bold text-white mb-6">
              <i className="pi pi-check-square text-orange-400 mr-2"></i>{" "}
              Condition
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {["New", "Like New", "Good", "Fair"].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setFormData({ ...formData, condition: cond })}
                  className={`p-4 border-2 rounded-2xl font-bold text-sm transition-all ${
                    formData.condition === cond
                      ? "border-orange-400 bg-orange-400/10 text-orange-400"
                      : "border-slate-800 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-slate-950 hover:bg-sky-400 hover:text-slate-950 rounded-[2rem] p-6 font-extrabold text-xl shadow-xl transition-all disabled:opacity-50 flex justify-between items-center group"
          >
            {loading ? "Uploading..." : "Launch Listing"}
            <i
              className={`pi ${
                loading ? "pi-spin pi-spinner" : "pi-rocket"
              } text-2xl group-hover:translate-x-2 transition-transform`}
            ></i>
          </button>
        </div>
      </main>
    </div>
  );
};

export default AddListingBento;
