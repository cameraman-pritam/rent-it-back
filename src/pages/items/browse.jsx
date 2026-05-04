import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  Box,
  Skeleton,
} from "@mui/material";
import { useDb } from "../../context/dbContext";

const Browse = () => {
  const { readRecord, isLoading } = useDb();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const data = await readRecord("items");
        if (data) {
          const sortedData = data.sort((a, b) => b.serial_no - a.serial_no);
          setItems(sortedData);
        }
      } catch (error) {
        console.error("L: Failed to load marketplace", error);
      }
    };

    fetchMarketplace();
  }, [readRecord]);

  return (
    <div className="min-h-screen bg-surface py-12 font-body">
      <Container maxWidth="lg">
        <Typography variant="h4" className="text-on-surface font-bold mb-8">
          Explore <span className="text-primary">Listings</span>
        </Typography>

        {isLoading && items.length === 0 ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((skel) => (
              <Grid item xs={12} sm={6} md={4} key={skel}>
                <Box className="bg-surface-container border border-outline/10 p-4 rounded-xl h-full flex flex-col gap-4">
                  <Skeleton
                    variant="rectangular"
                    className="w-full aspect-video rounded-lg bg-surface-container-high"
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={32}
                    className="bg-surface-container-high"
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={20}
                    className="bg-surface-container-high"
                    animation="wave"
                  />
                  <Box className="mt-auto pt-4 border-t border-outline/10 flex justify-between">
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={24}
                      className="bg-surface-container-high"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width="20%"
                      height={24}
                      className="bg-surface-container-high"
                      animation="wave"
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : items.length === 0 ? (
          <Typography className="text-on-surface-variant text-center py-10">
            No gear listed yet. Be the first to add something!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.serial_no}>
                <Card className="bg-surface-container border border-outline/20 p-4 hover:border-primary/50 transition-all duration-300 cursor-pointer group flex flex-col h-full rounded-xl">
                  {/* Image Container */}
                  <div className="aspect-video bg-surface-container-high rounded-lg mb-4 overflow-hidden flex items-center justify-center relative">
                    {item.image_path ? (
                      <img
                        src={item.image_path}
                        alt={item.item_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Typography className="text-on-surface-variant font-bold">
                        No Image
                      </Typography>
                    )}

                    {/* Condition Badge */}
                    <div className="absolute top-2 left-2 glass-panel px-2 py-1 rounded text-[10px] font-bold text-on-surface uppercase tracking-wider">
                      {item.condition || "Good"}
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="flex-1">
                    <Typography
                      variant="h6"
                      className="text-on-surface font-semibold group-hover:text-primary line-clamp-1"
                    >
                      {item.item_name}
                    </Typography>
                    <Typography className="text-on-surface-variant text-sm mb-3">
                      {item.item_type || "General Category"}
                    </Typography>
                  </div>

                  {/* Pricing and Availability */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t ghost-border">
                    <Typography className="text-primary font-bold">
                      ₹{item.price}
                      <span className="text-xs text-on-surface-variant font-normal ml-1">
                        {item.transaction_type?.toLowerCase() === "rent"
                          ? "/day"
                          : "total"}
                      </span>
                    </Typography>

                    <Typography
                      className={`text-xs italic font-bold ${
                        item.is_occupied
                          ? "text-red-400"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {item.is_occupied ? "Occupied" : "Available"}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Browse;
