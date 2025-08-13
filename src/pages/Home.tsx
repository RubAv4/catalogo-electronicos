// src/pages/Home.tsx
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import type { Producto } from "../types";

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
] as const;

// Puedes usar un Gist/raw con VITE_AVAILABILITY_URL
const AVAILABILITY_URL ="https://gist.githubusercontent.com/RubAv4/57126845a4d0a598e9c203d5a0b388a6/raw/availability.json";

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
        "https://m.media-amazon.com/images/I/619oERereNL._UF350,350_QL80_.jpg",
        "https://http2.mlstatic.com/D_NQ_NP_913922-CBT76235741072_052024-O-modulo-amplificador-de-120w-estereo-tpa3116-20-cproteccion.webp",
      ],
      caracteristicas: [
        "Clase D, estéreo 50W por canal",
        "Alimentación 12–24V DC",
        "Entrada: línea/aux",
        "Protección contra sobrecarga",
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
        "https://p.globalsources.com/IMAGES/PDT/B5957321970/PAM8610-tablero-del-amplificador-de-potencia-digital-2x15w.jpg",
      ],
      caracteristicas: [
        "Formato mini 10w por canal",
        "Baja distorsión",
        "Eficiencia elevada",
        "Entrada por pin header",
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
      ],
      caracteristicas: [
        "Clase D, 2 canales 5w por canal",
        "Alimentación 5V",
        "Protección térmica",
        "PCB compacta",
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
        "https://www.electronica.com.py/wp-content/uploads/MODULO-AMPLIFICADOR-TPA3118-MONO-60W-DC12V-24V-3.jpg",
      ],
      caracteristicas: [
        "Clase D, mono 60w",
        "12–24V DC",
        "Filtro LC recomendado",
        "Terminales de tornillo",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 5,
      nombre: "Preamplificador NE555",
      categoria: "Preamplificador",
      descripcion:
        "Módulo de preamplificación/temporización basado en NE555 para experimentación.",
      img: "https://m.media-amazon.com/images/I/61e7vQDXU2L._UF1000,1000_QL80_.jpg",
      imagenes: [
        "https://down-th.img.susercontent.com/file/sg-11134201-7rdwk-lzvjsm2ye0dw8a",
      ],
      caracteristicas: [
        "Basado en NE555",
        "12v DC hasta 24V DC",
        "Configuración flexible",
        "Entradas por headers",
        "Uso educativo",
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
      disponible: true, // comentario indicaba no disponible, dejo tu valor actual
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
      caracteristicas: [
        "Clase AB",
        "Alimentación simétrica 24V",
        "Baja distorsión",
        "Disipador requerido",
      ],
      contacto: "51978394103",
      disponible: true, // comentario indicaba no disponible, dejo tu valor actual
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
      caracteristicas: [
        "Bluetooth 5.0",
        "Alimentación 5V DC",
        "Salidas L/R",
        "Antena integrada",
      ],
      contacto: "51978394103",
      disponible: true,
    },
    {
      id: 12,
      nombre: "Bluetooth + Radio FM + USB",
      categoria: "Módulos",
      descripcion: "Módulo reproductor con FM/USB/BT.",
      img: "https://http2.mlstatic.com/D_NQ_NP_761155-MCO81009012250_122024-O.webp",
      imagenes: [
        "https://m.media-amazon.com/images/I/51J32mrE1IL._UF350,350_QL80_.jpg",
      ],
      caracteristicas: [
        "BT + FM + USB",
        "8V–12V DC",
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
      disponible: true, // comentario indicaba no disponible, dejo tu valor actual
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
  ];

  // Copiamos a estado para poder aplicar disponibilidad desde JSON
  const [items, setItems] = useState<Producto[]>(productos);

  // (Opcional) si editas la lista en el código, sincroniza el estado
  useEffect(() => {
    setItems(productos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // una vez al montar

  // Lee /availability.json (mapa { id: boolean } o array [{id, disponible}])
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${AVAILABILITY_URL}?_=${Date.now()}`);
        if (!res.ok) return;

        const data = await res.json();
        const map: Record<number, boolean> = {};

        if (Array.isArray(data)) {
          for (const it of data) {
            if (typeof it?.id === "number") map[it.id] = Boolean(it.disponible);
          }
        } else if (data && typeof data === "object") {
          for (const k of Object.keys(data)) {
            const id = Number(k);
            if (!Number.isNaN(id)) map[id] = Boolean((data as any)[k]);
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
      <section className="relative bg-gray-300 rounded-b-2xl overflow-hidden mt-4">
        <img
          src="https://onubaelectronica.es/wp-content/uploads/2020/08/componentes_electronica.jpg"
          alt="banner"
          className="w-full h-96 object-cover"
        />
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md text-center
                     bg-white/95 border-2 border-black rounded-2xl px-4 py-3 shadow-md
                     md:top-1/3 md:left-10 md:translate-x-0 md:w-auto md:max-w-none md:text-left md:px-6 md:py-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Todo para tu día a día
          </h2>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-700">
            Componentes electrónicos seleccionados para tus proyectos.
          </p>
        </div>
      </section>

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
