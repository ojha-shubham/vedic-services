import { useEffect, useMemo, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/useLanguage";
import { getPublishedMediaContent } from "../../services/content.service";
import {
  getFestivalLocalDate,
  getFestivalsForYear,
  getLocalDateString,
} from "../../services/panchang.service";
import type { FestivalDay } from "panchang-ts";
import type { MediaContent } from "../../types/content";
import "./EventCalendarPage.css";

function formatEventDate(value: string, language: "en" | "hi"): string {
  return new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00+05:30`));
}

function formatFestivalDate(value: Date, language: "en" | "hi"): string {
  return new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(value);
}

export function EventCalendarPage() {
  const { language, t } = useLanguage();
  const [today] = useState(() => getLocalDateString());
  const [festivals, setFestivals] = useState<FestivalDay[]>([]);
  const [festivalError, setFestivalError] = useState(false);
  const [festivalReady, setFestivalReady] = useState(false);
  const [content] = useState<MediaContent[]>(() => getPublishedMediaContent());

  useEffect(() => {
    let active = true;
    getFestivalsForYear(Number(today.slice(0, 4)), language)
      .then((items) => {
        if (active) {
          setFestivals(
            items.filter((item) => getFestivalLocalDate(item.date) >= today),
          );
          setFestivalReady(true);
          setFestivalError(false);
        }
      })
      .catch((error: unknown) => {
        console.error("Unable to load festival calendar", error);
        if (active) {
          setFestivalReady(true);
          setFestivalError(true);
        }
      });
    return () => {
      active = false;
    };
  }, [language, today]);

  const upcomingEvents = useMemo(
    () =>
      content
        .filter(
          (item) =>
            item.category === "event" &&
            item.eventDate &&
            item.eventDate >= today,
        )
        .sort((left, right) =>
          (left.eventDate ?? "").localeCompare(right.eventDate ?? ""),
        ),
    [content, today],
  );

  return (
    <section
      className={`event-calendar-page${language === "hi" ? " event-calendar-page--hindi" : ""}`}
    >
      <div className="page-container">
        <header className="event-calendar-page__heading">
          <span className="eyebrow">
            <span />
            {t("calendar.eyebrow")}
          </span>
          <h1>{t("calendar.title")}</h1>
          <p>{t("calendar.copy")}</p>
          <div className="event-calendar-page__location">
            <MapPin size={16} />
            {t("calendar.location")}
          </div>
        </header>

        <section
          className="event-calendar-page__section"
          aria-labelledby="calendar-events-title"
        >
          <div className="event-calendar-page__section-heading">
            <h2 id="calendar-events-title">{t("calendar.eventsTitle")}</h2>
            <p>{t("calendar.adminNote")}</p>
          </div>
          {upcomingEvents.length > 0 ? (
            <div className="event-calendar-page__grid">
              {upcomingEvents.map((event) => (
                <article className="calendar-event-card" key={event.id}>
                  <div className="calendar-event-card__date">
                    <CalendarDays size={19} />
                    <span>
                      {formatEventDate(event.eventDate ?? "", language)}
                    </span>
                  </div>
                  <h3>{language === "hi" ? event.titleHi : event.title}</h3>
                  <p>
                    {language === "hi"
                      ? event.descriptionHi
                      : event.description}
                  </p>
                  {(event.eventTime || event.eventLocation) && (
                    <div className="calendar-event-card__details">
                      {event.eventTime && (
                        <span>
                          {t("calendar.time")}: {event.eventTime}
                        </span>
                      )}
                      {event.eventLocation && (
                        <span>
                          <MapPin size={14} />
                          {event.eventLocation}
                        </span>
                      )}
                    </div>
                  )}
                  <Link to="/booking" className="text-link">
                    {t("calendar.book")}
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="event-calendar-page__empty">
              {t("calendar.emptyEvents")}
            </p>
          )}
        </section>

        <section
          className="event-calendar-page__section"
          aria-labelledby="calendar-festivals-title"
        >
          <div className="event-calendar-page__section-heading">
            <h2 id="calendar-festivals-title">
              {t("calendar.festivalsTitle")}
            </h2>
          </div>
          {festivals.length > 0 ? (
            <div className="event-calendar-page__festival-list">
              {festivals.map(({ date, festival }) => (
                <article
                  className="calendar-festival-card"
                  key={`${festival.key}-${getFestivalLocalDate(date)}`}
                >
                  <time dateTime={getFestivalLocalDate(date)}>
                    {formatFestivalDate(date, language)}
                  </time>
                  <div>
                    <h3>{festival.name}</h3>
                    {festival.description && <p>{festival.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          ) : festivalReady ? (
            <p className="event-calendar-page__empty">
              {festivalError
                ? t("calendar.error")
                : t("calendar.emptyFestivals")}
            </p>
          ) : (
            <p className="event-calendar-page__empty">
              {t("calendar.loading")}
            </p>
          )}
        </section>
      </div>
    </section>
  );
}
