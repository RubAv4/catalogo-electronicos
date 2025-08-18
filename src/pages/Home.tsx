// src/pages/Home.tsx
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import type { Producto } from "../types";
import HeroCarousel from "../components/HeroCarousel";

const CATEGORIES = [
  "Todos",
  "Amplificadores",
  "Fuentes",
  "Conectores",
  "Módulos",
  "Cargadores",
  "Preamplificador",
  "BMS",
  "Interruptores",
  "PCB",
  "Reguladores",
] as const;

// URL fallback (por si no está definida la env VITE_AVAILABILITY_URL)
const AVAILABILITY_FALLBACK =
  "https://gist.githubusercontent.com/RubAv4/57126845a4d0a598e9c203d5a0b388a6/raw/availability.json";

export default function Home() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Todos");
  const [selected, setSelected] = useState<Producto | null>(null);

  // ===== LISTA DE PRODUCTOS (con disponible true/false) =====
  const productos: Producto[] = [
    {
      id: 1,
      nombre: "Amplificador TPA3116 estéreo",
      categoria: "Amplificadores",
      descripcion:
        "Módulo clase D basado en TPA3116D2 para proyectos de audio estéreo.",
      img: "https://mecatronica.saisac.pe/wp-content/uploads/2023/03/71bKydeTWCL._SL1400_.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/S45603d424ba84c29afc0a32a40abbebbe.jpg",
        "https://ae01.alicdn.com/kf/S73409634cb3d4c27b402673e095b558ak.jpg",
      ],
      caracteristicas: [
        "Voltaje de alimentación: DC12-26V",
        "Corriente de entrada: por encima de 3A",
        "Potencia de salida: 100W máx.",
        "Canal: estéreo de doble canal",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 2,
      nombre: "Amplificador PAM8610 estéreo",
      categoria: "Amplificadores",
      descripcion:
        "Amplificador compacto para proyectos portátiles y parlantes pequeños.",
      img: "https://mecatronica.saisac.pe/wp-content/uploads/2020/06/8610.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/Sc459bcf084f4408b8151210d6f597cc2Y.jpg",
        "https://p.globalsources.com/IMAGES/PDT/B5957321970/PAM8610-tablero-del-amplificador-de-potencia-digital-2x15w.jpg",
      ],
      caracteristicas: [
        "Potencia de salida: 10W + 10W(8ohm); 15W + 15W(4ohm)",
        "Resistencia de salida: 4 - 8 ohmios",
        "Corriente estática: 20 mA (CC 12 V)",
        "Voltaje recomendado: CC 12 V 2 A.",
        "Rango de fuente de alimentación: CC 6 - 15 V",
        "Chip: PAM8610",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 3,
      nombre: "Amplificador PAM8406 con Bluetooth",
      categoria: "Amplificadores",
      descripcion: "Amplificador estéreo clase D, ideal para 5V.",
      img: "https://m.media-amazon.com/images/I/51WaKStjDkL.jpg",
      imagenes: [
        "https://img.joomcdn.net/37ca9858cf623eb9d89f8dc00d59d225709c40bf_original.jpeg",
        "https://ae01.alicdn.com/kf/Sd6caa7ddb42e412686baa7126921cd72Q.jpg",
      ],
      caracteristicas: [
        "Modelo de producto: XY-P5W ",
        "Voltaje de alimentación: batería de litio de 3,7 ~ 4,2 V/MicroUSBDC5 V ",
        "Versión compatible con Bluetooth: 5,0 ",
        "Distancia de transmisión: 15 metros ",
        "Número de canales: doble canal (estéreo) ",
        "Potencia de salida (@1KHz): 3W*2 @5V 4Ω/5W*2 @5V 2Ω ",
        "Altavoz de adaptación: 2 ohmios 5W/4 ohmios 3W/8 ohmios 2W ",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 4,
      nombre: "Amplificador mono TPA3118",
      categoria: "Amplificadores",
      descripcion: "Versión mono del TPA3118 para altavoz único.",
      img: "https://m.media-amazon.com/images/I/617s-4ay-3L._UF894,1000_QL80_.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/S8855a3422ab04e62b27637f53c30a984j.jpg?width=1001&height=1001&hash=2002",
        "https://ae01.alicdn.com/kf/Sc7b1628d88eb4b7092e8a138c9cfb86fw.jpg",
      ],
      caracteristicas: [
        "Voltaje de alimentación: CC 8-24 V",
        "Chip amplificador de potencia: TPA3118",
        "Filtro LC recomendado",
        "Potencia del amplificador: 1*60W",
        "Tamaño del producto: 45 x 35 x 12 mm/1,8 x 1,4 x 0,5 pulgadas",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 5,
      nombre: "Preamplificador de placa de tono NE5532 ",
      categoria: "Preamplificador",
      descripcion:
        "Módulo de preamplificación/temporización basado en NE555 para experimentación.",
      img: "https://m.media-amazon.com/images/I/61e7vQDXU2L._UF1000,1000_QL80_.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/S23757522d09a435b9699d0310d16c910B.jpg?width=1000&height=1000&hash=2000",
        "https://ae01.alicdn.com/kf/Scd4ab910bc564427a5a7b4397011ae19d.jpg",
        "https://ae01.alicdn.com/kf/See4d6843405a4fd6b1412ab429b7190cu.jpg",
      ],
      caracteristicas: [
        "Modelo de producto: XH-A901",
        "Voltaje de entrada: CC 12-24 V ",
        "Número de canales: dos canales",
        "Tamaño del producto: 96*39*16MM",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 6,
      nombre: "Fuente conmutada 12V 25A",
      categoria: "Fuentes",
      descripcion: "SMPS 12V para equipos de audio/LEDs.",
      img: "https://http2.mlstatic.com/D_NQ_NP_751899-MLM85916561174_062025-O.webp",
      caracteristicas: [
        "Salida: 12V DC",
        "Corriente: hasta 25A",
        "Protecciones integradas",
        "Bornes atornillables",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 7,
      nombre: "Fuente conmutada 24V 20A",
      categoria: "Fuentes",
      descripcion: "SMPS 24V para motores y amplificadores.",
      img: "https://mihaba.com/wp-content/uploads/2020/10/YS-24-20-3.jpg",
      caracteristicas: [
        "Salida: 24V DC",
        "Corriente: hasta 20A",
        "Protección cortocircuito",
        "Ventilación forzada",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 8,
      nombre: "Conectores DC 5.5×2.1 mm hembra",
      categoria: "Conectores",
      descripcion: "Conector estándar para fuentes y tiras LED.",
      img: "https://laelectronica.com.gt/image/cache/catalog/Productos/Conexiones/Conectores/jackdc21chasis-1200x1200.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/S753e479d9b7d4682a87cf952c365c305w.jpg",
      ],
      caracteristicas: [
        "Diámetro 5.5×2.1 mm",
        "Soldable",
        "Compatibilidad universal",
        "Carcasa plástica",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 9,
      nombre: "Amplificador 200W TDA7294",
      categoria: "Amplificadores",
      descripcion: "Módulo clase AB basado en TDA7294.",
      img: "https://ae01.alicdn.com/kf/S5fe7646c8acb4ebc8407cb2934d6047ai.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/S13181b71968444c7947122c8c1da06ddk.jpeg",
      ],
      caracteristicas: [
        "Entrada de señal de audio: entrada de señal de audio de doble canal.",
        "Salida de audio: salida de audio de doble canal 100W + 100W.",
        "Principio del circuito: salida de amplificación TDA7294 de 2 vías",
        "Voltaje de funcionamiento: CC 24-40 V",
        "Impedancia de salida: 4-8 ohms",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 10,
      nombre: "Fuente aislada DC-DC 5V 1W",
      categoria: "Fuentes",
      descripcion: "Módulo aislado para señales y sensores.",
      img: "https://naylampmechatronics.com/2172-superlarge_default/fuente-aislada-b0505s-1w-5vdc.jpg",
      imagenes: [
        "https://naylampmechatronics.com/2173-superlarge_default/fuente-aislada-b0505s-1w-5vdc.jpg",
      ],
      caracteristicas: [
        "Salida: 5V / 1W",
        "Aislamiento galvánico",
        "Bajo ruido",
        "DIP/SMT según versión",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 11,
      nombre: "Módulo Bluetooth VH-314",
      categoria: "Módulos",
      descripcion: "Módulo BT para audio inalámbrico.",
      img: "https://ae01.alicdn.com/kf/S215fd30c146c493b9bb263e701a3275bm.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/S1f9569c9df3c469ea58e8faa4bb73b19J.jpg",
        "https://ae01.alicdn.com/kf/Sd4acf77dba7c43a5b206b769662a6ec9S.jpg",
        "https://ae01.alicdn.com/kf/S02f257db7abd460a9f6072e462cf0eed6.jpg",
      ],
      caracteristicas: [
        "Bluetooth 5.0",
        "Alimentación 3,7V-5V DC",
        "Salidas L/R",
        "Antena integrada",
        "LOS: más de 15 m/49 pies",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 12,
      nombre: "Bluetooth + Radio FM + USB",
      categoria: "Módulos",
      descripcion: "Módulo reproductor con FM/USB/BT.",
      img: "https://ae01.alicdn.com/kf/S26772263aefd484aa2ac20982f332bc6w.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/S7e4e1e1cccdd4becb648c30e3058954fV.jpg?width=800&height=800&hash=1600",
        "https://ae01.alicdn.com/kf/S5b461d0574614435b2deb77a8d33ce30B.jpg?width=800&height=800&hash=1600",
        "https://ae01.alicdn.com/kf/S029f898a1110456cb73f10a271c729ad1.jpg?width=800&height=800&hash=1600",
      ],
      caracteristicas: [
        "BT + FM + USB",
        "Voltaje de entrada: 6-24V",
        "Display integrado",
        "Control IR (según kit)",
        "Salidas de audio",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 13,
      nombre: "Amplificador estéreo TPA3118 con bluetooth",
      categoria: "Amplificadores",
      descripcion: "Versión estéreo del TPA3118.",
      img: "https://ae01.alicdn.com/kf/S4622e699e83e403991bc9f61da759283V.jpg_640x640q90.jpg",
      imagenes: [
        "https://m.media-amazon.com/images/I/616tCskn6+L._UF894,1000_QL80_.jpg",
        "https://ae01.alicdn.com/kf/HTB1VWh9LYrpK1RjSZTEq6AWAVXaN/XH-M314-TPA3118-2x45W-12V-24V-Stereo-audio-Bluetooth-Digital-power-Amplifier-Board-amplificador.jpg_.webp",
        "https://ae01.alicdn.com/kf/Hd90022b93521488595b1a6491967c34fW.jpg",
      ],
      caracteristicas: [
        "Clase D, 2 canales",
        "12–24V DC",
        "Alta eficiencia",
        "PCB compacta",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 14,
      nombre: "Cargador 18650 TP4056 Tipo C",
      categoria: "Cargadores",
      descripcion: "Módulo de carga Li-Ion 1 celda con USB-C.",
      img: "https://naylampmechatronics.com/3969-superlarge_default/cargador-de-bateria-litio-tp4056-con-proteccion-usb-c.jpg",
      imagenes: [
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9e28d22c-01e9-40ad-8747-d9dcfa44dba9.__CR0,0,970,600_PT0_SX970_V1___.jpg",
      ],
      caracteristicas: [
        "TP4056 con USB-C",
        "Corriente típica 1A",
        "Protección (según versión con protección)",
        "Pads B+/B-, OUT+/OUT-",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 15,
      nombre: "Amplificador estéreo de 2.1 canales",
      categoria: "Amplificadores",
      descripcion: "Amplificador 2.1 con subwoofer integrado.",
      img: "https://m.media-amazon.com/images/I/516hHka3yWL._UF894,1000_QL80_.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/Sb8d8c78e85c64ccaad1711e6492694090.jpg_960x960.jpg",
        "https://m.media-amazon.com/images/I/81r4Mf7N0GL._SL1500_.jpg",
      ],
      caracteristicas: [
        "Versión compatible con Bluetooth: 5.1",
        "Número de canales: 2.1 (L/R + sub)",
        "Perilla con codificador",
        "Chip: CS8673E",
        "Alimentación: DC12~24 V / 8A+",
        "Altavoz: 20~100 W, 4Ω",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 16,
      nombre: "Conector USB 3,1 tipo C hembra",
      categoria: "Conectores",
      descripcion: "2 pines",
      img: "https://ae01.alicdn.com/kf/S19a4b4bd640345eb9893062544892d36r.jpg_640x640q90.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/S1fb2253df66a4ddea8b8e88e08757272p.jpg",
      ],
      caracteristicas: [
        "Material: Resistente al calor",
        "Con placa de fijación (tornillo no incluido)",
        "Uso: conectores de carga tipo C",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 17,
      nombre: "Módulo BMS 15A 1S",
      categoria: "BMS",
      descripcion: "Módulo para carga de baterías de litio",
      img: "https://epartners.co.nz/cdn/shop/products/Screenshot_24__10__S4QLZTR9R85E.png?v=1674007022&width=1080",
      imagenes: [
        "https://ae01.alicdn.com/kf/Sdb677ac54cc9439dbc422672fed0d4a10.jpg",
      ],
      caracteristicas: [
        "V detección sobrecarga: 4.25 ± 0.05 V",
        "V liberación sobrecarga: 4.23 ± 0.05 V",
        "V detección sobredescarga: 2.45 ± 0.1 V",
        "I continua máx: 12 A",
        "I sobrecorriente: 15 A",
        "V de carga: 4.2 V",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 18,
      nombre: "Módulo BMS 3S 12V 18650 10A",
      categoria: "BMS",
      descripcion: "Módulo para carga de baterías de litio",
      img: "https://funduinoshop.com/media/image/c1/67/6e/10A-BMS-HX-3S-FL-10A-A-Laderegler-fuer-3x-Li-ion-Lithiumbatterie-top_600x600@2x.png",
      imagenes: ["https://m.media-amazon.com/images/I/71VDoW+Cm0L.jpg"],
      caracteristicas: [
        "Temp. trabajo: -40 a +85 °C",
        "Disipación: 10 A",
        "Alimentación: 12.6 V",
        "I continua máx: 12 A",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 19,
      nombre: "Módulo BMS 2S 8.4v 20A Balanceador",
      categoria: "BMS",
      descripcion: "Módulo para carga de baterías de litio",
      img: "https://m.media-amazon.com/images/I/410ORr+aydL._UF1000,1000_QL80_.jpg",
      imagenes: [
        "https://battery101.co.uk/cdn/shop/products/2S_20A_7-4V_8-4V_li-ion_bms_balance_protection_board_wiring_1200x.jpg?v=1673705587",
      ],
      caracteristicas: [
        "I máx operación: 13 A",
        "I limitación: 20 A",
        "Voltaje: 8.4–9 V",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 20,
      nombre: "Módulo BMS 3S 12V 40A Balanceador",
      categoria: "BMS",
      descripcion: "Módulo para carga de baterías de litio",
      img: "https://cdn.webshopapp.com/shops/346407/files/420565714/1500x1500x2/otronic-bms-3s-protection-circuit-with-balancing-f.jpg",
      imagenes: [
        "https://ssdielect.com/16416-medium_default/bms-3s-40a-balanced.jpg",
      ],
      caracteristicas: [
        "Disipación: 40 A",
        "Alimentación: 12.6 V",
        "I continua máx: 20 A",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 21,
      nombre: "Módulo BMS 4S 16.8V 40A Balanceador",
      categoria: "BMS",
      descripcion: "Módulo para carga de baterías de litio",
      img: "https://ae01.alicdn.com/kf/Sdbbc35f4ba5b44bbaf08449f752a8f32o.jpg_960x960.jpg",
      imagenes: ["https://cricklewoodelectronics.com/images/D/BMS4Sa-01.jpg"],
      caracteristicas: [
        "Descarga continua: 40 A",
        "Carga continua: hasta 20 A",
        "V carga: 16.8–18.1 V",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 22,
      nombre: "Módulo BMS 5S 21V 100A Balanceador",
      categoria: "BMS",
      descripcion: "Módulo para carga de baterías de litio",
      img: "https://battery101.co.uk/cdn/shop/products/5s_100a_li_ion_main.jpg?v=1669066120",
      imagenes: [
        "https://battery101.co.uk/cdn/shop/products/5s_100a_li_ion_wiring_diagram_1200x.jpg?v=1669066119",
      ],
      caracteristicas: [
        "Voltaje máx: 21 V",
        "Protección sobrecarga/sobredescarga: 100 A",
        "Balance: 60 mA",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 23,
      nombre: "Interruptor ON/OFF 250V 6A 125V 10A",
      categoria: "Interruptores",
      descripcion: "reemplazo de electrodomésticos",
      img: "https://ae01.alicdn.com/kf/S143011faface49f4b77427dc26335bdcR.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/Sc4f6e424345f428b946cf27768fd9fddY.jpg",
      ],
      caracteristicas: [
        "10 A a 125 VCA, 6 A a 250 VCA",
        "Temp. de trabajo: -25 °C a 85 °C",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 24,
      nombre: "Placa PCB sin perforar un lado",
      categoria: "PCB",
      descripcion: "Circuitos DIY y prototipos",
      img: "https://ae01.alicdn.com/kf/Sb4a98217aa3545f4a9a7738fd75636a74.jpg_640x640q90.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/Sa821077cd9d64e7ba3120f81c6ea3b31e.jpg_640x640q90.jpg",
      ],
      caracteristicas: ["FR4 un solo lado", "5×7CM", "Espesor 1,5 mm"],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 25,
      nombre: "PCB de doble cara placa de pruebas 2x8 3x7 4x6 5x7cm",
      categoria: "PCB",
      descripcion: "Circuitos DIY y prototipos",
      img: "https://ae01.alicdn.com/kf/Se1acdc5846d84ad69fed8846e2fba824R.jpg?width=1000&height=1000&hash=2000",
      imagenes: [
        "https://ae01.alicdn.com/kf/Seb95019bc2c1480196797800f8c635afh.jpg",
      ],
      caracteristicas: [
        "Agujero mínimo: 1.0 mm",
        "Tamaños: 2x8 3x7 4x6 5x7cm",
        "Espesor: 1.6mm",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 26,
      nombre: "Regulador de voltaje LM7805",
      categoria: "Reguladores",
      descripcion: "Regulador de voltaje lineal 5V",
      img: "https://ae01.alicdn.com/kf/S22017d81a6854a7c87bc792196017141V.jpg",
      imagenes: [
        "https://ae01.alicdn.com/kf/Hb78137a042c34a728460b3048574362da.jpg",
        "https://ditecnomakers.com/statics/7805-Voltage-Regulator-Pinout-7c66c645.png",
      ],
      caracteristicas: [
        "Nombre:L7805CV",
        "Entrad de voltaje: 35v máx",
        "Salida de voltaje: 5v 1.5A",
      ],
      contacto: "51978394103",
      disponible: true,
    },
  ];

  // Copiamos a estado para poder aplicar disponibilidad desde JSON
  const [items, setItems] = useState<Producto[]>(productos);

  // (Opcional) sincroniza estado al montar
  useEffect(() => {
    setItems(productos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lee /availability.json (mapa { id: boolean } o array [{id, disponible}])
  useEffect(() => {
    (async () => {
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

        setItems((prev) =>
          prev.map((p) => ({
            ...p,
            disponible: map[p.id] ?? p.disponible ?? true,
          }))
        );
      } catch (err) {
        console.warn("No se pudo leer availability.json:", err);
      }
    })();
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
        {/* Caja blanca superpuesta — centrada arriba, look pro */}
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
