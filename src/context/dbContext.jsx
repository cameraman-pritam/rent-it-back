import React, { createContext, useContext, useState } from "react";
import { supabase } from "../utils/supabase";

const DbContext = createContext(undefined);

export const DbProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeDbCommand = async (payload) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "db-engagement",
        {
          body: payload,
        }
      );

      if (fnError) throw fnError;
      if (!data?.success)
        throw new Error(data?.error || "Unknown error occurred");

      return data.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createRecord = (table, data) =>
    executeDbCommand({ action: "CREATE", table, data });

  const readRecord = (table, match) =>
    executeDbCommand({ action: "READ", table, match });

  const updateRecord = (table, data, match) =>
    executeDbCommand({ action: "UPDATE", table, data, match });

  const deleteRecord = (table, match) =>
    executeDbCommand({ action: "DELETE", table, match });

  const value = {
    isLoading,
    error,
    createRecord,
    readRecord,
    updateRecord,
    deleteRecord,
    executeDbCommand,
  };

  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDb = () => {
  const context = useContext(DbContext);
  if (context === undefined) {
    throw new Error("useDb must be used within a DbProvider");
  }
  return context;
};
