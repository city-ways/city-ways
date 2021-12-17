export interface Parking {
  id: number;
  direction: string;
  cords: { longitude: number; latitude: number };
  type: string;
  timesAvailable?: { start: number; end: number }[];
  daysAvailable?: { start: number; end: number }[];
  // todo: refactor cuando este el modelo de usuario
  user: any;
  ranking: number;
  pricePerHour?: number;
  pricePerDay?: number;
}
