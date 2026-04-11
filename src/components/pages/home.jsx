import React, { useState, useEffect } from "react";
import Root from "../structure/root";
// PrimeReact Imports
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Image } from "primereact/image";
import Planter from "../../assets/nature.png";
// Make sure to import PrimeIcons in your main app file if you haven't!
import "primeicons/primeicons.css";
import { Divider } from "primereact/divider";
import { db } from "../../utils/firebase";
import { Chart } from "primereact/chart";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  // Moved these INSIDE the component and added the missing ones!
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchAndProcessUsers = async () => {
      try {
        // 1. Hit Firestore for the users collection
        const querySnapshot = await getDocs(collection(db, "users"));

        // 2. Set up an array of months to count them up
        const monthCounts = new Array(12).fill(0); // [0, 0, 0... for Jan-Dec]

        querySnapshot.forEach((doc) => {
          const userData = doc.data();

          if (userData.createdAt) {
            let date;

            // Check if it's a fancy Firebase Timestamp
            if (typeof userData.createdAt.toDate === "function") {
              date = userData.createdAt.toDate();
            } else {
              // Otherwise, just parse it as a normal JavaScript date
              date = new Date(userData.createdAt);
            }

            // Make sure the date is actually valid before counting it
            if (!isNaN(date)) {
              const month = date.getMonth(); // Returns 0 for Jan, 11 for Dec
              monthCounts[month] += 1;
            }
          }
        });

        // 3. Plug the crunched data into PrimeReact's format
        const data = {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "New Users",
              data: monthCounts,
              fill: true,
              borderColor: "#38bdf8", // Tailwind sky-400
              backgroundColor: "rgba(56, 189, 248, 0.2)", // Faded sky-400 for the fill
              tension: 0.4, // Makes the line smooth and curvy
              pointBackgroundColor: "#fb923c", // Tailwind orange-400 for the dots
              pointBorderColor: "#0f172a", // slate-950
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#fb923c",
            },
          ],
        };

        // 4. Style the chart to match your dark SaaS theme
        const options = {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
            legend: {
              labels: {
                color: "#94a3b8", // Tailwind slate-400
              },
            },
          },
          scales: {
            x: {
              ticks: { color: "#94a3b8" },
              grid: { color: "rgba(51, 65, 85, 0.5)" }, // slate-700 with opacity
            },
            y: {
              ticks: { color: "#94a3b8" },
              grid: { color: "rgba(51, 65, 85, 0.5)" },
            },
          },
        };

        setChartData(data);
        setChartOptions(options);
        setLoading(false);
      } catch (error) {
        console.error("Bro, Firestore threw an error:", error);
        setLoading(false);
      }
    };

    fetchAndProcessUsers();
  }, []);

  return (
    <>
      <Root />
      <div className="min-h-screen bg-inherit text-white flex items-center justify-center p-6 md:p-12 overflow-hidden font-sans">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start z-10 w-full">
            {/* Swapped raw div for a PrimeReact Chip */}
            <Chip
              label="The Digital Commons"
              className="bg-slate-800/80 text-orange-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-md mb-8 border-none"
            />

            <p className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-none tracking-tight mb-8">
              Rent what you <span className="text-sky-400">need.</span>
              <br />
              Back what you <span className="text-orange-400">value.</span>
            </p>

            <p className="text-slate-400 text-lg md:text-xl xl:text-2xl mb-12 max-w-lg leading-relaxed font-medium">
              A sophisticated marketplace for local sharing. High-end equipment,
              artisan tools, and community essentials—circulating for a
              sustainable future.
            </p>

            {/* Swapped raw buttons for PrimeReact Buttons for those clean ripple effects */}
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <Button
                label="Start Browsing"
                icon="pi pi-arrow-right"
                iconPos="right"
                className="bg-sky-400 text-slate-950 font-bold text-lg py-5 px-10 rounded-full border-2 border-dashed border-slate-900/50 hover:bg-sky-300 transition-colors w-full sm:w-auto flex justify-center items-center shadow-xl gap-2"
              />
              <Button
                label="Our Mission"
                className="bg-slate-800 text-white font-bold text-lg py-5 px-10 rounded-full hover:bg-slate-700 transition-colors w-full sm:w-auto flex justify-center items-center shadow-xl border-none"
              />
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className="relative mt-20 lg:mt-0 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-lg lg:max-w-xl aspect-square rounded-4xl overflow-hidden bg-emerald-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* PrimeReact Image component with the 'preview' prop enabled */}
              <Image
                src={Planter}
                alt="Sustainable products"
                imageClassName="w-full h-full object-cover scale-105"
              />
            </div>

            <div className="absolute -bottom-16 lg:-bottom-12 -left-4 lg:-left-12 bg-slate-800 p-6 lg:p-8 rounded-2xl shadow-2xl w-11/12 max-w-sm border border-slate-700 -rotate-2 hover:rotate-0 transition-transform duration-500 z-20">
              <div className="flex items-center gap-3 mb-4">
                {/* Replaced the giant SVG with a clean PrimeIcon */}
                <i className="pi pi-verified text-orange-400 text-xl"></i>
                <span className="text-orange-400 text-xs font-bold tracking-widest uppercase">
                  Sustainability Impact
                </span>
              </div>
              <p className="text-lg lg:text-xl text-slate-200 font-semibold leading-snug">
                1,240kg CO2 saved this month by our community.
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="bg-inherit">
        <p className="text-3xl">Circular Living Made Simple</p>
        <p className="text-gray-400">
          Smoother Renting process, at your Fingertips.
        </p>
        <br />
        <div className="w-full max-w-4xl mx-auto p-6 bg-inherit rounded-3xl border border-slate-800 shadow-2xl font-sans">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              User Growth
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              New signups over the last 12 months
            </p>
          </div>

          <div className="relative h-[400px] w-full">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Super simple Tailwind loading spinner */}
                <div className="w-10 h-10 border-4 border-slate-700 border-t-sky-400 rounded-full animate-spin"></div>
              </div>
            ) : (
              <Chart
                type="line"
                data={chartData}
                options={chartOptions}
                className="h-full w-full"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
