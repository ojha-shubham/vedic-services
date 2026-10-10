import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Search,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ceremonies } from "../../config/services";
import { useLanguage } from "../../contexts/useLanguage";
import {
  getBookings,
  updateBookingStatus,
} from "../../services/booking.service";
import type { Booking, BookingStatus } from "../../types/booking";
import "./AdminDashboard.css";
import "./AdminDashboard.css";

const statuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

function statusKey(status: BookingStatus) {
  return `admin.${status}Status` as const;
}

export function AdminDashboard() {
  const { language, t } = useLanguage();
  const [initialData] = useState(() => {
    try {
      return { bookings: getBookings(), error: "" };
    } catch (cause) {
      const error =
        cause instanceof Error
          ? cause.message
          : "Could not read saved enquiries.";
      return { bookings: [], error };
    }
  });
  const [bookings, setBookings] = useState<Booking[]>(initialData.bookings);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all",
  );
  const [loadError, setLoadError] = useState(initialData.error);

  const visibleBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      const ceremonyName =
        ceremonies.find((ceremony) => ceremony.id === booking.ceremonyId)
          ?.name ?? booking.ceremonyId;
      const matchesSearch =
        !normalizedQuery ||
        `${booking.name} ${ceremonyName} ${booking.location}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      return matchesStatus && matchesSearch;
    });
  }, [bookings, query, statusFilter]);

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending",
  ).length;
  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed",
  ).length;

  function handleStatusChange(id: string, status: BookingStatus) {
    try {
      updateBookingStatus(id, status);
      setBookings(getBookings());
      setLoadError("");
    } catch (cause) {
      setLoadError(
        cause instanceof Error
          ? cause.message
          : "Could not update this enquiry.",
      );
    }
  }

  function ceremonyLabel(booking: Booking) {
    const ceremony = ceremonies.find((item) => item.id === booking.ceremonyId);
    return ceremony
      ? language === "hi"
        ? ceremony.nameHi
        : ceremony.name
      : booking.ceremonyId;
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T12:00:00`));
  }

  return (
    <section
      className={`admin-dashboard${language === "hi" ? " admin-dashboard--hindi" : ""}`}
    >
      <div className="admin-heading">
        <div>
          <span className="eyebrow">
            <span />
            {language === "hi" ? "आपका कार्यक्षेत्र" : "YOUR WORKSPACE"}
          </span>
          <h1>{t("admin.title")}</h1>
          <p>{t("admin.subtitle")}</p>
        </div>
        <Link to="/booking" className="button button--primary">
          {t("admin.newBooking")} <ArrowUpRight size={17} />
        </Link>
      </div>

      {loadError && (
        <p className="admin-error" role="alert">
          {loadError}
        </p>
      )}

      <div className="admin-metrics">
        <article className="admin-metric">
          <span className="admin-metric__icon admin-metric__icon--saffron">
            <CalendarDays size={19} />
          </span>
          <div>
            <span>{t("admin.total")}</span>
            <strong>{bookings.length}</strong>
          </div>
          <small>{t("admin.device")}</small>
        </article>
        <article className="admin-metric">
          <span className="admin-metric__icon admin-metric__icon--gold">
            <Clock3 size={19} />
          </span>
          <div>
            <span>{t("admin.pending")}</span>
            <strong>{pendingCount}</strong>
          </div>
          <small>{t("admin.needsResponse")}</small>
        </article>
        <article className="admin-metric">
          <span className="admin-metric__icon admin-metric__icon--green">
            <Check size={19} />
          </span>
          <div>
            <span>{t("admin.confirmed")}</span>
            <strong>{confirmedCount}</strong>
          </div>
          <small>{t("admin.ready")}</small>
        </article>
      </div>

      <section className="booking-list-panel">
        <div className="booking-list-panel__heading">
          <div>
            <span className="eyebrow">
              <span />
              {language === "hi" ? "आपकी बुकिंग" : "YOUR BOOKINGS"}
            </span>
            <h2>{t("admin.table")}</h2>
          </div>
          <div className="booking-list-panel__count">
            <UsersRound size={16} /> {bookings.length}
          </div>
        </div>
        <div className="booking-list-toolbar">
          <label className="booking-search">
            <Search size={17} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("admin.search")}
              aria-label={t("admin.search")}
            />
          </label>
          <label className="booking-filter">
            <span className="visually-hidden">{t("admin.status")}</span>
            <select
              value={statusFilter}
              onChange={(event) => {
                const value = event.target.value;
                if (value === "all") {
                  setStatusFilter("all");
                } else {
                  const status = statuses.find(
                    (candidate) => candidate === value,
                  );
                  if (status) setStatusFilter(status);
                }
              }}
            >
              <option value="all">{t("admin.all")}</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {t(statusKey(status))}
                </option>
              ))}
            </select>
          </label>
        </div>

        {visibleBookings.length > 0 ? (
          <div className="booking-table-scroll">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>{t("admin.guest")}</th>
                  <th>{t("admin.ceremony")}</th>
                  <th>{t("admin.date")}</th>
                  <th>{t("admin.location")}</th>
                  <th>{t("admin.status")}</th>
                </tr>
              </thead>
              <tbody>
                {visibleBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td data-label={t("admin.guest")}>
                      <strong>{booking.name}</strong>
                      <span className="booking-table__sub">
                        {booking.phone}
                      </span>
                      {booking.email && (
                        <span className="booking-table__sub">
                          {booking.email}
                        </span>
                      )}
                    </td>
                    <td data-label={t("admin.ceremony")}>
                      <strong>{ceremonyLabel(booking)}</strong>
                      <span className="booking-table__sub">{booking.time}</span>
                    </td>
                    <td data-label={t("admin.date")}>
                      {formatDate(booking.date)}
                    </td>
                    <td data-label={t("admin.location")}>{booking.location}</td>
                    <td data-label={t("admin.status")}>
                      <label className="status-select">
                        <span className="visually-hidden">
                          {t("admin.status")} — {booking.name}
                        </span>
                        <select
                          className={`status-select__control status-select__control--${booking.status}`}
                          value={booking.status}
                          onChange={(event) => {
                            const status = statuses.find(
                              (candidate) => candidate === event.target.value,
                            );
                            if (status) handleStatusChange(booking.id, status);
                          }}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {t(statusKey(status))}
                            </option>
                          ))}
                        </select>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="booking-empty">
            <span className="booking-empty__icon">
              <CalendarDays size={23} />
            </span>
            <p>
              {loadError
                ? language === "hi"
                  ? "पूछताछ लोड नहीं हो सकी।"
                  : "Enquiries could not be loaded."
                : t("admin.empty")}
            </p>
            {!loadError && (
              <Link to="/booking" className="text-link">
                {t("cta.button")} <ArrowUpRight size={15} />
              </Link>
            )}
          </div>
        )}
        <p className="booking-list-panel__footnote">
          {language === "hi"
            ? "यह पूर्वावलोकन डैशबोर्ड है। जानकारी इस ब्राउज़र में ही रहती है—यह अभी किसी सर्वर पर नहीं भेजी जाती।"
            : "Preview only. Enquiries stay in this browser and are not sent to a server."}
        </p>
      </section>
    </section>
  );
}
