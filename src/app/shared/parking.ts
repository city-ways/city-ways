export interface Parking {
  id: number;
  direccion: string;
  ocupado: boolean;
  periodosDisponible: [{ inicio: number; fin: number }];
  precioPorHr?: number;
  largaEstancia: boolean;
  precioPorDia?: number;
  nombre: string;
  ranking: number;
}
