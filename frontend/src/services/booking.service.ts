import type { Booking, BookingInput, BookingStatus } from "../types/booking";

const STORAGE_KEY = "pandit-lavakush-bookings";
const bookingStatuses: BookingStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

function isBooking(value: unknown): value is Booking {
  if (typeof value !== "object" || value === null) return false;
  const booking = value as Record<string, unknown>;
  return (
    typeof booking.id === "string" &&
    typeof booking.name === "string" &&
    typeof booking.phone === "string" &&
    typeof booking.email === "string" &&
    typeof booking.ceremonyId === "string" &&
    typeof booking.date === "string" &&
    typeof booking.time === "string" &&
    typeof booking.location === "string" &&
    typeof booking.notes === "string" &&
    typeof booking.createdAt === "string" &&
    bookingStatuses.some((status) => status === booking.status)
  );
}

function readStoredBookings(): Booking[] {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === null) return [];

  const bookings: unknown = JSON.parse(stored);
  if (!Array.isArray(bookings) || !bookings.every(isBooking)) {
    throw new Error("Saved booking data is invalid.");
  }
  return bookings;
}

function writeBookings(bookings: Booking[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function getBookings(): Booking[] {
  return readStoredBookings().sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );
}

export function createBooking(input: BookingInput): Booking {
  const booking: Booking = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  writeBookings([booking, ...readStoredBookings()]);
  return booking;
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  const bookings = readStoredBookings();
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index < 0) throw new Error("Booking could not be found.");
  bookings[index] = { ...bookings[index], status };
  writeBookings(bookings);
}
