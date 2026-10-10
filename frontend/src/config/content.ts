import type { MediaContent } from "../types/content";

export const mediaCategories = [
  { id: "all", label: "All media", labelHi: "सभी medya" },
  { id: "pravachan", label: "Pravachan", labelHi: "प्रवचन" },
  { id: "audio", label: "Audio", labelHi: "ऑडियो" },
  { id: "publication", label: "Publications", labelHi: "प्रकाशन" },
  { id: "event", label: "Events", labelHi: "कार्यक्रम" },
  { id: "testimonial", label: "Family reviews", labelHi: "परिवारों के अनुभव" },
] as const;

export const defaultMediaContent: MediaContent[] = [
  {
    id: "bhagavad-gita-pravachan",
    title: "Bhagavad Gita Pravachan",
    titleHi: "भगवद् गीता प्रवचन",
    type: "video",
    category: "pravachan",
    description:
      "A practical understanding of the Gita for living with balance, clarity, and devotion.",
    descriptionHi:
      "संतुलन, स्पष्टता और भक्ति के साथ जीवन जीने के लिए गीता का व्यावहारिक समझ।",
    language: "hi",
    mediaUrl: "https://www.youtube.com/embed/7yl7clhA6S8",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542736667-069246bdbc6d?auto=format&fit=crop&w=900&q=80",
    duration: "24 min",
    isPublished: true,
    featured: true,
    createdAt: "2025-01-10T10:00:00.000Z",
  },
  {
    id: "shiv-rudra-audio",
    title: "Shiv Rudra Audio Discourse",
    titleHi: "शिव रुद्र ऑडियो प्रवचन",
    type: "audio",
    category: "audio",
    description:
      "A soothing audio discourse on Lord Shiva, devotion, and mindful spiritual living.",
    descriptionHi:
      "भगवान शिव, भक्ति और शांतिपूर्ण आध्यात्मिक जीवन पर एक मनमोहक ऑडियो प्रवचन।",
    language: "hi",
    mediaUrl: "https://example.com/audio/shiv-rudra.mp3",
    duration: "18 min",
    isPublished: true,
    featured: false,
    createdAt: "2025-02-11T11:30:00.000Z",
  },
  {
    id: "hindu-dharma-publication",
    title: "Hindu Dharma (English)",
    titleHi: "हिन्दू धर्म (अंग्रेज़ी)",
    type: "publication",
    category: "publication",
    description:
      "A concise guide on cultural values, ritual meaning, and daily spiritual practice.",
    descriptionHi:
      "संस्कृति, पूजा का अर्थ और दैनिक साधना के बारे में एक संक्षिप्त मार्गदर्शिका।",
    language: "en",
    mediaUrl:
      "https://rushipeetham.com/shop/books-and-publications/hindu-dharma-english/",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
    duration: "Booklet",
    isPublished: true,
    featured: true,
    createdAt: "2025-03-03T08:45:00.000Z",
  },
  {
    id: "navgraha-remedy-video",
    title: "Navagraha Remedies & Guidance",
    titleHi: "नवग्रह समाधान एवं मार्गदर्शन",
    type: "video",
    category: "pravachan",
    description:
      "A devotional explanation of planetary remedies and practical spiritual steps.",
    descriptionHi:
      "ग्रहों के उपाय और दैनिक आध्यात्मिक कदमों पर एक भक्तिपूर्ण व्याख्यान।",
    language: "hi",
    mediaUrl: "https://www.youtube.com/embed/wX2B9WfFBJ4",
    duration: "31 min",
    isPublished: false,
    featured: false,
    createdAt: "2025-05-14T15:00:00.000Z",
  },
];
