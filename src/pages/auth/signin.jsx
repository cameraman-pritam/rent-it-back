import React, { useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../utils/supabase";

const SignIn = () => {
  const { user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  if (user) {
    const name =
      user.user_metadata?.full_name || user.user_metadata?.name || "No Name";

    const email = user.email;
    const isVerified = !!user.email_confirmed_at;

    const handleLogout = async () => {
      await supabase.auth.signOut();
      window.location.reload(); // or redirect
    };

    const handleDeleteAccount = async () => {
      const confirmDelete = window.confirm("Delete your account permanently?");
      if (!confirmDelete) return;

      // Look how clean this is!
      // The Supabase client automatically attaches the current user's token,
      // and your Edge function reads everything it needs directly from that token.
      const { error } = await supabase.functions.invoke("delete-user");

      if (error) {
        console.error("Function error details:", error);
        alert(`Failed to delete account: ${error.message}`);
      } else {
        alert("Account deleted successfully.");
        await supabase.auth.signOut();
        window.location.reload();
      }
    };

    return (
      <div className="text-white text-center mt-20 space-y-4">
        <h2 className="text-2xl font-bold">Welcome 👋</h2>

        <p>
          <span className="text-primary font-semibold">Name:</span> {name}
        </p>

        <p>
          <span className="text-primary font-semibold">Email:</span> {email}
        </p>

        <p>
          <span className="text-primary font-semibold">Status:</span>{" "}
          {isVerified ? (
            <span className="text-green-400">Verified ✅</span>
          ) : (
            <span className="text-yellow-400">Not Verified ⚠️</span>
          )}
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest min-h-screen flex items-center justify-center overflow-hidden font-body">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080e1b_100%)] opacity-80" />
      </div>

      <main className="relative z-10 w-full max-w-120 px-6 py-12 flex flex-col items-center">
        <header className="text-center mb-10 space-y-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
            Rent Back
          </h1>
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
            Own less. Live more.
          </p>
        </header>

        <section className="w-full backdrop-blur-xl bg-surface-container/40 rounded-2xl p-1 border border-outline-variant/15 shadow-xl">
          <div className="bg-surface-container/60 rounded-2xl p-8 md:p-12 space-y-8">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-xl font-semibold text-on-surface">
                Welcome back
              </h2>
              <p className="text-on-surface-variant text-sm">
                Please enter your details to sign in.
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="flex items-center bg-surface-container-high/50 rounded-xl px-3">
                <AlternateEmailIcon className="text-on-surface-variant/50 mr-2" />
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="name@company.com"
                  InputProps={{ disableUnderline: true }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex items-center bg-surface-container-high/50 rounded-xl px-3">
                <LockIcon className="text-on-surface-variant/50 mr-2" />
                <TextField
                  fullWidth
                  type="password"
                  variant="standard"
                  placeholder="••••••••"
                  InputProps={{ disableUnderline: true }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              {/* Button */}
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                className="bg-primary! text-black! font-bold! py-3! rounded-xl! hover:bg-primary-fixed-dim! transition-all"
              >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>
            </form>

            <div className="pt-4 flex flex-col items-center space-y-4">
              <p className="text-on-surface-variant text-sm">
                Don&apos;t have an account?
                <a
                  href="/signup"
                  className="text-on-surface font-semibold hover:text-primary ml-1"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SignIn;
