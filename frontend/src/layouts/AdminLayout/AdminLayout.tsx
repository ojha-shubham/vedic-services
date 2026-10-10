import { NavLink, Outlet } from "react-router-dom";
import { ArrowLeft, Languages, Newspaper, PanelLeftClose } from "lucide-react";
import { Brand } from "../../components/Brand/Brand";
import { useLanguage } from "../../contexts/useLanguage";
import "./AdminLayout.css";

export function AdminLayout() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <Brand />
        <div className="admin-topbar__actions">
          <NavLink to="/admin" className="admin-nav-chip" end>
            <PanelLeftClose size={15} />
            <span>{language === "hi" ? "डैशबोर्ड" : "Dashboard"}</span>
          </NavLink>
          <NavLink to="/admin/media" className="admin-nav-chip">
            <Newspaper size={15} />
            <span>{language === "hi" ? "मीडिया" : "Media"}</span>
          </NavLink>
          <button
            className="language-toggle language-toggle--quiet"
            type="button"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            aria-label={`Switch language to ${language === "en" ? "Hindi" : "English"}`}
          >
            <Languages size={16} />
            {t("language.label")}
          </button>
          <NavLink to="/" className="admin-back-link">
            <ArrowLeft size={16} />
            <span>Website</span>
          </NavLink>
        </div>
      </header>
      <main className="admin-main">
        <div className="admin-preview-note">{t("admin.preview")}</div>
        <Outlet />
      </main>
    </div>
  );
}
