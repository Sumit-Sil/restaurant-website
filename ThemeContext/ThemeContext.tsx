import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface ThemeContextProps {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Update the body class to reflect the current theme
  useEffect(() => {
    document.body.className = mode === "light" ? "light-mode" : "dark-mode";
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#333333",
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
};
