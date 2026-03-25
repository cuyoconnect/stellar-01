# Vibecoding en Web3 — Presentación interactiva

App web tipo presentación: **Vite + React + TypeScript + Tailwind CSS + Framer Motion + Shiki**.

## Estética (alineada a stellar.org)

Inspirada en [stellar.org/es/soroban](https://stellar.org/es/soroban): fondo claro, alto contraste, acentos amarillo Stellar (`#fdda24`), teal (`#00a7b5`) y lavanda (`#b7ace8`), texto `#0f0f0f`. Tipografías: **Lora** (títulos), **Inter** (cuerpo), **IBM Plex Mono** (código). Bloques de código con fondo `#262626` como en la web.

Las capturas de referencia se tomaron con el MCP de Playwright sobre la página en vivo; los tokens (fuentes y colores) se extrajeron con `browser_evaluate` leyendo estilos computados y variables CSS (`--hue-1` … `--syntax-bg`, etc.).

## Desarrollo

```bash
npm install
npm run dev
```

Abrí la URL que muestra Vite (normalmente `http://localhost:5173`). Ideal en **pantalla completa** (botón en la esquina superior derecha o F11).

## Controles

- **Flechas** izquierda / derecha: slide anterior / siguiente
- **Espacio**: siguiente · **Shift + Espacio**: anterior
- **Home** / **End**: primera / última slide
- **Swipe** en táctil: izquierda = siguiente, derecha = anterior

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

Raíz del proyecto: `presentation/`. Framework preset: **Vite**. Comando build: `npm run build`, output: `dist/`.

## Contenido

Las diapositivas viven en `src/slides/registry.tsx` y el orden en `src/slides/index.ts`.
