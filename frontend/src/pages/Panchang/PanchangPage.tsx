import { useEffect, useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { useLanguage } from "../../contexts/useLanguage";
import type { DailyPanchangResult } from "panchang-ts";
import {
  formatPanchangDate,
  formatPanchangTime,
  getLocalDateString,
  getPanchangForDate,
} from "../../services/panchang.service";
import "./PanchangPage.css";

export function PanchangPage() {
  const { language, t } = useLanguage();
  const [date, setDate] = useState(() => getLocalDateString());
  const [panchang, setPanchang] = useState<DailyPanchangResult | null>(null);
  const [calculationStatus, setCalculationStatus] = useState<
    "loading" | "ready" | "unavailable" | "error"
  >("loading");

  useEffect(() => {
    let active = true;
    getPanchangForDate(date, language)
      .then((result) => {
        if (active) {
          setPanchang(result);
          setCalculationStatus(result ? "ready" : "unavailable");
        }
      })
      .catch((error: unknown) => {
        console.error("Unable to calculate Panchang for selected date", error);
        if (active) {
          setCalculationStatus("error");
        }
      });
    return () => {
      active = false;
    };
  }, [date, language]);

  const details = panchang
    ? [
        {
          label: t("panchang.tithi"),
          value: panchang.angas.tithis[0]?.name ?? "—",
        },
        {
          label: t("panchang.paksha"),
          value: panchang.angas.tithis[0]?.paksha ?? "—",
        },
        {
          label: t("panchang.nakshatra"),
          value: panchang.angas.nakshatras[0]?.name ?? "—",
        },
        {
          label: t("panchang.yoga"),
          value: panchang.angas.yogas[0]?.name ?? "—",
        },
        {
          label: t("panchang.karana"),
          value: panchang.angas.karanas[0]?.name ?? "—",
        },
        { label: t("panchang.vara"), value: panchang.angas.vara.name },
        {
          label: t("panchang.month"),
          value: panchang.calendar.chandramasa.name,
        },
        {
          label: t("panchang.sunrise"),
          value: formatPanchangTime(panchang.sun.riseLocal, language),
        },
        {
          label: t("panchang.sunset"),
          value: formatPanchangTime(panchang.sun.setLocal, language),
        },
        {
          label: t("panchang.brahma"),
          value: `${formatPanchangTime(panchang.muhurtas.brahma.startLocal, language)} – ${formatPanchangTime(panchang.muhurtas.brahma.endLocal, language)}`,
        },
        {
          label: t("panchang.rahu"),
          value: `${formatPanchangTime(panchang.inauspicious.rahuKalam.startLocal, language)} – ${formatPanchangTime(panchang.inauspicious.rahuKalam.endLocal, language)}`,
        },
      ]
    : [];

  return (
    <section
      className={`panchang-page${language === "hi" ? " panchang-page--hindi" : ""}`}
    >
      <div className="page-container">
        <header className="panchang-page__heading">
          <span className="eyebrow">
            <span />
            {t("panchang.pageEyebrow")}
          </span>
          <h1>{t("panchang.pageTitle")}</h1>
          <p>{t("panchang.pageCopy")}</p>
          <div className="panchang-page__location">
            <MapPin size={16} />
            {t("panchang.location")}
          </div>
        </header>

        <div className="panchang-page__controls">
          <label htmlFor="panchang-date">
            <CalendarDays size={17} />
            <span>{t("panchang.selectDate")}</span>
          </label>
          <input
            id="panchang-date"
            type="date"
            value={date}
            onChange={(event) => {
              setPanchang(null);
              setCalculationStatus("loading");
              setDate(event.target.value);
            }}
          />
        </div>

        {panchang ? (
          <>
            <div className="panchang-page__date">
              <span>{t("panchang.date")}</span>
              <h2>{formatPanchangDate(panchang.date, language)}</h2>
            </div>
            <div className="panchang-page__grid">
              {details.map(({ label, value }) => (
                <article className="panchang-page__item" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </article>
              ))}
            </div>
            {panchang.festivals.length > 0 && (
              <section className="panchang-page__festivals">
                <h2>{t("calendar.festivalsTitle")}</h2>
                <ul>
                  {panchang.festivals.map((festival) => (
                    <li key={festival.key}>
                      <strong>{festival.name}</strong>
                      {festival.description && (
                        <span>{festival.description}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        ) : (
          <p className="panchang-page__unavailable">
            {calculationStatus === "error"
              ? t("panchang.error")
              : calculationStatus === "unavailable"
                ? t("panchang.unavailable")
                : t("panchang.loading")}
          </p>
        )}

        <p className="panchang-page__note">{t("panchang.calculationNote")}</p>
      </div>
    </section>
  );
}
