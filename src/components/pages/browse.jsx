import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { supabase } from "../../utils/supabase";
import { Skeleton } from "primereact/skeleton";
import { Card } from "primereact/card";
import { motion } from "framer-motion";

/* ---------------- LAZY LOADED PRIME COMPONENTS ---------------- */
const Toast = lazy(() =>
  import("primereact/toast").then((m) => ({ default: m.Toast }))
);
const InputText = lazy(() =>
  import("primereact/inputtext").then((m) => ({ default: m.InputText }))
);
const MultiSelect = lazy(() =>
  import("primereact/multiselect").then((m) => ({ default: m.MultiSelect }))
);
const InputNumber = lazy(() =>
  import("primereact/inputnumber").then((m) => ({ default: m.InputNumber }))
);
const Button = lazy(() =>
  import("primereact/button").then((m) => ({ default: m.Button }))
);
const Dialog = lazy(() =>
  import("primereact/dialog").then((m) => ({ default: m.Dialog }))
);
const Galleria = lazy(() =>
  import("primereact/galleria").then((m) => ({ default: m.Galleria }))
);
const Root = lazy(() => import("../structure/root"));

const Browse = () => {
  const toast = useRef(null);

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FILTER STATES ---------------- */
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  /* ---------------- MODAL STATE (for image gallery) ---------------- */
  const [selectedItem, setSelectedItem] = useState(null);

  /* ---------------- STATIC OPTIONS ---------------- */
  const categoryOptions = [
    { label: "Tools", value: "Tools" },
    { label: "Electronics", value: "Electronics" },
    { label: "Outdoor Gear", value: "Outdoor Gear" },
    { label: "Vehicle", value: "Vehicle" },
    { label: "Home Goods", value: "Home Goods" },
  ];

  const transactionOptions = [
    { label: "Rent", value: "Rent" },
    { label: "Sell", value: "Sell" },
    { label: "Share", value: "Share" },
  ];

  const conditionOptions = [
    { label: "New", value: "New" },
    { label: "Like New", value: "Like New" },
    { label: "Good", value: "Good" },
    { label: "Fair", value: "Fair" },
  ];

  /* ---------------- FETCH ALL ITEMS ---------------- */
  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
      toast.current?.show({
        severity: "error",
        summary: "Failed to load listings",
        detail: error.message,
      });
    } else {
      setItems(data || []);
      setFilteredItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ---------------- CLIENT-SIDE FILTERING ---------------- */
  useEffect(() => {
    let result = [...items];

    // Global search
    if (globalFilter.trim()) {
      const term = globalFilter.toLowerCase().trim();
      result = result.filter(
        (item) =>
          (item.title || "").toLowerCase().includes(term) ||
          (item.description || "").toLowerCase().includes(term) ||
          (item.location || "").toLowerCase().includes(term)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // Transaction type filter
    if (selectedTransactionTypes.length > 0) {
      result = result.filter((item) =>
        selectedTransactionTypes.includes(item.transactionType)
      );
    }

    // Condition filter
    if (selectedConditions.length > 0) {
      result = result.filter((item) =>
        selectedConditions.includes(item.condition)
      );
    }

    // Price range
    if (minPrice !== null) {
      result = result.filter((item) => Number(item.price) >= minPrice);
    }
    if (maxPrice !== null) {
      result = result.filter((item) => Number(item.price) <= maxPrice);
    }

    setFilteredItems(result);
  }, [
    items,
    globalFilter,
    selectedCategories,
    selectedTransactionTypes,
    selectedConditions,
    minPrice,
    maxPrice,
  ]);

  /* ---------------- CLEAR FILTERS ---------------- */
  const clearFilters = () => {
    setGlobalFilter("");
    setSelectedCategories([]);
    setSelectedTransactionTypes([]);
    setSelectedConditions([]);
    setMinPrice(null);
    setMaxPrice(null);
  };

  /* ---------------- GALLERIA ITEMS ---------------- */
  const galleriaItems =
    selectedItem?.image?.map((url, idx) => ({
      itemImageSrc: url,
      thumbnailImageSrc: url,
      alt: `Image ${idx + 1}`,
    })) || [];

  return (
    <Suspense fallback={<Skeleton height="100vh" />}>
      <Root />
      <Toast ref={toast} />

      <div className="pt-32 pb-12 px-4 md:px-8 max-w-screen-2xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-extrabold tracking-tight">
            Browse Listings
          </h1>
          <p className="text-gray-500 mt-2">
            Discover tools, gear, vehicles and more from the community
          </p>
        </motion.div>

        {/* FILTER BAR */}
        <Card className="mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 p-6">
            {/* Global Search */}
            <div className="flex-1">
              <span className="p-input-icon-left w-full">
                <i className="pi pi-search" />
                <InputText
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search title, description or location..."
                  className="w-full"
                />
              </span>
            </div>

            {/* Category */}
            <div className="lg:w-64">
              <MultiSelect
                value={selectedCategories}
                options={categoryOptions}
                onChange={(e) => setSelectedCategories(e.value)}
                placeholder="All Categories"
                display="chip"
                className="w-full"
              />
            </div>

            {/* Transaction Type */}
            <div className="lg:w-52">
              <MultiSelect
                value={selectedTransactionTypes}
                options={transactionOptions}
                onChange={(e) => setSelectedTransactionTypes(e.value)}
                placeholder="Transaction Type"
                display="chip"
                className="w-full"
              />
            </div>

            {/* Condition */}
            <div className="lg:w-52">
              <MultiSelect
                value={selectedConditions}
                options={conditionOptions}
                onChange={(e) => setSelectedConditions(e.value)}
                placeholder="Condition"
                display="chip"
                className="w-full"
              />
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-3 lg:w-80">
              <InputNumber
                value={minPrice}
                onValueChange={(e) => setMinPrice(e.value)}
                placeholder="Min"
                mode="currency"
                currency="USD"
                locale="en-US"
                className="w-full"
              />
              <span className="text-gray-400">–</span>
              <InputNumber
                value={maxPrice}
                onValueChange={(e) => setMaxPrice(e.value)}
                placeholder="Max"
                mode="currency"
                currency="USD"
                locale="en-US"
                className="w-full"
              />
            </div>

            {/* Clear Filters */}
            <Button
              label="Clear"
              icon="pi pi-times"
              outlined
              onClick={clearFilters}
              className="lg:w-auto"
            />
          </div>
        </Card>

        {/* LISTINGS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton width="100%" height="220px" />
                  <div className="p-5 space-y-3">
                    <Skeleton width="70%" height="1.5rem" />
                    <Skeleton width="40%" height="1rem" />
                    <div className="flex justify-between">
                      <Skeleton width="30%" height="1rem" />
                      <Skeleton width="25%" height="1rem" />
                    </div>
                  </div>
                </Card>
              ))
            : filteredItems.map((item) => {
                const images = item.image || [];
                const firstImage = images[0];

                return (
                  <motion.div
                    key={item.id || item.createdAt}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300">
                      {/* IMAGE SECTION */}
                      <div
                        className="relative cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        {firstImage ? (
                          <>
                            <img
                              src={firstImage}
                              alt={item.title}
                              className="w-full h-56 object-cover"
                            />
                            {images.length > 1 && (
                              <div className="absolute top-4 right-4 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-3xl flex items-center gap-1">
                                <i className="pi pi-images text-sm" />+
                                {images.length - 1}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                              <i className="pi pi-image text-5xl text-gray-300" />
                              <p className="text-xs text-gray-400 mt-2">
                                No image
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-xl leading-tight line-clamp-2 flex-1 pr-3">
                            {item.title}
                          </h3>
                          <span className="text-emerald-600 font-semibold whitespace-nowrap text-xl">
                            ${Number(item.price).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                          {item.location}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-3xl">
                            {item.category}
                          </span>
                          <span
                            className={`text-xs font-medium px-3 py-1 rounded-3xl ${
                              item.transactionType === "Rent"
                                ? "bg-purple-100 text-purple-700"
                                : item.transactionType === "Sell"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {item.transactionType}
                          </span>
                          <span className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-3xl">
                            {item.condition}
                          </span>
                        </div>

                        <div className="mt-auto pt-6 text-xs flex justify-between text-gray-500 border-t">
                          <span>by {item.userName || "Anonymous"}</span>
                          <span>
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
        </div>

        {/* EMPTY STATE */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <i className="pi pi-inbox text-7xl text-gray-300" />
            <p className="mt-6 text-xl font-medium text-gray-400">
              No listings found
            </p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        )}

        {/* IMAGE GALLERY MODAL */}
        <Dialog
          header={
            selectedItem
              ? `${selectedItem.title} • ${selectedItem.transactionType}`
              : "Images"
          }
          visible={!!selectedItem}
          onHide={() => setSelectedItem(null)}
          maximizable
          style={{ width: "95vw", maxWidth: "1100px" }}
          contentClassName="p-0"
        >
          {selectedItem && galleriaItems.length > 0 && (
            <Galleria
              value={galleriaItems}
              showThumbnails={galleriaItems.length > 1}
              showItemNavigators
              showItemNavigatorsOnItem
              changeItemOnIndicatorHover
              circular
              autoPlay={false}
              transitionInterval={3000}
              style={{ height: "620px" }}
            />
          )}
        </Dialog>
      </div>
    </Suspense>
  );
};

export default Browse;
