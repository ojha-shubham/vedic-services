export interface Ceremony {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  duration: string;
  durationHi: string;
}

export const ceremonies: Ceremony[] = [
  {
    id: "griha-pravesh",
    name: "Griha Pravesh",
    nameHi: "गृह प्रवेश",
    description: "Welcome prosperity and positive energy into your new home.",
    descriptionHi:
      "अपने नए घर में सुख-समृद्धि और सकारात्मक ऊर्जा का स्वागत करें।",
    icon: "⌂",
    duration: "2–3 hours",
    durationHi: "2–3 घंटे",
  },
  {
    id: "satyanarayan-katha",
    name: "Satyanarayan Katha",
    nameHi: "सत्यनारायण कथा",
    description:
      "A devotional katha and puja for gratitude, harmony, and blessings.",
    descriptionHi:
      "कृतज्ञता, सुख-शांति और मंगलकामना के लिए भक्तिपूर्ण कथा एवं पूजा।",
    icon: "ॐ",
    duration: "2–3 hours",
    durationHi: "2–3 घंटे",
  },
  {
    id: "rudrabhishek",
    name: "Rudrabhishek",
    nameHi: "रुद्राभिषेक",
    description:
      "A traditional Shiva puja performed with Vedic mantras and offerings.",
    descriptionHi: "वैदिक मंत्रों और अर्पण के साथ भगवान शिव की पारंपरिक पूजा।",
    icon: "त्रि",
    duration: "1–2 hours",
    durationHi: "1–2 घंटे",
  },
  {
    id: "mundan",
    name: "Mundan Sanskar",
    nameHi: "मुंडन संस्कार",
    description:
      "A joyful Vedic milestone, thoughtfully guided for your family.",
    descriptionHi:
      "परिवार के लिए विधिपूर्वक संपन्न होने वाला एक मंगल वैदिक संस्कार।",
    icon: "✺",
    duration: "1–2 hours",
    durationHi: "1–2 घंटे",
  },
];
