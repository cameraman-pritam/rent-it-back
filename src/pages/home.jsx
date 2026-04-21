import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Inventory2,
  Sync,
  ArrowForward,
  Explore,
} from "@mui/icons-material";

const Home = () => {
  return (
    <main className="flex-grow bg-[#0d1320] text-[#dde2f5] font-['Manrope'] antialiased">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24">
        {/* Abstract background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[#6dd9c3]/5 rounded-full blur-[120px] -z-10"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-[#6dd9c3] text-sm uppercase tracking-[0.2em] mb-6 font-bold">
                Welcome to Rent Back
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight font-extrabold mb-8 text-balance">
                Own less.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#dde2f5] via-[#6dd9c3] to-[#46b5a1]">
                  Live more.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
                Access high-end gear, tools, and experiences without the burden
                of ownership. Join a community built on access over excess.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-start items-center">
                <button className="bg-gradient-to-br from-[#6dd9c3] to-[#46b5a1] text-[#00382f] font-bold py-4 px-10 rounded-lg text-lg hover:shadow-[0_0_40px_rgba(109,217,195,0.2)] transition-all duration-300">
                  Explore Collection
                </button>
                <button className="border border-slate-700/50 text-[#dde2f5] font-semibold py-4 px-10 rounded-lg text-lg hover:bg-[#151b29] transition-colors duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>

            {/* HERO IMAGE PLACEHOLDER */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-[4/5] lg:aspect-square bg-[#1a202d]">
              <img
                alt="Hero Visual"
                className="w-full h-full object-cover"
                src="" // Add your image URL here
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1320] via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (THE PROCESS) */}
      <section className="py-32 bg-[#0d1320] relative z-10 border-t border-slate-900">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#dde2f5]">
              The Process
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-lg">
              A seamless experience designed to give you access to what you
              need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                icon: <Search fontSize="large" />,
                title: "Browse",
                desc: "Discover curated collections from verified community members.",
              },
              {
                icon: <Inventory2 fontSize="large" />,
                title: "Borrow",
                desc: "Secure items instantly with flexible durations and insurance.",
              },
              {
                icon: <Sync fontSize="large" />,
                title: "Return",
                desc: "Easy local drop-off or pickup. Reduce your footprint.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-[#1a202d] p-10 rounded-xl relative overflow-hidden group hover:bg-[#242a38] transition-colors duration-500 border border-slate-800/50"
              >
                <div className="text-[#6dd9c3] mb-8 block">{step.icon}</div>
                <h3 className="text-2xl font-bold text-[#dde2f5] mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS (BENTO GRID) */}
      <section className="py-32 bg-[#080e1b]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#dde2f5]">
                Curated Access
              </h2>
              <p className="text-slate-400 mt-4 max-w-xl text-lg">
                High-end tools, rigorously maintained.
              </p>
            </div>
            <button className="text-[#6dd9c3] font-semibold hover:text-[#8af5df] transition-colors flex items-center gap-2">
              View All Collections <ArrowForward fontSize="small" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Main Card */}
            <div className="md:col-span-2 md:row-span-2 rounded-xl overflow-hidden relative group bg-[#1a202d]">
              <img
                src=""
                alt="Creative Tech"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1320] via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="bg-[#6dd9c3]/20 text-[#6dd9c3] text-xs uppercase tracking-wider font-bold py-1 px-3 rounded-full mb-4 inline-block">
                  Creative Tech
                </span>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Professional Imaging
                </h3>
              </div>
            </div>

            {/* Secondary Card */}
            <div className="md:col-span-2 md:row-span-1 rounded-xl overflow-hidden relative group bg-[#1a202d]">
              <img
                src=""
                alt="Expedition"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1320] via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-1">
                  Expedition Gear
                </h3>
              </div>
            </div>

            {/* Small Card */}
            <div className="md:col-span-1 md:row-span-1 rounded-xl overflow-hidden relative group bg-[#1a202d]">
              <img
                src=""
                alt="Tools"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1320] via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl font-bold text-white">Pro Tools</h3>
              </div>
            </div>

            {/* Category Explorer */}
            <div className="md:col-span-1 md:row-span-1 rounded-xl bg-[#242a38] border border-slate-800 flex flex-col justify-center items-center p-6 text-center hover:bg-[#2f3543] transition-colors">
              <Explore className="text-[#6dd9c3] mb-4" sx={{ fontSize: 48 }} />
              <h3 className="text-xl font-bold text-white mb-2">500+ Items</h3>
              <p className="text-slate-400 text-sm">Explore All</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IMPACT SECTION */}
      <section className="py-32 bg-[#0d1320] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#6dd9c3] text-sm uppercase tracking-[0.2em] mb-4 font-bold">
                The Impact
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#dde2f5] mb-8">
                Access over excess.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Every item rented is one less item manufactured. By choosing
                access over ownership, we reduce our collective carbon
                footprint.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-slate-800 pt-8 mt-8">
                <div>
                  <p className="text-4xl font-extrabold text-[#6dd9c3] mb-2">
                    12k+
                  </p>
                  <p className="text-sm text-slate-500">
                    Items kept in circulation
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-[#6dd9c3] mb-2">
                    45t
                  </p>
                  <p className="text-sm text-slate-500">CO2 prevented</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-[#1a202d] aspect-square border border-slate-800">
              <img
                src=""
                alt="Impact Visual"
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0d1320] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-[#1a202d]/80 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50">
                <p className="text-[#dde2f5] italic text-sm">
                  "The most sustainable product is the one that already exists."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
