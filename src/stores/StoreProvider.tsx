"use client";

import { createContext, useContext, useEffect } from "react";
import { onSnapshot } from "mobx-state-tree";
import { taskStore, updateTaskStoreWithSnapshot } from "./TaskStore";
import { authStore } from "./authStore";

// Create context for the store
const StoreContext = createContext({ taskStore, authStore });

export const StoreProvider = ({ children }: any) => {
  useEffect(() => {
    // This ensures we access localStorage only in the client-side environment
    if (typeof window !== "undefined") {
      // Restore taskStore from localStorage
      const initialSnapshot = localStorage.getItem("taskStore");
      if (initialSnapshot) {
        updateTaskStoreWithSnapshot(JSON.parse(initialSnapshot));
      }

      // Sync taskStore to localStorage
      onSnapshot(taskStore, (snapshot) => {
        localStorage.setItem("taskStore", JSON.stringify(snapshot));
      });
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <StoreContext.Provider value={{ taskStore, authStore }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to access the store
export const useStore = () => useContext(StoreContext);
