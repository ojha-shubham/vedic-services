export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  ceremonyId: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  status: BookingStatus;
  createdAt: string;
}

export type BookingInput = Omit<Booking, "id" | "status" | "createdAt">;
