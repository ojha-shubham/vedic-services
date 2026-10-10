import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookText,
  CheckCircle2,
  ImageIcon,
  Plus,
  Search,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import { mediaCategories } from "../../config/content";
import { useLanguage } from "../../contexts/useLanguage";
import {
  createMediaContent,
  deleteMediaContent,
  getMediaContent,
  toggleMediaPublish,
} from "../../services/content.service";
import type {
  MediaCategory,
  MediaContent,
  MediaContentInput,
} from "../../types/content";
import "./MediaLibrary.css";

const emptyForm: MediaContentInput = {
  title: "",
  titleHi: "",
  type: "video",
  category: "pravachan",
  description: "",
  descriptionHi: "",
  language: "hi",
  mediaUrl: "",
  thumbnailUrl: "",
  duration: "",
  isPublished: true,
  featured: false,
};

const getCategoryLabel = (category: MediaCategory, language: "en" | "hi") => {
  const match = mediaCategories.find((item) => item.id === category);
  return match ? (language === "hi" ? match.labelHi : match.label) : category;
};

export function MediaLibrary() {
  const { language } = useLanguage();
  const [items, setItems] = useState<MediaContent[]>(() => getMediaContent());
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | MediaCategory>(
    "all",
  );
  const [form, setForm] = useState<MediaContentInput>(emptyForm);
  const [statusMessage, setStatusMessage] = useState("");

  const visibleItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesText =
        !normalized ||
        `${item.title} ${item.titleHi} ${item.description} ${item.descriptionHi}`
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesText;
    });
  }, [items, query, categoryFilter]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.titleHi.trim() ||
      (!["event", "testimonial"].includes(form.category) &&
        !form.mediaUrl.trim()) ||
      (form.category === "event" && !form.eventDate?.trim()) ||
      (form.category === "testimonial" &&
        !form.description.trim() &&
        !form.descriptionHi.trim())
    ) {
      setStatusMessage(
        language === "hi"
          ? "शीर्षक आवश्यक है। कार्यक्रम के लिए तारीख और अनुभव के लिए विवरण भी भरें।"
          : "Title is required. Add a date for events and review text for testimonials.",
      );
      return;
    }

    const created = createMediaContent(form);
    setItems((previous) => [created, ...previous]);
    setForm(emptyForm);
    setStatusMessage(
      language === "hi"
        ? "सामग्री सफलतापूर्वक सहेजी गई।"
        : "Content saved successfully.",
    );
  }

  function handleDelete(id: string) {
    deleteMediaContent(id);
    setItems((previous) => previous.filter((item) => item.id !== id));
  }

  function handleTogglePublish(id: string, currentStatus: boolean) {
    toggleMediaPublish(id, !currentStatus);
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, isPublished: !currentStatus } : item,
      ),
    );
  }

  const publishedCount = items.filter((item) => item.isPublished).length;

  return (
    <section className="media-library">
      <div className="admin-heading">
        <div>
          <span className="eyebrow">
            <span />
            {language === "hi" ? "मीडिया प्रबंधन" : "MEDIA MANAGEMENT"}
          </span>
          <h1>
            {language === "hi"
              ? "प्रवचन, ऑडियो और प्रकाशन"
              : "Pravachan, audio, and publications"}
          </h1>
          <p>
            {language === "hi"
              ? "Admin केवल इस डिवाइस पर सामग्री प्रबंधित करता है।"
              : "Admin manages media content locally in this browser."}
          </p>
        </div>
        <Link to="/booking" className="button button--primary">
          {language === "hi" ? "नई बुकिंग" : "New enquiry"}{" "}
          <ArrowUpRight size={17} />
        </Link>
      </div>

      <div className="admin-metrics">
        <article className="admin-metric">
          <span className="admin-metric__icon admin-metric__icon--saffron">
            <Video size={19} />
          </span>
          <div>
            <span>{language === "hi" ? "कुल सामग्री" : "Total items"}</span>
            <strong>{items.length}</strong>
          </div>
          <small>{language === "hi" ? "सभी पोस्ट" : "all entries"}</small>
        </article>
        <article className="admin-metric">
          <span className="admin-metric__icon admin-metric__icon--gold">
            <CheckCircle2 size={19} />
          </span>
          <div>
            <span>{language === "hi" ? "प्रकाशित" : "Published"}</span>
            <strong>{publishedCount}</strong>
          </div>
          <small>
            {language === "hi" ? "सामग्री दिखाई दे रही है" : "live content"}
          </small>
        </article>
        <article className="admin-metric">
          <span className="admin-metric__icon admin-metric__icon--green">
            <BookText size={19} />
          </span>
          <div>
            <span>{language === "hi" ? "श्रृंखला" : "Categories"}</span>
            <strong>{mediaCategories.length - 1}</strong>
          </div>
          <small>{language === "hi" ? "मुख्य श्रेणियाँ" : "core groups"}</small>
        </article>
      </div>

      <section className="media-library__grid">
        <form className="media-form" onSubmit={handleSubmit}>
          <div className="media-form__header">
            <span className="eyebrow">
              <span />
              {language === "hi" ? "नई सामग्री" : "NEW CONTENT"}
            </span>
            <h2>{language === "hi" ? "सामग्री जोड़ें" : "Add media"}</h2>
          </div>

          <div className="field-grid">
            <label>
              <span>
                {language === "hi" ? "शीर्षक (अंग्रेज़ी)" : "Title (English)"}
              </span>
              <input
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
              />
            </label>
            <label>
              <span>
                {language === "hi" ? "शीर्षक (हिन्दी)" : "Title (Hindi)"}
              </span>
              <input
                value={form.titleHi}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    titleHi: event.target.value,
                  }))
                }
              />
            </label>
            <label>
              <span>{language === "hi" ? "श्रेणी" : "Category"}</span>
              <select
                value={form.category}
                onChange={(event) =>
                  setForm((current) => {
                    const category = event.target.value as MediaCategory;
                    return {
                      ...current,
                      category,
                      type:
                        category === "event"
                          ? "event"
                          : category === "testimonial"
                            ? "testimonial"
                            : current.type,
                    };
                  })
                }
              >
                {mediaCategories
                  .filter((item) => item.id !== "all")
                  .map((item) => (
                    <option key={item.id} value={item.id}>
                      {language === "hi" ? item.labelHi : item.label}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              <span>{language === "hi" ? "प्रकार" : "Type"}</span>
              <select
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    type: event.target.value as MediaContent["type"],
                  }))
                }
              >
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="publication">Publication</option>
                <option value="event">Event</option>
              </select>
            </label>
            <label>
              <span>{language === "hi" ? "भाषा" : "Language"}</span>
              <select
                value={form.language}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    language: event.target.value as "en" | "hi",
                  }))
                }
              >
                <option value="hi">Hindi</option>
                <option value="en">English</option>
              </select>
            </label>
            <label>
              <span>{language === "hi" ? "अवधि" : "Duration"}</span>
              <input
                value={form.duration}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    duration: event.target.value,
                  }))
                }
              />
            </label>
            {form.category === "event" && (
              <>
                <label>
                  <span>
                    {language === "hi" ? "कार्यक्रम की तारीख" : "Event date"}
                  </span>
                  <input
                    type="date"
                    value={form.eventDate ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        eventDate: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>
                    {language === "hi" ? "कार्यक्रम का समय" : "Event time"}
                  </span>
                  <input
                    type="time"
                    value={form.eventTime ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        eventTime: event.target.value,
                      }))
                    }
                  />
                </label>
                <label className="field-grid__full">
                  <span>
                    {language === "hi"
                      ? "कार्यक्रम का स्थान"
                      : "Event location"}
                  </span>
                  <input
                    value={form.eventLocation ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        eventLocation: event.target.value,
                      }))
                    }
                  />
                </label>
              </>
            )}
            {!["event", "testimonial"].includes(form.category) && (
              <label className="field-grid__full">
                <span>{language === "hi" ? "मीडिया URL" : "Media URL"}</span>
                <input
                  required
                  value={form.mediaUrl}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      mediaUrl: event.target.value,
                    }))
                  }
                />
              </label>
            )}
            <label className="field-grid__full">
              <span>
                {language === "hi"
                  ? "थंबनेल URL (वैकल्पिक)"
                  : "Thumbnail URL (optional)"}
              </span>
              <input
                value={form.thumbnailUrl ?? ""}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    thumbnailUrl: event.target.value,
                  }))
                }
              />
            </label>
            <label className="field-grid__full">
              <span>
                {language === "hi"
                  ? "विवरण (अंग्रेज़ी)"
                  : "Description (English)"}
              </span>
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                rows={3}
              />
            </label>
            <label className="field-grid__full">
              <span>
                {language === "hi" ? "विवरण (हिन्दी)" : "Description (Hindi)"}
              </span>
              <textarea
                value={form.descriptionHi}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    descriptionHi: event.target.value,
                  }))
                }
                rows={3}
              />
            </label>
          </div>

          <div className="media-form__checks">
            <label>
              <input
                type="checkbox"
                checked={form.isPublished ?? true}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    isPublished: event.target.checked,
                  }))
                }
              />
              {language === "hi" ? "प्रकाशित करें" : "Publish immediately"}
            </label>
            <label>
              <input
                type="checkbox"
                checked={form.featured ?? false}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    featured: event.target.checked,
                  }))
                }
              />
              {language === "hi" ? "फीचर्ड" : "Featured"}
            </label>
          </div>

          <button type="submit" className="button button--primary">
            <Plus size={16} />{" "}
            {language === "hi" ? "सामग्री जोड़ें" : "Add content"}
          </button>

          {statusMessage && (
            <p className="media-form__status">{statusMessage}</p>
          )}
        </form>

        <div className="media-list-panel">
          <div className="media-list-panel__toolbar">
            <label className="booking-search">
              <Search size={17} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  language === "hi" ? "सामग्री खोजें" : "Search media"
                }
              />
            </label>
            <label className="booking-filter">
              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(event.target.value as "all" | MediaCategory)
                }
              >
                {mediaCategories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {language === "hi" ? item.labelHi : item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="media-list">
            {visibleItems.length > 0 ? (
              visibleItems.map((item) => (
                <article className="media-card" key={item.id}>
                  <div
                    className="media-card__image"
                    style={{
                      backgroundImage: `url(${item.thumbnailUrl || "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80"})`,
                    }}
                  />
                  <div className="media-card__body">
                    <div className="media-card__topline">
                      <span>{getCategoryLabel(item.category, language)}</span>
                      <span
                        className={`badge ${item.isPublished ? "badge--published" : "badge--draft"}`}
                      >
                        {item.isPublished
                          ? language === "hi"
                            ? "प्रकाशित"
                            : "Published"
                          : language === "hi"
                            ? "ड्राफ्ट"
                            : "Draft"}
                      </span>
                    </div>
                    <h3>{language === "hi" ? item.titleHi : item.title}</h3>
                    <p>
                      {language === "hi"
                        ? item.descriptionHi
                        : item.description}
                    </p>
                    <div className="media-card__meta">
                      <span>{item.type}</span>
                      <span>{item.duration}</span>
                    </div>
                    <div className="media-card__actions">
                      <button
                        type="button"
                        className="button button--secondary"
                        onClick={() =>
                          handleTogglePublish(item.id, item.isPublished)
                        }
                      >
                        {item.isPublished
                          ? language === "hi"
                            ? "अस्पष्ट करें"
                            : "Unpublish"
                          : language === "hi"
                            ? "प्रकाशित करें"
                            : "Publish"}
                      </button>
                      <button
                        type="button"
                        className="button button--outline"
                        onClick={() => handleDelete(item.id)}
                      >
                        {language === "hi" ? "हटाएँ" : "Delete"}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="booking-empty">
                <span className="booking-empty__icon">
                  <ImageIcon size={23} />
                </span>
                <p>
                  {language === "hi"
                    ? "कोई सामग्री नहीं मिली।"
                    : "No media found yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
