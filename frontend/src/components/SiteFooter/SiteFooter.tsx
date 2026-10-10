import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/useLanguage";
import { Brand } from "../Brand/Brand";
import "./SiteFooter.css";

const currentYear = new Date().getFullYear();

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="site-footer__main page-container">
        <div className="site-footer__brand">
          <Brand inverse />
          <p>{t("footer.note")}</p>
        </div>
        <div className="site-footer__links">
          <span className="site-footer__label">{t("footer.explore")}</span>
          <a href="/#services">{t("nav.services")}</a>
          <Link to="/panchang">{t("panchang.title")}</Link>
          <Link to="/calendar">{t("nav.calendar")}</Link>
          <a href="/#about">{t("nav.about")}</a>
          <Link to="/booking">{t("nav.book")}</Link>
        </div>
        <div className="site-footer__links site-footer__contact">
          <span className="site-footer__label">{t("footer.contact")}</span>
          <Link to="/booking">
            <CalendarDays size={15} /> Enquire for availability
          </Link>
          <a href="/#contact">{t("nav.contact")}</a>
          <Link to="/admin" className="site-footer__admin">
            {t("nav.admin")} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="site-footer__bottom page-container">
        <span>
          © {currentYear} Pandit Lavakush Ojha. {t("footer.rights")}
        </span>
        <span className="site-footer__mantra">ॐ शान्तिः शान्तिः शान्तिः</span>
      </div>
    </footer>
  );
}
