import { useState } from "react";
import { WhatsIcon } from "./icons"; // <-- ajusta el path si es necesario

// Icono “grid” para Productos
const GridIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
  </svg>
);

// Icono usuario para Sobre mí
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M4.5 19.2a7.5 7.5 0 0 1 15 0"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

type HeaderProps = {
  active?: "productos" | "sobre";
  onProductsClick?: () => void;
  onAboutClick?: () => void;
};

export default function Header({
  active,
  onProductsClick,
  onAboutClick,
}: HeaderProps) {
  const [open, setOpen] = useState(false);

  const pill = (isActive: boolean) =>
    isActive
      ? "rounded-full bg-white text-neutral-900 px-4 py-1.5 text-sm font-semibold"
      : "rounded-full bg-white/10 hover:bg-white/20 px-4 py-1.5 text-sm";

  // estilos base para cada item del menú móvil (ícono fijo = misma alineación)
  const itemBase =
    "w-full mt-2 flex items-center gap-3 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-white/30";
  const iconWrap =
    "shrink-0 grid place-items-center w-9 h-9 rounded-lg bg-white/10";
  const itemActive = "bg-white text-neutral-900 font-semibold";
  const itemIdle = "bg-white/10 hover:bg-white/20";

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 text-white">
      <div className="mx-auto max-w-[80rem] px-4 h-16 flex items-center justify-between">
        {/* Marca */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/10 grid place-items-center text-lg">
            ⚙️
          </div>
          <span className="font-semibold tracking-wide">Electronica DIY</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={onProductsClick}
            className={pill(active === "productos")}
          >
            Productos
          </button>
          <button
            type="button"
            onClick={onAboutClick}
            className={pill(active === "sobre")}
          >
            Sobre mí
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
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* hamburguesa / cerrar */}
          {open ? (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown con iconos alineados */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-3 pb-4 border-t border-white/10">
          {/* Productos */}
          <button
            type="button"
            className={`${itemBase} ${
              active === "productos" ? itemActive : itemIdle
            }`}
            onClick={() => {
              onProductsClick?.();
              setOpen(false);
            }}
          >
            <span className={iconWrap}>
              <GridIcon className="w-5 h-5" />
            </span>
            <span className="flex-1 text-left">Productos</span>
          </button>

          {/* Sobre mi */}
          <button
            type="button"
            className={`${itemBase} ${
              active === "sobre" ? itemActive : itemIdle
            }`}
            onClick={() => {
              onAboutClick?.();
              setOpen(false);
            }}
          >
            <span className={iconWrap}>
              <UserIcon className="w-5 h-5" />
            </span>
            <span className="flex-1 text-left">Sobre mí</span>
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/51978394103"
            target="_blank"
            rel="noopener noreferrer"
            className={`${itemBase} bg-green-600 hover:bg-green-600/90`}
            onClick={() => setOpen(false)}
          >
            <span className="shrink-0 grid place-items-center w-9 h-9 rounded-lg bg-white/15">
              <WhatsIcon className="w-5 h-5" />
            </span>
            <span className="flex-1 text-left">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
