import { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutSection from "./components/AboutSection";
import ScrollTopButton from "./components/ScrollTopButton";

export default function App() {
  const [active, setActive] = useState<"productos" | "sobre">("productos");

  // scroll suave a cada sección
  const goProductos = () =>
    document
      .getElementById("productos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  const goSobre = () =>
    document
      .getElementById("sobre-mi")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  // detectar cuál sección está en pantalla (con offset por header de 64px)
  useEffect(() => {
    const onScroll = () => {
      const headerH = 64;
      const sobreTop =
        (document.getElementById("sobre-mi")?.offsetTop ?? 999999) - headerH;
      const y = window.scrollY;
      setActive(y >= sobreTop ? "sobre" : "productos");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header
        active={active}
        onProductsClick={goProductos}
        onAboutClick={goSobre}
      />
      <div className="pt-16">
        <Home />
        <AboutSection /> {/* siempre existe */}
      </div>
      <ScrollTopButton />
    </>
  );
}
