import { User } from './User';

export interface Parking {
  id: number;
  direction: string;
  cords: { longitude: number; latitude: number };
  type: string;
  status: boolean;
  timesAvailable?: { start: number; end: number }[];
  daysAvailable?: { start: number; end: number }[];
  // todo: refactor cuando este el modelo de usuario
  pricePerHour?: number;
  pricePerDay?: number;
  owner: User;
}
