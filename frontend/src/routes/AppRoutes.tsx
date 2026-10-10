import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout/AdminLayout";
import { PublicLayout } from "../layouts/PublicLayout/PublicLayout";
import { AdminDashboard } from "../pages/AdminDashboard/AdminDashboard";
import { BookingPage } from "../pages/Booking/BookingPage";
import { EventCalendarPage } from "../pages/EventCalendar/EventCalendarPage";
import { HomePage } from "../pages/Home/HomePage";
import { MediaLibrary } from "../pages/MediaLibrary/MediaLibrary";
import { PanchangPage } from "../pages/Panchang/PanchangPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/panchang" element={<PanchangPage />} />
        <Route path="/calendar" element={<EventCalendarPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="media" element={<MediaLibrary />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
