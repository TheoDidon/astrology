import React from "react";
import { Flag } from "semantic-ui-react";
import { useLanguage } from "./context/useLanguage";

export default function LanguageBtn() {
  const { isFrench, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      className="h-8 w-8 flex justify-center items-center mx-4"
    >
      {isFrench ? <Flag name="france" /> : <Flag name="us" />}
    </button>
  );
}
