// src/components/HeroCarousel.tsx
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  interval?: number; // ms (autoplay)
  className?: string;
  children?: React.ReactNode; // contenido superpuesto (tu caja blanca)
  aspect?: `${number}/${number}`; // proporción fija del banner (ej: "16/9", "21/9", "3/1")
  fit?: "contain" | "cover"; // cómo encajar la imagen
  objectPosition?: string; // ej: "center", "center top"
};

export default function HeroCarousel({
  images,
  interval = 3000,
  className = "",
  children,
  aspect = "16 /9",
  fit = "cover",
  objectPosition = "center",
}: Props) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // autoplay (cada 4s por defecto)
  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval, paused, idx]);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  const imgClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-neutral-100 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Contenedor con proporción fija */}
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide ${i + 1}`}
            className={`absolute inset-0 w-full h-full ${imgClass} transition-opacity duration-500 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
            style={{ objectPosition }}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === idx ? "bg-white" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Flechas */}
      {images.length > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={prev}
            className="hidden md:grid place-items-center absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60"
          >
            ‹
          </button>
          <button
            aria-label="Siguiente"
            onClick={next}
            className="hidden md:grid place-items-center absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white hover:bg-black/60"
          >
            ›
          </button>
        </>
      )}

      {/* Contenido superpuesto (tu caja blanca) */}
      {children}
    </section>
  );
}
