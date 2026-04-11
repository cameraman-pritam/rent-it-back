import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const fetchUserData = async (currentUser) => {
      if (currentUser) {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", currentUser.id)
            .maybeSingle();

          if (!error && data) {
            setUserData(data);
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error(error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoadingAuth(false);
    };

    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      setUser(currentUser);
      await fetchUserData(currentUser);
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        await fetchUserData(currentUser);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loadingAuth }}>
      {!loadingAuth && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
