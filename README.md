# Electronica DIY — Catálogo de componentes electrónicos

Catálogo web de componentes electrónicos (amplificadores, fuentes, módulos, BMS, reguladores, etc.) pensado para vender por WhatsApp. Es un sitio de una sola página: no maneja carrito ni pagos, cada producto tiene un botón que abre una conversación de WhatsApp con el vendedor.

Desplegado en Vercel: https://catalogo-electronicos.vercel.app

## Cómo funciona

- Los productos están definidos a mano en el código (no hay backend ni base de datos).
- La **disponibilidad** de cada producto ("disponible" / "no disponible") se controla desde afuera, sin tocar el código: la app lee un JSON público (un [Gist](https://gist.github.com/) de GitHub) al cargar y luego lo vuelve a consultar cada 4 minutos mientras la pestaña sigue abierta.
- Para marcar un producto como agotado, solo hay que editar ese Gist — no hace falta un nuevo despliegue.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) como bundler/dev server
- [Tailwind CSS](https://tailwindcss.com/) para estilos
- [react-icons](https://react-icons.github.io/react-icons/) para íconos de redes sociales
- Desplegado en [Vercel](https://vercel.com/)

## Estructura del proyecto

```
src/
├── data/
│   └── productos.ts     # Catálogo de productos (fuente única de datos)
├── components/
│   ├── Header.tsx        # Barra superior con navegación y link de WhatsApp
│   ├── HeroCarousel.tsx   # Carrusel de imágenes del banner principal
│   ├── ProductCard.tsx    # Tarjeta de producto en la grilla
│   ├── ProductModal.tsx   # Modal con detalle, galería y contacto
│   ├── AboutSection.tsx   # Sección "Sobre mí" / contacto / redes
│   ├── ScrollTopButton.tsx
│   └── icons.tsx
├── pages/
│   └── Home.tsx           # Buscador, filtro por categoría y grilla de productos
├── config.ts              # Constantes globales (número de WhatsApp)
├── types.ts                # Tipos (Producto, Categoria) y lista de categorías
└── App.tsx                 # Layout general (Header + Home + AboutSection)
```

## Requisitos

- Node.js 18 o superior
- npm

## Puesta en marcha

```bash
npm install
npm run dev
```

Esto levanta el servidor de desarrollo de Vite (con hot reload) en `http://localhost:5173`.

### Otros comandos

```bash
npm run build    # Compila TypeScript y genera el build de producción en dist/
npm run preview  # Sirve el build de producción localmente para probarlo
npm run lint     # Corre ESLint sobre todo el proyecto
```

## Variables de entorno

| Variable                  | Descripción                                                                 | Requerida |
| -------------------------- | ---------------------------------------------------------------------------- | --------- |
| `VITE_AVAILABILITY_URL`     | URL del JSON (Gist) que indica qué productos están disponibles.              | No        |

Si no se define, la app usa como respaldo el Gist configurado en `src/pages/Home.tsx` (`AVAILABILITY_FALLBACK`).

### Formato del JSON de disponibilidad

Acepta dos formatos, un mapa `{ id: boolean }`:

```json
{
  "19": false,
  "20": false,
  "23": true
}
```

o un array de objetos:

```json
[
  { "id": 19, "disponible": false },
  { "id": 20, "disponible": false }
]
```

El `id` corresponde al campo `id` de cada producto en `src/data/productos.ts`. Cualquier producto que no aparezca en el JSON se asume `disponible: true`.

## Tareas comunes

**Agregar o editar un producto** → `src/data/productos.ts`. Cada producto necesita `id` (único), `nombre`, `categoria` (debe ser una de las definidas en `src/types.ts`), `descripcion`, `img`, `caracteristicas` y opcionalmente `imagenes` (galería) y `contacto` (si un producto puntual usa otro número de WhatsApp).

**Agregar una categoría nueva** → agregarla al array `CATEGORIAS` en `src/types.ts`. El filtro de categorías en `Home.tsx` y el tipo `Categoria` se actualizan solos a partir de ese array.

**Cambiar el número de WhatsApp** → `src/config.ts` (`WHATSAPP_NUMBER`). Se usa en todos los botones de contacto del sitio.

## Despliegue

El proyecto está pensado para desplegarse en Vercel de forma automática a partir del repositorio (build command `npm run build`, output `dist/`). Si se usa una URL de disponibilidad propia, hay que configurar `VITE_AVAILABILITY_URL` como variable de entorno en el proyecto de Vercel.
