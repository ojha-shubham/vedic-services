export interface Ceremony {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  image?: string;
  imageAlt?: string;
  imageAltHi?: string;
  isOffered: boolean;
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
    image: "/assets/puja-diyas.jpg",
    imageAlt: "A decorated puja kalash surrounded by lit diyas",
    imageAltHi: "जलते दीपों के बीच सजा हुआ पूजा कलश",
    isOffered: true,
    duration: "2–3 hours",
    durationHi: "2–3 घंटे",
  },
  {
    id: "satyanarayan-katha",
    name: "Satyanarayan Katha",
    nameHi: "सत्यनारायण कथा",
    description: "A traditional katha and puja for a family occasion.",
    descriptionHi:
      "पारिवारिक अवसर पर की जाने वाली पारंपरिक कथा एवं पूजा।",
    image: "/assets/puja-diyas.jpg",
    imageAlt: "A traditional puja arrangement with a kalash and diyas",
    imageAltHi: "कलश और दीपों के साथ पारंपरिक पूजा की तैयारी",
    isOffered: true,
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
    image: "/assets/rudrabhishek.jpg",
    imageAlt: "Water being offered over a flower-adorned Shiva lingam",
    imageAltHi: "फूलों से सजे शिवलिंग पर जल अर्पित करते हुए",
    isOffered: true,
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
    isOffered: true,
    duration: "1–2 hours",
    durationHi: "1–2 घंटे",
  },
];
