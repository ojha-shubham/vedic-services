import type { DailyPanchangResult, FestivalDay } from "panchang-ts";

export const ayodhyaLocation = {
  latitude: 26.7922,
  longitude: 82.1998,
} as const;

export const panchangTimezone = "Asia/Kolkata";

export function getLocalDateString(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: panchangTimezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );
  return `${values.year}-${values.month}-${values.day}`;
}

export async function getPanchangForDate(
  localDate: string,
  language: "en" | "hi",
): Promise<DailyPanchangResult | null> {
  const date = new Date(`${localDate}T12:00:00+05:30`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const { getDailyPanchang } = await import("panchang-ts");
  return getDailyPanchang(date, ayodhyaLocation, {
    timezone: panchangTimezone,
    language,
    region: "uttar-pradesh",
    masaSystem: "purnimanta",
  });
}

export async function getFestivalsForYear(
  year: number,
  language: "en" | "hi",
): Promise<FestivalDay[]> {
  const { computeFestivalsForYear } = await import("panchang-ts");
  return computeFestivalsForYear(year, ayodhyaLocation, {
    timezone: panchangTimezone,
    language,
    region: "uttar-pradesh",
  });
}

export function formatPanchangTime(
  localDateTime: string,
  language: "en" | "hi",
): string {
  const date = new Date(localDateTime);
  return new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-IN", {
    timeZone: panchangTimezone,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatPanchangDate(
  localDateTime: Date,
  language: "en" | "hi",
): string {
  return new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : "en-IN", {
    timeZone: panchangTimezone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(localDateTime);
}

export function getFestivalLocalDate(date: Date): string {
  return getLocalDateString(date);
}
