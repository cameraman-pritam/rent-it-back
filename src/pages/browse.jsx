import React from "react";
import { Container, Grid, Typography, Card, Box } from "@mui/material";

const Browse = () => {
  // Placeholder data for UI demonstration
  const placeholders = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-[#0f172a] py-12">
      <Container maxWidth="lg">
        <Typography variant="h4" className="text-white font-bold mb-8">
          Explore <span className="text-teal-400">Listings</span>
        </Typography>

        <Grid container spacing={3}>
          {placeholders.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card className="bg-[#1e293b] border border-slate-800 p-4 hover:border-teal-500/50 transition-all duration-300 cursor-pointer group">
                <div className="aspect-video bg-slate-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  <Typography className="text-slate-600 font-bold">
                    Item Preview
                  </Typography>
                </div>
                <Typography
                  variant="h6"
                  className="text-white font-semibold group-hover:text-teal-400"
                >
                  Rental Item #{item}
                </Typography>
                <Typography className="text-slate-400 text-sm mb-3">
                  New Delhi, India • 2km away
                </Typography>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700">
                  <Typography className="text-teal-400 font-bold">
                    ₹500/day
                  </Typography>
                  <Typography className="text-xs text-slate-500 italic">
                    Available
                  </Typography>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Browse;
