import { useEffect, useState } from "react";
import type { Producto } from "../types"; 

export default function ProductModal({
  producto,
  onClose,
}: {
  producto: Producto | null;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // bloquear scroll del body mientras el modal está abierto
    if (producto) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [producto]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!producto) return null;

  const allImages = [producto.img, ...(producto.imagenes ?? [])];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">{producto.nombre}</h3>
          <button
            onClick={onClose}
            className="rounded-full w-9 h-9 grid place-items-center hover:bg-gray-100 text-gray-600"
            aria-label="Cerrar"
            title="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-4 p-5">
          {/* Galería */}
          <div>
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={allImages[idx]}
                alt={`Imagen ${idx + 1} de ${producto.nombre}`}
                className="w-full h-64 object-cover"
              />
            </div>
            {allImages.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`rounded-lg overflow-hidden ring-2 ${
                      idx === i ? "ring-black" : "ring-transparent"
                    }`}
                    title={`Imagen ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${producto.nombre} ${i + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-sm text-gray-700">{producto.descripcion}</p>

            <h4 className="mt-4 font-semibold">Características</h4>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700 space-y-1">
              {producto.caracteristicas.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${producto.contacto ?? "51978394103"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-black text-white px-5 py-2 text-sm font-medium hover:bg-gray-800"
              >
                Contactar por WhatsApp
              </a>
              <button
                onClick={onClose}
                className="rounded-full border px-5 py-2 text-sm hover:bg-gray-50"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 text-xs text-gray-500">
          * Las especificaciones pueden variar según el lote/modelo.
        </div>
      </div>
    </div>
  );
}
