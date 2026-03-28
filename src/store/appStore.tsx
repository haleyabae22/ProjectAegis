import React, { createContext, useContext, useMemo, useState } from "react";

import { ThemeName } from "../theme/colors";

type AppStore = {
  count: number;
  themeName: ThemeName;
  increment: () => void;
  reset: () => void;
  toggleTheme: () => void;
};

const AppStoreContext = createContext<AppStore | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const value = useMemo<AppStore>(
    () => ({
      count,
      themeName,
      increment: () => setCount((prev) => prev + 1),
      reset: () => setCount(0),
      toggleTheme: () =>
        setThemeName((prev) => (prev === "light" ? "dark" : "light"))
    }),
    [count, themeName]
  );

  return (
    <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used inside AppProvider");
  }
  return context;
}
