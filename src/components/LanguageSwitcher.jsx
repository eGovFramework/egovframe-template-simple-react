import { useTranslation } from "@/hooks/useTranslation";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useTranslation();

  const toggleLanguage = () => {
    const newLang = currentLanguage === "ko" ? "en" : "ko";
    changeLanguage(newLang);
  };

  return (
    <div className="language-switch-container">
      <div className="language-switch" onClick={toggleLanguage}>
        <div
          className={`switch-slider ${
            currentLanguage === "en" ? "active" : ""
          }`}
        >
          <span className="flag">🇰🇷</span>
          <span className="flag">🇺🇸</span>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
