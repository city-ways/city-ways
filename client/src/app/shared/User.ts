import { Parking } from './parking';

export interface User {
  id: number;
  mail: string;
  name: string;
  dni?: string;
  owns?: Parking[];
  password?: string;
}
