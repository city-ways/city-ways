import { Parking } from './parking';

export interface History {
  id: number;
  price?: string;
  date: string;
  parking: Parking;
}
