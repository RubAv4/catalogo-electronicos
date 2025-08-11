import { useEffect, useState } from "react";

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={goTop}
      aria-label="Volver arriba"
      className={`fixed left-5 bottom-5 z-50 rounded-full bg-black text-white w-11 h-11 grid place-items-center shadow-lg hover:bg-gray-800 transition
        ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      title="Volver arriba"
    >
      ↑
    </button>
  );
}
