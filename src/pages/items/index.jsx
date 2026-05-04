import React from "react";
import { Link } from "react-router-dom";
import {
  Explore,
  AddCircle,
  ArrowForward,
  UploadFile,
} from "@mui/icons-material";
import { camera } from "../../assets/assets.js";

export default function Index() {
  return (
    <div className="relative w-full grow flex flex-col items-center justify-center font-body bg-surface text-on-surface">
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative z-10 grow flex flex-col items-center justify-center px-6 pt-12 pb-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="text-center mb-16 max-w-2xl">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            The Atmospheric Curator
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Your gear, curated for{" "}
            <span className="text-primary italic">performance.</span>
          </h1>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed opacity-80">
            A premium gateway to discovery and contribution. Explore the world's
            most capable equipment or list your own masterpiece.
          </p>
        </header>

        {/* Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-125 md:h-150">
          {/* Browse Gear Portal */}
          <div className="group relative overflow-hidden rounded-xl bg-surface-container ghost-border flex flex-col justify-end p-8 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] h-full">
            <div className="absolute inset-0 z-0">
              <img
                alt="Browse Gear"
                className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                src={camera}
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent"></div>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Explore className="text-[18px]" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Discovery
                </span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-on-surface">
                Browse Gear
              </h2>
              <p className="text-on-surface-variant max-w-xs text-sm leading-relaxed">
                Access a world-class vault of premium equipment curated for
                creators and adventurers.
              </p>
              <div className="pt-4">
                <Link
                  to="/items/browse"
                  className="signature-gradient text-on-primary px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2 group/btn transition-all duration-300 hover:opacity-90 active:scale-95 w-fit"
                >
                  Explore Collection
                  <ArrowForward className="text-[20px] transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* List New Gear Portal */}
          <div className="group relative overflow-hidden rounded-xl bg-surface-container ghost-border flex flex-col justify-end p-8 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)] h-full">
            <div className="absolute inset-0 z-0">
              <img
                alt="List Gear"
                className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsDfCk-vV22eC4P3aaWw5O-S2rP2kLIFnViAgfJhqpeGW-yRK90Xatp9d7tkHzWHDrarI4Ntz_9ke5TSN5LrOPqsGM4_5CHUJZjnlN_7gIkDSLtivM2lAcTvJ1JEN3553jvRJ630dRFS_Fb8WwRlBqvUW5vB69qbsn6Gi7exK3TEIYqAeANVGK68R0YCLHDfWl65ss0SUSqKbGBuJTNFWPYH12hRsPG1vpD6gYVlEJ9mFqtz28OiDx88sSJ_WcA4o84-JATX9J3nM"
              />
              <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent"></div>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-secondary">
                <AddCircle className="text-[18px]" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Contribution
                </span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-on-surface">
                List New Gear
              </h2>
              <p className="text-on-surface-variant max-w-xs text-sm leading-relaxed">
                Turn your idle equipment into an active asset. Join our elite
                circle of curators and lenders.
              </p>
              <div className="pt-4">
                <Link
                  to="/items/add"
                  className="bg-surface-container-high ghost-border text-on-surface px-8 py-4 rounded-xl font-bold inline-flex items-center gap-2 group/btn transition-all duration-300 hover:bg-surface-container-highest active:scale-95 w-fit"
                >
                  Start Listing
                  <UploadFile className="text-[20px] transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
