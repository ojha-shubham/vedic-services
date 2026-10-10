export type MediaCategory =
  "pravachan" | "audio" | "publication" | "event" | "testimonial";
export type ContentType =
  "video" | "audio" | "publication" | "event" | "testimonial";
export type ContentLanguage = "en" | "hi";

export interface MediaContent {
  id: string;
  title: string;
  titleHi: string;
  type: ContentType;
  category: MediaCategory;
  description: string;
  descriptionHi: string;
  language: ContentLanguage;
  mediaUrl: string;
  thumbnailUrl?: string;
  duration: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  isPublished: boolean;
  featured: boolean;
  createdAt: string;
}

export interface MediaContentInput {
  title: string;
  titleHi: string;
  type: ContentType;
  category: MediaCategory;
  description: string;
  descriptionHi: string;
  language: ContentLanguage;
  mediaUrl: string;
  thumbnailUrl?: string;
  duration: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  isPublished?: boolean;
  featured?: boolean;
}
