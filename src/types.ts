// src/types.ts
export type Categoria =
  | "Amplificadores"
  | "Fuentes"
  | "Conectores"
  | "Módulos"
  | "Cargadores"
  | "Preamplificador"
  | "BMS";

export type Producto = {
  id: number;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  img: string;
  imagenes?: string[];
  caracteristicas: string[];
  contacto?: string;
};
