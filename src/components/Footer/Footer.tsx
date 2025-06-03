import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import css from "./Footer.module.scss";
import { StarsContainer } from "../StarsContainer/StarsContainer";

export const Footer = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    const browserLang = navigator.language.startsWith("ru") ? "ru" : "en";
    const initialLang = storedLang || browserLang;
    i18n.changeLanguage(initialLang);
    setLang(initialLang);
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    setLang(newLang);
  };

  return (
    <footer className={css.footer}>
      <StarsContainer />
      <div className={css.footerContent}>
        <p>© 2025 I-Dentity</p>
        <button className={css.langToggle} onClick={toggleLanguage}>
          {lang === "en" ? "🇷🇺 Русский" : "🇺🇸 English"}
        </button>
      </div>
    </footer>
  );
};
