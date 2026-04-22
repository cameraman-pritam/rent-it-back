import React from "react";
import { InputBase, Button, Divider } from "@mui/material";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import GoogleIcon from "@mui/icons-material/Google";
import VerifiedIcon from "@mui/icons-material/Verified";
// eslint-disable-next-line no-unused-vars
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary/30 min-h-screen flex flex-col">
      <main className="grow flex items-center justify-center relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-275 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="hidden md:flex flex-col space-y-8">
            <div>
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                The New Ownership
              </span>
              <h1 className="text-6xl font-extrabold tracking-tighter leading-tight text-on-surface">
                Start Your Journey <br />
                <span className="text-primary">to Conscious Living.</span>
              </h1>
            </div>
            <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
              Join a global community of creators choosing access over excess.
              Gain instant access to the world's best tools, guilt-free.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex flex-col gap-2">
                <VerifiedIcon className="text-primary" />
                <h3 className="font-bold text-on-surface">Insured Gear</h3>
                <p className="text-sm text-on-surface-variant">
                  Every piece of equipment is fully covered. Rent or lend with
                  total financial security.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <EnergySavingsLeafIcon className="text-primary" />
                <h3 className="font-bold text-on-surface">Sustainable</h3>
                <p className="text-sm text-on-surface-variant">
                  Minimize your carbon footprint by sharing resources instead of
                  buying new.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="glass-panel p-8 md:p-10 rounded-xl ghost-border shadow-2xl">
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">
                  Join the Movement
                </h2>
                <p className="text-on-surface-variant">
                  Start your journey with Rent Back today.
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-semibold text-primary tracking-wider uppercase ml-1">
                    Full Name
                  </label>
                  <InputBase
                    className="w-full bg-surface-container-high text-on-surface px-4 py-2 rounded-xl focus-within:ring-1 focus-within:ring-primary focus-within:bg-surface-container-highest transition-all placeholder:text-outline/50"
                    placeholder="Alex Rivera"
                    type="text"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-semibold text-primary tracking-wider uppercase ml-1">
                    Email Address
                  </label>
                  <InputBase
                    className="w-full bg-surface-container-high text-on-surface px-4 py-2 rounded-xl focus-within:ring-1 focus-within:ring-primary focus-within:bg-surface-container-highest transition-all placeholder:text-outline/50"
                    placeholder="alex@example.com"
                    type="email"
                  />
                </div>
                <div className="space-y-1.5 flex flex-col">
                  <label className="text-xs font-semibold text-primary tracking-wider uppercase ml-1">
                    Password
                  </label>
                  <InputBase
                    className="w-full bg-surface-container-high text-on-surface px-4 py-2 rounded-xl focus-within:ring-1 focus-within:ring-primary focus-within:bg-surface-container-highest transition-all placeholder:text-outline/50"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
                <p className="text-[10px] text-center text-on-surface-variant/70 uppercase tracking-widest mb-1 mt-4">
                  Join 12k+ conscious creators
                </p>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="signature-gradient text-on-primary font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 normal-case text-base"
                  sx={{ backgroundColor: "transparent", boxShadow: "none" }}
                >
                  Sign Up
                </Button>
              </form>

              <div className="relative my-8">
                <Divider className="border-white/5" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="bg-surface-container px-4 text-xs text-on-surface-variant font-medium tracking-widest uppercase">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  className="bg-surface-container-high ghost-border py-3.5 rounded-xl text-on-surface font-medium hover:bg-surface-container-highest transition-colors active:scale-[0.98] normal-case border-none"
                  sx={{ color: "#dde2f5" }}
                >
                  Google
                </Button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-on-surface-variant text-sm">
                  Already have an account?
                  <a
                    className="text-primary font-bold hover:underline ml-1"
                    href="#"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
