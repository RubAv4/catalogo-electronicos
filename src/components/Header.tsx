type HeaderProps = {
  active: "productos" | "sobre";
  onProductsClick?: () => void;
  onAboutClick?: () => void;
};

export default function Header({ active, onProductsClick, onAboutClick }: HeaderProps) {
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

        {/* Navegación */}
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
      </div>
    </header>
  );
}
