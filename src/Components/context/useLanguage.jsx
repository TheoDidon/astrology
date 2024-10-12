import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [isFrench, setIsFrench] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("isFrench");
    if (savedLanguage) {
      setIsFrench(JSON.parse(savedLanguage));
    }
  }, []);

  const toggleLanguage = () => {
    setIsFrench((prev) => {
      const newIsFrench = !prev;
      localStorage.setItem("isFrench", JSON.stringify(newIsFrench));
      return newIsFrench;
    });
  };

  return (
    <LanguageContext.Provider value={{ isFrench, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
