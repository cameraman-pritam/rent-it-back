import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { supabase } from "../../utils/supabase";
import { Skeleton } from "primereact/skeleton";
import { Card } from "primereact/card";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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

  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);

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

  const getImageUrl = (input) => {
    if (!input) return null;
    if (typeof input === "string" && input.startsWith("http")) return input;
    const { data } = supabase.storage.from("listings").getPublicUrl(input);
    return data.publicUrl;
  };

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("createdAt", { ascending: false });

    if (!error) {
      setItems(data || []);
      setFilteredItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    let result = [...items];

    if (globalFilter.trim()) {
      const term = globalFilter.toLowerCase().trim();
      result = result.filter(
        (item) =>
          (item.title || "").toLowerCase().includes(term) ||
          (item.description || "").toLowerCase().includes(term) ||
          (item.location || "").toLowerCase().includes(term)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }
    if (selectedTransactionTypes.length > 0) {
      result = result.filter((item) =>
        selectedTransactionTypes.includes(item.transactionType)
      );
    }
    if (selectedConditions.length > 0) {
      result = result.filter((item) =>
        selectedConditions.includes(item.condition)
      );
    }
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

  const clearFilters = () => {
    setGlobalFilter("");
    setSelectedCategories([]);
    setSelectedTransactionTypes([]);
    setSelectedConditions([]);
    setMinPrice(null);
    setMaxPrice(null);
  };

  const galleriaItems =
    selectedItem?.images?.map((img, idx) => ({
      itemImageSrc: getImageUrl(img),
      thumbnailImageSrc: getImageUrl(img),
      alt: `Image ${idx + 1}`,
    })) || [];

  return (
    <Suspense fallback={<Skeleton height="100vh" />}>
      <Root />
      <Toast ref={toast} />

      <div className="pt-32 pb-12 px-4 md:px-8 max-w-screen-2xl mx-auto">
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

        <Card className="mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 p-6">
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

            <Button
              label="Clear"
              icon="pi pi-times"
              outlined
              onClick={clearFilters}
              className="lg:w-auto"
            />
          </div>
        </Card>

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
                const images = item.images || item.image || [];
                const firstImage = images[0];
                const firstImageUrl = getImageUrl(firstImage);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-300">
                      <div
                        className="relative cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        {firstImageUrl ? (
                          <>
                            <img
                              src={firstImageUrl}
                              alt={item.title}
                              className="w-full h-56 object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/400x300?text=Image+Failed";
                              }}
                            />
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
                          <span className="text-xs font-medium px-3 py-1 rounded-3xl">
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
              circular
              autoPlay={false}
              transitionInterval={3000}
              style={{ height: "620px" }}
              item={(item) => (
                <img
                  src={item.itemImageSrc}
                  alt={item.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
              thumbnail={(item) => (
                <img
                  src={item.thumbnailImageSrc}
                  alt={item.alt}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              )}
            />
          )}
        </Dialog>
      </div>
    </Suspense>
  );
};

export default Browse;
