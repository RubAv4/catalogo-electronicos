// src/pages/Home.tsx
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import { CATEGORIAS, type Producto } from "../types";
import HeroCarousel from "../components/HeroCarousel";
import { productos } from "../data/productos";

// "Todos" es solo una opción de filtro de UI, no una categoría real de producto
const CATEGORIES = ["Todos", ...CATEGORIAS] as const;

// URL fallback (por si no está definida la env VITE_AVAILABILITY_URL)
const AVAILABILITY_FALLBACK =
  "https://gist.githubusercontent.com/RubAv4/57126845a4d0a598e9c203d5a0b388a6/raw/availability.json";

export default function Home() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Todos");
  const [selected, setSelected] = useState<Producto | null>(null);

  // Copiamos a estado para poder aplicar disponibilidad desde JSON
  const [items, setItems] = useState<Producto[]>(productos);

  // Lee /availability.json (mapa { id: boolean } o array [{id, disponible}])
  // y lo vuelve a consultar periódicamente para reflejar cambios de stock
  // hechos en el Gist mientras la pestaña sigue abierta.
  useEffect(() => {
    let cancelled = false;

    const syncAvailability = async () => {
      try {
        const url =
          import.meta.env.VITE_AVAILABILITY_URL ?? AVAILABILITY_FALLBACK;
        const res = await fetch(`${url}?t=${Date.now()}`);
        if (!res.ok) return;

        const data: unknown = await res.json();
        const map: Record<number, boolean> = {};

        if (Array.isArray(data)) {
          for (const it of data as Array<{
            id?: unknown;
            disponible?: unknown;
          }>) {
            if (typeof it?.id === "number") map[it.id] = it.disponible === true;
          }
        } else if (data && typeof data === "object") {
          const obj = data as Record<string, unknown>;
          for (const k of Object.keys(obj)) {
            const id = Number(k);
            if (!Number.isNaN(id)) map[id] = obj[k] === true;
          }
        }

        if (cancelled) return;
        setItems((prev) =>
          prev.map((p) => ({
            ...p,
            disponible: map[p.id] ?? p.disponible ?? true,
          }))
        );
      } catch (err) {
        console.warn("No se pudo leer availability.json:", err);
      }
    };

    syncAvailability();
    const REFRESH_MS = 4 * 60 * 1000; // 4 minutos
    const id = setInterval(syncAvailability, REFRESH_MS);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // Filtro
  const filtrados = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((p) => {
      const okCat = cat === "Todos" ? true : p.categoria === cat;
      const text = (p.nombre + " " + p.descripcion).toLowerCase();
      return okCat && text.includes(q);
    });
  }, [items, cat, query]);

  return (
    <main id="productos" className="max-w-screen-xl mx-auto px-6">
      {/* Hero */}
      <HeroCarousel
        images={[
          "https://img.freepik.com/premium-photo/pc-parts-electronic-parts-nice-pattern_606429-1094.jpg",
          "https://images.pexels.com/photos/7286006/pexels-photo-7286006.jpeg?cs=srgb&dl=pexels-karolina-grabowska-7286006.jpg&fm=jpg",
          "https://img.freepik.com/free-photo/female-inventor-working-new-creation_23-2149067250.jpg?semt=ais_hybrid&w=740",
          "https://hackaday.com/wp-content/uploads/2018/09/555-timer-circuit-robot-fe.jpg",
          "https://static.electronicsweekly.com/gadget-master/wp-content/uploads/sites/4/2013/05/Dbugs.jpg",
        ]}
        interval={3000}
      >
        {/* Caja blanca superpuesta — centrada arriba*/}
        <div
          className="
    absolute left-1/2 -translate-x-1/2
    top-3 sm:top-5 md:top-8
    w-11/12 max-w-md md:max-w-lg text-center

    rounded-3xl border-1
    bg-white/85 bg-clip-padding
    shadow-xl shadow-black/20

    supports-[backdrop-filter]:bg-white/55
    supports-[backdrop-filter]:backdrop-blur-lg
    supports-[backdrop-filter]:backdrop-saturate-150

    px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4
  "
        >
          {/* hairline interior sutil */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5"></div>

          {/* brillo arriba + leve sombreado abajo para profundidad */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl
                  bg-gradient-to-b from-white/30 via-white/0 to-black/5"
          ></div>

          <h1 className="font-bold text-gray-900 text-s sm:text-2xl md:text-2xl">
            Conecta, enciende, crea
          </h1>
          <p className="mt-1 sm:mt-2 text-gray-700 text-xs sm:text-sm md:text-lg">
            Componentes seleccionados para tus proyectos DIY.
          </p>
        </div>
      </HeroCarousel>

      {/* Buscador */}
      <div className="flex items-center gap-2 mt-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
        />
        <button
          onClick={() => setQuery("")}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          title="Limpiar"
        >
          🔍
        </button>
      </div>

      {/* Categorías */}
      <div className="flex gap-3 mt-4 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1 rounded-full border transition ${
              cat === c
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {filtrados.map((p) => (
          <ProductCard key={p.id} producto={p} onMore={setSelected} />
        ))}
        {filtrados.length === 0 && (
          <p className="text-sm text-gray-500">No hay resultados.</p>
        )}
      </div>

      {/* Modal */}
      <ProductModal
        key={selected?.id ?? "none"}
        producto={selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}
