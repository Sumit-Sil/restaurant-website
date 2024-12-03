import React, { ReactNode, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useThemeContext } from "@/ThemeContext/ThemeContext"; // Import useThemeContext

interface Props {
  children: ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  const { mode } = useThemeContext(); // Access the current theme mode

  // Use useEffect to dynamically apply background class to the body when mode changes
  useEffect(() => {
    document.body.className = mode === "light" ? "light-mode" : "dark-mode"; // Toggle the class based on theme
  }, [mode]);

  return (
    <>
      <Header />
      {/* Apply theme styles globally via body class */}
      {/* <div className={`wrapper-container ${mode === "light" ? "light-mode" : "dark-mode"}`}> */}
        {children}
      {/* </div> */}
      <Footer />
    </>
  );
};

export default Wrapper;
