import type { Producto } from "../types";

type Props = {
  producto: Producto;
  onMore: (p: Producto) => void;
};

export default function ProductCard({ producto, onMore }: Props) {
  const { nombre, descripcion, img, contacto = "51978394103" } = producto;
  const disponible = producto.disponible ?? true;

  return (
    <article
      className="relative bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-md transition"
      onClick={() => onMore(producto)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onMore(producto)}
      aria-label={`Ver detalles de ${nombre}`}
    >
      {/* Badge y velo si NO disponible */}
      {!disponible && (
        <>
          <span className="absolute top-3 left-3 z-10 rounded-full bg-red-600 text-white text-xs px-2 py-1 shadow">
            No disponible
          </span>
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] pointer-events-none" />
        </>
      )}

      {/* Imagen */}
      <div className="bg-gray-100">
        <img src={img} alt={nombre} className="h-56 w-full object-cover" />
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-gray-900">{nombre}</h3>
        <p className="mt-1 text-[13px] leading-5 text-gray-600 line-clamp-3">
          {descripcion}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <a
            href={`https://wa.me/${contacto}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full bg-black text-white px-5 py-2 text-sm font-medium hover:bg-gray-800
              ${
                !disponible
                  ? "pointer-events-none opacity-50 cursor-not-allowed"
                  : ""
              }`}
            onClick={(e) => e.stopPropagation()}
            aria-disabled={!disponible}
            title={
              disponible ? "Contactar por WhatsApp" : "Producto no disponible"
            }
          >
            Contactar por WhatsApp
          </a>
          <button
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              onMore(producto);
            }}
            aria-label={`Más información sobre ${nombre}`}
          >
            Más información
          </button>
        </div>
      </div>
    </article>
  );
}
