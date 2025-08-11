import { useState } from "react";

type HeaderProps = {
  active?: "productos" | "sobre";
  onProductsClick?: () => void;
  onAboutClick?: () => void;
};

export default function Header({ active, onProductsClick, onAboutClick }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const pill = (isActive: boolean) =>
    isActive
      ? "rounded-full bg-white text-neutral-900 px-4 py-1.5 text-sm font-semibold"
      : "rounded-full bg-white/10 hover:bg-white/20 px-4 py-1.5 text-sm";

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 text-white">
      <div className="mx-auto max-w-[80rem] px-4 h-16 flex items-center justify-between">
        {/* Marca */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-lg">⚙️</div>
          <span className="font-semibold tracking-wide">Ruberth Avalos</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <button type="button" onClick={onProductsClick} className={pill(active === "productos")}>
            Productos
          </button>
          <button type="button" onClick={onAboutClick} className={pill(active === "sobre")}>
            Sobre mi
          </button>
          <a
            href="https://wa.me/51978394103"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-500 hover:bg-green-600 px-4 py-2 text-sm font-medium"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden rounded-full w-10 h-10 grid place-items-center hover:bg-white/10"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* ícono hamburguesa */}
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 border-t border-white/10">
          <button
            type="button"
            className={`w-full text-left mt-3 rounded-full px-4 py-2 ${active === "productos" ? "bg-white text-neutral-900 font-semibold" : "bg-white/10 hover:bg-white/20"}`}
            onClick={() => {
              onProductsClick?.();
              setOpen(false);
            }}
          >
            Productos
          </button>
          <button
            type="button"
            className={`w-full text-left mt-2 rounded-full px-4 py-2 ${active === "sobre" ? "bg-white text-neutral-900 font-semibold" : "bg-white/10 hover:bg-white/20"}`}
            onClick={() => {
              onAboutClick?.();
              setOpen(false);
            }}
          >
            Sobre mi
          </button>
          <a
            href="https://wa.me/51978394103"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-2 rounded-full bg-green-500 hover:bg-green-600 px-4 py-2 font-medium"
            onClick={() => setOpen(false)}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
