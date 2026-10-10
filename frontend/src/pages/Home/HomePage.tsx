import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Flower2,
  Flame,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Sparkles,
  Sun,
  Sunset,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ceremonies } from "../../config/services";
import { useLanguage } from "../../contexts/useLanguage";
import { getPublishedMediaContent } from "../../services/content.service";
import {
  formatPanchangDate,
  formatPanchangTime,
  getFestivalLocalDate,
  getFestivalsForYear,
  getLocalDateString,
  getPanchangForDate,
} from "../../services/panchang.service";
import type { DailyPanchangResult, FestivalDay } from "panchang-ts";
import "./HomePage.css";

const values = [
  { icon: HeartHandshake, key: "trust.guidance" },
  { icon: Flower2, key: "trust.tradition" },
  { icon: Sparkles, key: "trust.preparation" },
] as const;

const steps = [
  {
    number: "01",
    title: "process.step1",
    copy: "process.step1.copy",
    icon: MapPin,
  },
  {
    number: "02",
    title: "process.step2",
    copy: "process.step2.copy",
    icon: Flower2,
  },
  {
    number: "03",
    title: "process.step3",
    copy: "process.step3.copy",
    icon: Flame,
  },
] as const;

export function HomePage() {
  const { language, t } = useLanguage();
  const [panchang, setPanchang] = useState<DailyPanchangResult | null>(null);
  const [festivalHighlights, setFestivalHighlights] = useState<FestivalDay[]>(
    [],
  );
  const [panchangError, setPanchangError] = useState(false);
  const [festivalReady, setFestivalReady] = useState(false);
  const [testimonials] = useState(() =>
    getPublishedMediaContent().filter(
      (item) => item.category === "testimonial",
    ),
  );

  useEffect(() => {
    const localDate = getLocalDateString();
    let active = true;
    Promise.all([
      getPanchangForDate(localDate, language),
      getFestivalsForYear(Number(localDate.slice(0, 4)), language),
    ])
      .then(([daily, festivals]) => {
        if (!active) {
          return;
        }
        setPanchang(daily);
        setFestivalHighlights(
          festivals
            .filter((item) => getFestivalLocalDate(item.date) >= localDate)
            .slice(0, 3),
        );
        setFestivalReady(true);
        setPanchangError(false);
      })
      .catch((error: unknown) => {
        console.error("Unable to load Ayodhya Panchang data", error);
        if (active) {
          setFestivalReady(true);
          setPanchangError(true);
        }
      });
    return () => {
      active = false;
    };
  }, [language]);

  return (
    <div className={`home-page${language === "hi" ? " home-page--hindi" : ""}`}>
      <section className="hero-section">
        <div className="hero-section__copy">
          <div className="hero-kicker">
            <span className="hero-kicker__dot" />
            {t("hero.tag")}
          </div>
          <h1>{t("hero.title")}</h1>
          <p className="hero-section__intro">{t("hero.copy")}</p>
          <div className="hero-section__actions">
            <Link
              className="button button--primary button--large"
              to="/booking"
            >
              {t("hero.primary")} <ArrowUpRight size={18} />
            </Link>
            <a className="hero-text-link" href="#services">
              {t("hero.secondary")} <ArrowDown size={16} />
            </a>
          </div>
          <p className="hero-section__note">
            <span className="hero-section__note-mark">✦</span> {t("hero.note")}
          </p>
        </div>
        <div
          className="hero-art"
          role="img"
          aria-label="A decorated kalash with coconut prepared for a Hindu puja ceremony"
        >
          <div className="hero-art__photo" />
          <div className="hero-art__shade" />
          <div className="hero-art__corner hero-art__corner--top" />
          <div className="hero-art__corner hero-art__corner--bottom" />
          <div className="hero-art__caption">
            <span className="hero-art__caption-symbol">ॐ</span>
            <span>
              <strong>शुभमस्तु</strong>
              <small>May auspiciousness be with you</small>
            </span>
          </div>
          <div className="hero-art__seal" aria-hidden="true">
            श्री
          </div>
        </div>
        <a
          className="hero-scroll"
          href="#services"
          aria-label="Scroll to services"
        >
          <span />
        </a>
      </section>

      <section className="values-strip" aria-label="Our approach">
        <div className="values-strip__inner page-container">
          {values.map(({ icon: Icon, key }) => (
            <div className="value-item" key={key}>
              <span className="value-item__icon">
                <Icon size={18} strokeWidth={1.7} />
              </span>
              <span>{t(key)}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        className="panchang-section section-space"
        aria-label="Daily Panchang overview"
      >
        <div className="page-container panchang-section__inner">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span />
                {t("panchang.eyebrow")}
              </span>
              <h2>{t("panchang.title")}</h2>
            </div>
            <p>{t("panchang.copy")}</p>
          </div>

          <div className="panchang-card">
            <div className="panchang-card__header">
              <div>
                <p className="panchang-card__label">{t("panchang.date")}</p>
                <h3>
                  {panchang
                    ? formatPanchangDate(panchang.date, language)
                    : t("panchang.loading")}
                </h3>
              </div>
              <span className="panchang-badge">{t("panchang.muhurta")}</span>
            </div>

            {panchang && (
              <div className="panchang-grid">
                <div className="panchang-item">
                  <span>{t("panchang.tithi")}</span>
                  <strong>{panchang.angas.tithis[0]?.name ?? "—"}</strong>
                </div>
                <div className="panchang-item">
                  <span>{t("panchang.nakshatra")}</span>
                  <strong>{panchang.angas.nakshatras[0]?.name ?? "—"}</strong>
                </div>
                <div className="panchang-item">
                  <span>{t("panchang.yoga")}</span>
                  <strong>{panchang.angas.yogas[0]?.name ?? "—"}</strong>
                </div>
                <div className="panchang-item">
                  <span>{t("panchang.vara")}</span>
                  <strong>{panchang.angas.vara.name}</strong>
                </div>
              </div>
            )}
            {!panchang && panchangError && (
              <p className="daily-note">{t("panchang.error")}</p>
            )}

            <div className="panchang-footer">
              <Link to="/panchang" className="button button--secondary">
                {t("panchang.full")}
              </Link>
              <p>{t("panchang.note")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-space" id="services">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span />
                {t("services.eyebrow")}
              </span>
              <h2>{t("services.title")}</h2>
            </div>
            <p>{t("services.copy")}</p>
          </div>
          <div className="service-grid">
            {ceremonies.map((ceremony, index) => (
              <article className="service-card" key={ceremony.id}>
                <div
                  className={`service-card__symbol service-card__symbol--${index + 1}`}
                >
                  <span aria-hidden="true">{ceremony.icon}</span>
                  <span className="service-card__number">0{index + 1}</span>
                </div>
                <div className="service-card__body">
                  <h3>{language === "hi" ? ceremony.nameHi : ceremony.name}</h3>
                  <p>
                    {language === "hi"
                      ? ceremony.descriptionHi
                      : ceremony.description}
                  </p>
                  <Link
                    to={`/booking?ceremony=${ceremony.id}`}
                    className="service-card__link"
                    aria-label={`${t("services.book")}: ${language === "hi" ? ceremony.nameHi : ceremony.name}`}
                  >
                    {t("services.book")} <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="services-footnote">
            <span className="services-footnote__ornament">✳</span>
            <p>
              {language === "hi"
                ? "आपके विशेष अवसर के लिए कोई अन्य पूजा चाहिए? अपनी आवश्यकता साझा करें।"
                : "Looking for a different ceremony? Tell us what your occasion means to you."}
            </p>
            <Link to="/booking">
              {t("services.all")} <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-section__inner page-container">
          <div className="about-art" aria-hidden="true">
            <div className="about-art__image" />
            <div className="about-art__seal">॥ श्री गणेशाय नमः ॥</div>
            <div className="about-art__quote">
              <span>“</span>
              <p>श्रद्धावान् लभते ज्ञानम्</p>
              <small>Through devotion, we find understanding.</small>
            </div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">
              <span />
              {t("about.eyebrow")}
            </span>
            <h2>{t("about.title")}</h2>
            <p className="about-copy__intro">{t("about.copy")}</p>
            <ul>
              {(["about.point1", "about.point2", "about.point3"] as const).map(
                (key) => (
                  <li key={key}>
                    <span>
                      <Check size={15} />
                    </span>
                    {t(key)}
                  </li>
                ),
              )}
            </ul>
            <Link to="/booking" className="text-link">
              {t("about.cta")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="process-section section-space">
        <div className="page-container">
          <div className="process-heading">
            <span className="eyebrow eyebrow--center">
              <span />
              {t("process.eyebrow")}
            </span>
            <h2>{t("process.title")}</h2>
          </div>
          <div className="process-grid">
            {steps.map(({ number, title, copy, icon: Icon }) => (
              <article className="process-step" key={number}>
                <div className="process-step__top">
                  <span className="process-step__number">{number}</span>
                  <span className="process-step__icon">
                    <Icon size={21} strokeWidth={1.6} />
                  </span>
                </div>
                <h3>{t(title)}</h3>
                <p>{t(copy)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="daily-section section-space"
        aria-label="Daily aarti and puja timings"
      >
        <div className="page-container daily-section__inner">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span />
                {t("daily.eyebrow")}
              </span>
              <h2>{t("daily.title")}</h2>
            </div>
            <p>{t("daily.copy")}</p>
          </div>
          <div className="daily-timing-grid">
            {panchang ? (
              <>
                <article className="daily-timing-card">
                  <span className="daily-timing-card__icon">
                    <Sun size={18} />
                  </span>
                  <div>
                    <p>{t("daily.morning")}</p>
                    <strong>
                      {formatPanchangTime(panchang.sun.riseLocal, language)}
                    </strong>
                  </div>
                </article>
                <article className="daily-timing-card">
                  <span className="daily-timing-card__icon">
                    <Sunset size={18} />
                  </span>
                  <div>
                    <p>{t("daily.evening")}</p>
                    <strong>
                      {formatPanchangTime(panchang.sun.setLocal, language)}
                    </strong>
                  </div>
                </article>
                <article className="daily-timing-card">
                  <span className="daily-timing-card__icon">
                    <Flower2 size={18} />
                  </span>
                  <div>
                    <p>{t("panchang.brahma")}</p>
                    <strong>
                      {formatPanchangTime(
                        panchang.muhurtas.brahma.startLocal,
                        language,
                      )}
                      {" – "}
                      {formatPanchangTime(
                        panchang.muhurtas.brahma.endLocal,
                        language,
                      )}
                    </strong>
                  </div>
                </article>
                <article className="daily-timing-card">
                  <span className="daily-timing-card__icon">
                    <Sun size={18} />
                  </span>
                  <div>
                    <p>{t("panchang.rahu")}</p>
                    <strong>
                      {formatPanchangTime(
                        panchang.inauspicious.rahuKalam.startLocal,
                        language,
                      )}
                      {" – "}
                      {formatPanchangTime(
                        panchang.inauspicious.rahuKalam.endLocal,
                        language,
                      )}
                    </strong>
                  </div>
                </article>
              </>
            ) : (
              <p className="daily-note">{t("panchang.loading")}</p>
            )}
          </div>
          <p className="daily-note">{t("panchang.calculationNote")}</p>
        </div>
      </section>

      <section
        className="festival-section section-space"
        aria-label="Upcoming festivals and events"
      >
        <div className="page-container festival-section__inner">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span />
                {t("festival.eyebrow")}
              </span>
              <h2>{t("festival.title")}</h2>
            </div>
            <p>{t("festival.copy")}</p>
          </div>
          <div className="festival-grid">
            {festivalHighlights.map(({ date, festival }) => (
              <article
                className="festival-card"
                key={`${festival.key}-${getFestivalLocalDate(date)}`}
              >
                <span className="festival-card__month">
                  {new Intl.DateTimeFormat(
                    language === "hi" ? "hi-IN" : "en-IN",
                    {
                      timeZone: "Asia/Kolkata",
                      day: "numeric",
                      month: "short",
                    },
                  ).format(date)}
                </span>
                <div>
                  <h3>{festival.name}</h3>
                  <p>{festival.description ?? t("calendar.location")}</p>
                </div>
              </article>
            ))}
            {festivalHighlights.length === 0 && festivalReady && (
              <p className="daily-note">
                {panchangError
                  ? t("calendar.error")
                  : t("calendar.emptyFestivals")}
              </p>
            )}
          </div>
          <div className="festival-cta">
            <Link to="/calendar" className="button button--secondary">
              {t("nav.calendar")}
            </Link>
          </div>
        </div>
      </section>

      <section
        className="testimonials-section section-space"
        aria-label="Testimonials and family reviews"
      >
        <div className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span />
                {t("testimonials.eyebrow")}
              </span>
              <h2>{t("testimonials.title")}</h2>
            </div>
            <p>{t("testimonials.copy")}</p>
          </div>
          {testimonials.length > 0 ? (
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <article className="testimonial-card" key={item.id}>
                  <p>
                    “{language === "hi" ? item.descriptionHi : item.description}
                    ”
                  </p>
                  <div className="testimonial-card__person">
                    <strong>
                      {language === "hi" ? item.titleHi : item.title}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="testimonial-empty">{t("testimonials.empty")}</p>
          )}
        </div>
      </section>

      <a
        className="whatsapp-float"
        href="https://wa.me/919014465414?text=Namaste%20Pandit%20ji%2C%20I%20want%20to%20book%20a%20puja."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      <section className="contact-section" id="contact">
        <div className="contact-section__inner page-container">
          <div className="contact-section__mandala" aria-hidden="true">
            ॐ
          </div>
          <div className="contact-section__copy">
            <span className="eyebrow eyebrow--light">{t("cta.title")}</span>
            <h2>{t("cta.copy")}</h2>
          </div>
          <Link to="/booking" className="button button--light button--large">
            {t("cta.button")} <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
