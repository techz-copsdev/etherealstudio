export type Courier = "jne" | "jnt" | "anteraja";

export interface TrackingEvent {
  date: string;
  status: string;
  location?: string;
}

export interface TrackingResult {
  ok: boolean;
  courier: Courier;
  resi: string;
  status?: string;
  receiver?: string;
  events: TrackingEvent[];
  fallback: boolean;
  message?: string;
}
