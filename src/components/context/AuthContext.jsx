import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const fetchProfile = async (sessionUser) => {
      if (!sessionUser) {
        setUserData(null);
        setLoadingAuth(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", sessionUser.id)
          .maybeSingle();

        if (!error && data) {
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        setUserData(null);
      } finally {
        // 'finally' guarantees this runs even if the fetch completely fails
        setLoadingAuth(false);
      }
    };

    // 1. Grab the current session on first load
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      fetchProfile(currentUser);
    });

    // 2. Listen for log ins/outs
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        fetchProfile(currentUser);
      }
    );

    // Cleanup
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // If it's loading, show this instead of a terrifying blank white screen
  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-sky-400 font-sans">
        <i className="pi pi-spin pi-spinner text-4xl mb-4"></i>
        <p className="font-bold tracking-widest uppercase">
          Loading RentBack...
        </p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, userData, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
