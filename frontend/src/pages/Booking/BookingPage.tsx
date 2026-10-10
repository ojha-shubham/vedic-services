import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { ceremonies } from "../../config/services";
import { useLanguage } from "../../contexts/useLanguage";
import { createBooking } from "../../services/booking.service";
import type { BookingInput } from "../../types/booking";
import "./BookingPage.css";
import "./BookingPage.css";

function localDateValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function BookingPage() {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<BookingInput>({
    name: "",
    phone: "",
    email: "",
    ceremonyId: searchParams.get("ceremony") ?? "",
    date: "",
    time: "",
    location: "",
    notes: "",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof BookingInput, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setSaved(false);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      createBooking(form);
      setSaved(true);
      setError("");
      setForm({
        name: "",
        phone: "",
        email: "",
        ceremonyId: "",
        date: "",
        time: "",
        location: "",
        notes: "",
      });
    } catch (cause) {
      const detail = cause instanceof Error ? ` ${cause.message}` : "";
      setError(`${t("booking.error")}${detail}`);
      setSaved(false);
    }
  }

  return (
    <div
      className={`booking-page${language === "hi" ? " booking-page--hindi" : ""}`}
    >
      <section className="booking-intro">
        <div className="booking-intro__ornament" aria-hidden="true">
          श्री
        </div>
        <Link to="/#services" className="booking-back">
          <ArrowLeft size={16} /> {t("nav.services")}
        </Link>
        <span className="eyebrow eyebrow--light">
          <span />
          {t("booking.eyebrow")}
        </span>
        <h1>{t("booking.title")}</h1>
        <p>{t("booking.copy")}</p>
        <div className="booking-intro__details">
          <span>
            <Clock3 size={16} />{" "}
            {language === "hi"
              ? "आपकी सुविधा के अनुसार"
              : "At a time that works for you"}
          </span>
          <span>
            <MapPin size={16} />{" "}
            {language === "hi" ? "घर पर या ऑनलाइन" : "At home or online"}
          </span>
        </div>
        <div className="booking-intro__mantra">॥ शुभमस्तु ॥</div>
      </section>

      <section className="booking-form-panel">
        {saved && (
          <div className="booking-alert booking-alert--success" role="status">
            <CheckCircle2 size={20} />
            <span>{t("booking.success")}</span>
          </div>
        )}
        {error && (
          <div className="booking-alert booking-alert--error" role="alert">
            {error}
          </div>
        )}

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="booking-form__heading">
            <span className="booking-form__step">
              01 <span>/ 01</span>
            </span>
            <h2>
              {language === "hi"
                ? "अपने अवसर की जानकारी दें"
                : "A little about your occasion"}
            </h2>
            <p>
              {language === "hi"
                ? "तारांकित जानकारी आवश्यक है।"
                : "Fields marked with * are required."}
            </p>
          </div>

          <div className="booking-form__grid">
            <label className="form-field">
              <span>
                {t("booking.name")} <b>*</b>
              </span>
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder={language === "hi" ? "पूरा नाम" : "Your full name"}
              />
            </label>
            <label className="form-field">
              <span>
                {t("booking.phone")} <b>*</b>
              </span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                pattern={"[0-9+\\(\\) \\x2d]{8,18}"}
                title={
                  language === "hi"
                    ? "कृपया सही फ़ोन नंबर लिखें"
                    : "Enter a valid phone number"
                }
                required
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+91 98765 43210"
              />
            </label>
            <label className="form-field">
              <span>{t("booking.email")}</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder={
                  language === "hi" ? "आपका ईमेल (वैकल्पिक)" : "you@example.com"
                }
              />
            </label>
            <label className="form-field">
              <span>
                {t("booking.ceremony")} <b>*</b>
              </span>
              <select
                name="ceremony"
                required
                value={form.ceremonyId}
                onChange={(event) =>
                  updateField("ceremonyId", event.target.value)
                }
              >
                <option value="">
                  {language === "hi" ? "संस्कार चुनें" : "Choose a ceremony"}
                </option>
                {ceremonies.map((ceremony) => (
                  <option value={ceremony.id} key={ceremony.id}>
                    {language === "hi" ? ceremony.nameHi : ceremony.name}
                  </option>
                ))}
                <option value="other">
                  {language === "hi"
                    ? "अन्य / अभी तय नहीं"
                    : "Other / not sure yet"}
                </option>
              </select>
            </label>
            <label className="form-field">
              <span>
                {t("booking.date")} <b>*</b>
              </span>
              <input
                name="date"
                type="date"
                min={localDateValue()}
                required
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
              />
            </label>
            <label className="form-field">
              <span>
                {t("booking.time")} <b>*</b>
              </span>
              <select
                name="time"
                required
                value={form.time}
                onChange={(event) => updateField("time", event.target.value)}
              >
                <option value="">
                  {language === "hi" ? "समय चुनें" : "Choose a time"}
                </option>
                <option value="Morning · 8 AM – 12 PM">
                  {language === "hi"
                    ? "प्रातः · 8 से 12 बजे"
                    : "Morning · 8 AM – 12 PM"}
                </option>
                <option value="Afternoon · 12 PM – 4 PM">
                  {language === "hi"
                    ? "दोपहर · 12 से 4 बजे"
                    : "Afternoon · 12 PM – 4 PM"}
                </option>
                <option value="Evening · 4 PM – 8 PM">
                  {language === "hi"
                    ? "सायं · 4 से 8 बजे"
                    : "Evening · 4 PM – 8 PM"}
                </option>
                <option value="Flexible">
                  {language === "hi" ? "समय में सुविधा है" : "I’m flexible"}
                </option>
              </select>
            </label>
            <label className="form-field form-field--full">
              <span>
                {t("booking.location")} <b>*</b>
              </span>
              <input
                name="location"
                autoComplete="address-level2"
                required
                maxLength={120}
                value={form.location}
                onChange={(event) =>
                  updateField("location", event.target.value)
                }
                placeholder={
                  language === "hi"
                    ? "शहर, क्षेत्र या ऑनलाइन"
                    : "City, neighbourhood, or online"
                }
              />
            </label>
            <label className="form-field form-field--full">
              <span>{t("booking.notes")}</span>
              <textarea
                name="notes"
                rows={3}
                maxLength={1200}
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder={
                  language === "hi"
                    ? "परिवार, परंपरा या तैयारी से जुड़ी कोई बात..."
                    : "Family traditions, preparations, or anything helpful..."
                }
              />
            </label>
          </div>

          <div className="booking-form__submit">
            <Button type="submit" fullWidth>
              {t("booking.submit")} <ArrowRightIcon />
            </Button>
            <p>
              <ShieldCheck size={15} /> {t("booking.privacy")}
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true">→</span>;
}
