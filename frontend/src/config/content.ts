import type { MediaContent } from "../types/content";

export const mediaCategories = [
  { id: "all", label: "All media", labelHi: "सभी सामग्री" },
  { id: "pravachan", label: "Pravachan", labelHi: "प्रवचन" },
  { id: "audio", label: "Audio", labelHi: "ऑडियो" },
  { id: "publication", label: "Publications", labelHi: "प्रकाशन" },
  { id: "event", label: "Events", labelHi: "कार्यक्रम" },
  { id: "testimonial", label: "Family reviews", labelHi: "परिवारों के अनुभव" },
] as const;

export const defaultMediaContent: MediaContent[] = [];
