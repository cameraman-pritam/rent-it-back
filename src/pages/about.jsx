import React from "react";
import { Container, Typography, Grid, Paper, Box, Button } from "@mui/material";
import {
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
  Terminal as TerminalIcon,
  Balance as LawIcon,
  Groups as CommunityIcon,
} from "@mui/icons-material";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 py-16 px-4">
      <Container maxWidth="lg">
        <Box className="text-center mb-20">
          <Typography
            variant="h2"
            className="font-bold text-white mb-4 tracking-tight"
          >
            Reimagining <span className="text-teal-400">Ownership</span>
          </Typography>
          <Typography variant="h6" className="text-slate-400 max-w-2xl mx-auto">
            Rent-Back is a community-driven platform built on the principles of
            transparency, accessibility, and the freedom to share.
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {/* Mission & GPL Section */}
          <Grid item xs={12} md={7}>
            <section className="space-y-8">
              <div>
                <Typography
                  variant="h4"
                  className="text-teal-400 font-semibold mb-4 flex items-center gap-3"
                >
                  <TerminalIcon /> The Open Source Mission
                </Typography>
                <Typography className="text-slate-300 leading-relaxed text-lg">
                  Rent-Back isn't just an application; it's a public utility. We
                  believe that the tools we use to manage our daily lives should
                  be transparent and auditable. By keeping our codebase open, we
                  invite the world to improve, critique, and evolve the
                  platform.
                </Typography>
              </div>

              <Paper className="bg-slate-800/40 border border-teal-900/30 p-6 rounded-xl">
                <Typography
                  variant="h5"
                  className="text-white font-medium mb-3 flex items-center gap-2"
                >
                  <LawIcon className="text-teal-400" /> GPL v3.0 Licensed
                </Typography>
                <Typography className="text-slate-400">
                  We are committed to the{" "}
                  <strong>GNU General Public License</strong>. This ensures that
                  Rent-Back remains free software. Any derivatives must also be
                  open-source, protecting the rights of users and contributors
                  alike from proprietary enclosure.
                </Typography>
              </Paper>
            </section>
          </Grid>

          {/* Developer Card */}
          <Grid item xs={12} md={5}>
            <div className="sticky top-24">
              <Paper className="bg-[#1e293b] border border-slate-700 p-8 rounded-2xl text-center shadow-2xl">
                <div className="w-24 h-24 bg-teal-500/20 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-teal-500">
                  <Typography variant="h4" className="text-teal-400 font-bold">
                    CP
                  </Typography>
                </div>
                <Typography variant="h5" className="text-white font-bold mb-1">
                  cameraman-pritam
                </Typography>
                <Typography className="text-teal-500 font-medium mb-6">
                  Lead Developer & Visionary
                </Typography>
                <Typography className="text-slate-400 mb-8">
                  Building digital solutions that prioritize user freedom. I
                  craft interfaces with precision and write code that belongs to
                  the community.
                </Typography>

                <div className="flex flex-col gap-3">
                  <Button
                    href="https://github.com/cameraman-pritam"
                    target="_blank"
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    className="bg-slate-700 hover:bg-slate-600 normal-case py-3"
                  >
                    Follow on GitHub
                  </Button>
                  <Button
                    href="https://instagram.com/cameraman.pritam"
                    target="_blank"
                    variant="outlined"
                    startIcon={<InstagramIcon />}
                    className="border-teal-500/50 text-teal-400 hover:border-teal-400 normal-case py-3"
                  >
                    @cameraman.pritam
                  </Button>
                </div>
              </Paper>
            </div>
          </Grid>
        </Grid>
        <Box className="mt-24 pt-12 border-t border-slate-800 text-center">
          <Typography
            variant="h5"
            className="text-white mb-6 flex items-center justify-center gap-2"
          >
            <CommunityIcon className="text-teal-400" /> Want to contribute?
          </Typography>
          <Typography className="text-slate-400 mb-8 max-w-xl mx-auto">
            Our repository is always looking for new perspectives. Whether it's
            code, design, or documentation, your help is welcome.
          </Typography>
          <Button
            size="large"
            className="text-teal-400 border-teal-400 hover:bg-teal-400/10 px-10 border-2 font-bold"
          >
            Join the Repo
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default About;
