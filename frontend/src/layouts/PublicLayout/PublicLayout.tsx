import { Outlet } from "react-router-dom";
import { SiteFooter } from "../../components/SiteFooter/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader/SiteHeader";
import "./PublicLayout.css";

export function PublicLayout() {
  return (
    <div className="public-shell">
      <SiteHeader />
      <main className="public-main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
