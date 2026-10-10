import { useState } from "react";
import { Languages, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/useLanguage";
import { Brand } from "../Brand/Brand";
import "./SiteHeader.css";

export function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleLanguage() {
    setLanguage(language === "en" ? "hi" : "en");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand />
        <button
          type="button"
          className="site-header__menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav
          id="primary-navigation"
          className={`site-nav${menuOpen ? " site-nav--open" : ""}`}
          aria-label="Primary navigation"
        >
          <a href="/#services" onClick={closeMenu}>
            {t("nav.services")}
          </a>
          <Link to="/panchang" onClick={closeMenu}>
            {t("panchang.title")}
          </Link>
          <Link to="/calendar" onClick={closeMenu}>
            {t("nav.calendar")}
          </Link>
          <a href="/#about" onClick={closeMenu}>
            {t("nav.about")}
          </a>
          <a href="/#contact" onClick={closeMenu}>
            {t("nav.contact")}
          </a>
          <button
            type="button"
            className="language-toggle"
            onClick={toggleLanguage}
            aria-label={`Switch language to ${language === "en" ? "Hindi" : "English"}`}
          >
            <Languages size={16} />
            <span>{t("language.label")}</span>
          </button>
          <Link
            to="/booking"
            className="button button--primary site-nav__booking"
            onClick={closeMenu}
          >
            {t("nav.book")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
