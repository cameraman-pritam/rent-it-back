import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Code, Storage, GitHub, Security, Terminal } from "@mui/icons-material";

// Internal Sub-component for Tech Cards
const TechCard = ({ icon, title, tech }) => (
  <Paper className="bg-[#1a202d] border border-slate-800/50 p-5 flex items-center gap-4 hover:border-teal-500/30 transition-colors duration-300">
    <div className="text-[#6dd9c3] flex items-center justify-center bg-[#6dd9c3]/10 p-3 rounded-lg">
      {icon}
    </div>
    <div>
      <Typography className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
        {title}
      </Typography>
      <Typography className="text-[#dde2f5] font-semibold tracking-tight">
        {tech}
      </Typography>
    </div>
  </Paper>
);

const Contribute = () => {
  return (
    // Background updated to match Home.jsx (#0d1320)
    <div className="min-h-screen bg-[#0d1320] text-[#dde2f5] py-20 font-['Manrope']">
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box className="mb-16">
          <Typography
            variant="h3"
            className="text-white font-black mb-4 tracking-tighter"
          >
            Build With <span className="text-[#6dd9c3]">Us</span>
          </Typography>
          <Typography className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Rent-Back is a community effort. We're building a decentralized
            future for the sharing economy, and your code can help get us there.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            {/* Technical Stack */}
            <Typography
              variant="h5"
              className="text-white font-bold mb-6 flex items-center gap-2"
            >
              <Terminal className="text-[#6dd9c3]" /> Development Stack
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <TechCard
                icon={<Code />}
                title="Frontend"
                tech="ReactJS + Tailwind CSS"
              />
              <TechCard
                icon={<Code />}
                title="Routing"
                tech="React-Router v7"
              />
              <TechCard icon={<Storage />} title="Database" tech="Supabase" />
              <TechCard
                icon={<Security />}
                title="Auth & Logic"
                tech="Firebase"
              />
            </div>

            {/* License Section */}
            <Box className="mb-12">
              <Typography variant="h5" className="text-white font-bold mb-4">
                GPL License & Ethics
              </Typography>
              <Typography className="text-slate-400 leading-relaxed mb-6 text-lg">
                Rent-Back is licensed under{" "}
                <strong className="text-[#6dd9c3]">GPL-3.0</strong>. This is a
                "copyleft" license, meaning the software remains free. You are
                encouraged to learn from, fork, and improve the project.
              </Typography>

              <Alert
                severity="warning"
                icon={<Security className="text-orange-400" />}
                className="bg-[#1e1a16] text-orange-200 border border-orange-900/30 rounded-xl py-4"
              >
                <AlertTitle className="font-bold text-orange-400">
                  Anti-Plagiarism Policy
                </AlertTitle>
                While we are open-source,{" "}
                <strong>
                  verbatim cloning and rebranding without significant original
                  contribution is strictly prohibited.
                </strong>
                We enforce this to protect the integrity of the project and the
                hard work of our contributors.
              </Alert>
            </Box>
          </Grid>

          {/* Sidebar Section */}
          <Grid item xs={12} md={4}>
            <div className="sticky top-28">
              <Paper className="bg-[#1a202d] p-8 border border-[#6dd9c3]/20 rounded-2xl shadow-2xl">
                <Typography
                  variant="h6"
                  className="text-white font-bold mb-4 flex items-center gap-3"
                >
                  <GitHub className="text-[#6dd9c3]" /> Repository
                </Typography>
                <Typography className="text-slate-400 text-sm mb-8 leading-relaxed">
                  Join <strong>cameraman-pritam</strong> and other developers on
                  GitHub. We welcome Pull Requests for features, bug fixes, or
                  even UI improvements.
                </Typography>
                <a
                  href="https://github.com/cameraman-pritam/rent-back"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center bg-[#6dd9c3] hover:bg-[#46b5a1] text-[#00382f] font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(109,217,195,0.1)]"
                >
                  View on GitHub
                </a>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Contribute;
