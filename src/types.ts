// src/types.ts
// Única fuente de verdad para las categorías: el filtro de Home.tsx
// deriva de este mismo array, así no se puede desincronizar con el tipo.
export const CATEGORIAS = [
  "Amplificadores",
  "Fuentes",
  "Conectores",
  "Módulos",
  "Cargadores",
  "Preamplificador",
  "BMS",
  "Interruptores",
  "PCB",
  "Reguladores",
  "Circuitos Integrados",
  "Dimmer PWM",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export type Producto = {
  id: number;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  img: string;
  imagenes?: string[];
  caracteristicas: string[];
  contacto?: string;
  /** si no se define, asumimos disponible */
  disponible?: boolean;
};
