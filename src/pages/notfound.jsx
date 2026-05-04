import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { SearchOff, Home as HomeIcon } from "@mui/icons-material";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface text-on-surface px-4">
      <Container maxWidth="sm" className="text-center">
        {/* Visual Element */}
        <Box className="relative mb-8 inline-block">
          <Typography
            variant="h1"
            className="text-[12rem] font-black opacity-10 select-none"
            sx={{ lineHeight: 1 }}
          >
            404
          </Typography>
          <div className="absolute inset-0 flex items-center justify-center">
            <SearchOff className="text-primary text-8xl drop-shadow-[0_0_15px_var(--color-primary)]" />
          </div>
        </Box>

        {/* Text Content */}
        <Typography variant="h4" className="font-bold mb-4 text-on-surface">
          Item Not Found
        </Typography>
        <Typography className="text-on-surface-variant mb-10 leading-relaxed font-body">
          It looks like the page you are looking for has been returned, rented
          out, or never existed in the first place. Check the URL or head back
          to the warehouse.
        </Typography>

        {/* Action Button */}
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<HomeIcon />}
          className="bg-primary text-on-primary hover:opacity-90 px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
        >
          Back to Home
        </Button>
      </Container>
    </div>
  );
};

export default NotFound;
