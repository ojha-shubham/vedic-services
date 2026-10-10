import { defaultMediaContent } from "../config/content";
import type { MediaContent, MediaContentInput } from "../types/content";

const STORAGE_KEY = "pandit-lavakush-media-library";

function readStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function ensureSeedData() {
  const storage = readStorage();
  if (!storage) {
    return defaultMediaContent;
  }

  const stored = storage.getItem(STORAGE_KEY);
  if (!stored) {
    storage.setItem(STORAGE_KEY, JSON.stringify(defaultMediaContent));
    return defaultMediaContent;
  }

  try {
    const parsed = JSON.parse(stored) as unknown;
    if (!Array.isArray(parsed)) {
      storage.setItem(STORAGE_KEY, JSON.stringify(defaultMediaContent));
      return defaultMediaContent;
    }

    return parsed as MediaContent[];
  } catch {
    storage.setItem(STORAGE_KEY, JSON.stringify(defaultMediaContent));
    return defaultMediaContent;
  }
}

function writeItems(items: MediaContent[]) {
  const storage = readStorage();
  if (!storage) {
    return;
  }

  storage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getMediaContent(): MediaContent[] {
  return [...ensureSeedData()].sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );
}

export function getPublishedMediaContent(): MediaContent[] {
  return getMediaContent().filter((item) => item.isPublished);
}

export function createMediaContent(input: MediaContentInput): MediaContent {
  const item: MediaContent = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    titleHi: input.titleHi.trim(),
    type: input.type,
    category: input.category,
    description: input.description.trim(),
    descriptionHi: input.descriptionHi.trim(),
    language: input.language,
    mediaUrl: input.mediaUrl.trim(),
    thumbnailUrl: input.thumbnailUrl?.trim() || undefined,
    duration: input.duration.trim(),
    eventDate: input.eventDate?.trim() || undefined,
    eventTime: input.eventTime?.trim() || undefined,
    eventLocation: input.eventLocation?.trim() || undefined,
    isPublished: input.isPublished ?? true,
    featured: input.featured ?? false,
    createdAt: new Date().toISOString(),
  };

  const nextItems = [item, ...getMediaContent()];
  writeItems(nextItems);
  return item;
}

export function deleteMediaContent(id: string) {
  const nextItems = getMediaContent().filter((item) => item.id !== id);
  writeItems(nextItems);
}

export function toggleMediaPublish(id: string, isPublished: boolean) {
  const items = getMediaContent();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) {
    return;
  }

  items[index] = { ...items[index], isPublished };
  writeItems(items);
}
