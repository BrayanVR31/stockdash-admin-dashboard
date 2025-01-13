import { ReactNode, createContext, useEffect, useContext } from "react";
import { useLocalStorage } from "@/hooks";

// Types
type Theme = "dark" | "light" | "system";

interface Props {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeCtxState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Context
const initialThemeCtx: ThemeCtxState = {
  theme: "system",
  setTheme: () => null,
};
const ThemeCtx = createContext<ThemeCtxState>(initialThemeCtx);

/**
 * This provider syncronize theme with react app through localStorage
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "dashboard-ui-theme",
  ...props
}: Props) {
  const { storageValue: theme, changeStorageValue: setTheme } =
    useLocalStorage<Theme>(storageKey, defaultTheme);
  // Side effects
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    // default system theme retrieved by media queries (OS system)
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };
  return (
    <ThemeCtx.Provider {...props} value={value}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeCtx);

  if (context === undefined)
    throw new Error("Theme hook needs to be used with a theme parent provider");
  return context;
};
