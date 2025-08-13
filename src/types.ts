// src/types.ts
export type Categoria =
  | "Amplificadores"
  | "Fuentes"
  | "Conectores"
  | "Módulos"
  | "Cargadores"
  | "Preamplificador"
  | "BMS"
  | "Interruptores"
  | "PCB";

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

