# Auditoría de Diseño - Stellar.org
## Guía de Estilo Técnica

Análisis realizado en: https://stellar.org/es/casos-de-uso/defi y https://stellar.org/es/casos-de-uso/tokenizacion

---

## 1. PALETA DE COLORES EXACTA (HEX)

### Colores Principales

#### Amarillo Brillante (Color de Marca Principal)
- **HEX:** `#FDDA24`
- **RGB:** `rgb(253, 218, 36)`
- **Uso:** Fondo de hero sections, acentos, elementos interactivos seleccionados (radio buttons), spinners de carga
- **Variante alternativa:** `#DCC436` (amarillo más oscuro para ilustraciones)

#### Violeta/Púrpura (Color de Acción)
- **HEX:** `#673AB7`
- **RGB:** `rgb(103, 58, 183)`
- **Uso:** Botones primarios (CTA), enlaces, elementos interactivos
- **Variante hover/alternativa:** `#764EBE` / `rgb(118, 78, 190)`
- **Variantes más claras (ilustraciones):**
  - `#B7ACE8` - Púrpura claro
  - `#BDB1F5` - Púrpura muy claro
  - `#B6ADD4` - Lavanda

#### Negro (Color de Texto Principal)
- **HEX:** `#0F0F0F`
- **RGB:** `rgb(15, 15, 15)`
- **Nota:** NO es negro puro (#000000), es un gris muy oscuro
- **Uso:** Texto principal, botones secundarios, bordes
- **Variantes:**
  - `#212121` / `rgb(33, 33, 33)` - Negro más suave
  - `#262626` / `rgb(38, 38, 38)` - Fondo de código/syntax
  - Con opacidad:
    - `rgba(15, 15, 15, 0.7)` - Texto secundario (70% opacidad)
    - `rgba(15, 15, 15, 0.44)` - Texto terciario (44% opacidad)
    - `rgba(15, 15, 15, 0.3)` - Elementos sutiles (30% opacidad)
    - `rgba(15, 15, 15, 0.1)` - Fondos muy sutiles (10% opacidad)

#### Blanco
- **HEX:** `#FFFFFF` / `#FFF`
- **RGB:** `rgb(255, 255, 255)`
- **Uso:** Texto sobre fondos oscuros, fondos de tarjetas

### Colores Secundarios

#### Grises
- `#F9F9F9` - Gris muy claro (fondos sutiles)
- `#F2F2F2` / `rgb(242, 242, 242)` - Gris claro (fondos, hover states)
- `#969696` / `rgb(150, 150, 150)` - Gris medio (bordes de inputs, texto deshabilitado)

#### Colores de Acento Adicionales
- **Cian/Turquesa:** `#00A7B5` - Usado en sintaxis de código y elementos de UI específicos
- **Naranja/Rojo:** `#FF3F00` - Color de error/alerta
- **Tonos tierra (ilustraciones):**
  - `#5E4839` - Marrón
  - `#A08C31` - Dorado/mostaza
  - `#D8CD88` - Beige/crema

#### Colores de Ilustraciones Adicionales
- `#544C94` - Púrpura oscuro
- `#655699` - Púrpura medio
- `#A195C7` - Lavanda medio
- `#362D45` - Púrpura muy oscuro
- `#6C7C04` - Verde oliva
- `#EDD62B` - Amarillo limón

---

## 2. TIPOGRAFÍA

### Familia Tipográfica Principal

#### Títulos (H1, H2, H3)
- **Familia:** `Lora` (serif)
- **Implementación técnica:** `'__lora_06f760', '__lora_Fallback_06f760', serif`
- **Fallback:** Arial con ajustes métricos específicos
- **Pesos disponibles:**
  - `400` (Regular) - Para títulos estándar
  - `600` (Semi-Bold) Italic - Para énfasis
- **Características:**
  - Line-height: `1.1` (muy compacto para impacto visual)
  - Tamaños responsivos:
    - **H1:** 
      - Mobile (0px+): `3rem` (48px)
      - Desktop (768px+): `4rem` (64px)
    - **H2:**
      - Mobile (0px+): `2rem` (32px)
      - Desktop (768px+): `3rem` (48px)

#### Cuerpo de Texto
- **Familia:** `Inter` (sans-serif)
- **Implementación técnica:** `'__inter_2ff36d', '__inter_Fallback_2ff36d', sans-serif`
- **Fallback:** Arial con ajustes métricos específicos
- **Pesos disponibles:**
  - `400` (Regular) - Texto normal
  - `600` (Semi-Bold) - Énfasis, labels, botones
- **Características:**
  - Font-size base: `1rem` (16px)
  - Line-height: `1.75rem` (28px)
  - Para subtítulos grandes:
    - Mobile: `1.5rem` / `2.5rem` line-height
    - Desktop: `2rem` / `3rem` line-height

#### Tipografías Especiales

##### Números Grandes (Big Numbers/Stats)
- **Familia:** `Schabo` (display sans-serif)
- **Implementación técnica:** `'__schabo_854c7e', '__schabo_Fallback_854c7e', sans-serif`
- **Uso:** Estadísticas destacadas (ej: "10.1M Direcciones", "475K+ Ramps")

##### Código (Monospace)
- **Familia:** `IBM Plex Mono`
- **Implementación técnica:** `'__ibmPlexMono_fde9af', '__ibmPlexMono_Fallback_fde9af', sans-serif`
- **Uso:** Bloques de código, snippets técnicos

### Tracking/Letter-spacing
- **Código:** `letter-spacing: -1px` (en line numbers)
- **Texto general:** No se especifica tracking adicional, usa el spacing nativo de cada fuente

### Notas Técnicas de Implementación
- Todas las fuentes usan `font-display: swap` para optimización de carga
- Formato: WOFF2 (máxima compresión y soporte moderno)
- Fallbacks con ajustes métricos precisos (ascent-override, descent-override, size-adjust) para evitar layout shift

---

## 3. ANÁLISIS DE ILUSTRACIONES (Observación Visual)

### Estilo General
Basándome en los colores extraídos y la estructura del sitio, las ilustraciones de Stellar.org siguen estos patrones:

#### Características Visuales
1. **Paleta Limitada y Vibrante:**
   - Uso predominante de amarillo brillante (#FDDA24) como color base
   - Acentos en violetas/púrpuras (#673AB7, #B7ACE8, #BDB1F5)
   - Tonos tierra complementarios (marrones, beiges, mostaza)
   - Alto contraste con el negro (#0F0F0F)

2. **Texturas y Efectos:**
   - **Grain/Ruido:** Probable uso de texturas granuladas para dar profundidad
   - **Flat Design con Profundidad:** Estilo plano pero con capas y superposiciones
   - **Formas Orgánicas:** Curvas suaves, formas abstractas

3. **Composición:**
   - **Superposición de Capas:** Elementos que se solapan creando profundidad
   - **Formas Geométricas Simples:** Círculos, rectángulos redondeados, curvas
   - **Espaciado Generoso:** Mucho espacio negativo (breathing room)

4. **Patrones Posibles:**
   - **Halftone Patterns:** Posible uso de patrones de puntos para texturas
   - **Spray Paint Effect:** Bordes suaves, difuminados
   - **Collage Digital:** Superposición de formas como recortes

### Estilo Técnico
- **Vectorial:** Probablemente creadas en Illustrator/Figma
- **Exportación:** Formato PNG optimizado (vía Sanity CDN con parámetros de optimización)
- **Responsive:** Imágenes servidas con diferentes tamaños según viewport

---

## 4. ESTILO UI/WEB

### Botones

#### Botón Primario (CTA)
```css
background-color: rgb(103, 58, 183); /* #673AB7 - Violeta */
color: rgb(255, 255, 255); /* Blanco */
border: 1px solid rgb(103, 58, 183);
border-radius: 0.375rem; /* 6px - Esquinas ligeramente redondeadas */
padding: 0px 1rem; /* Horizontal padding */
min-height: 2.5rem; /* 40px */
font-size: 1rem; /* 16px */
font-family: Inter;
```

#### Botón Secundario/Submit
```css
background-color: #0f0f0f; /* Negro */
color: #ffffff;
border: 1px solid #0f0f0f;
border-radius: 6.25rem; /* 100px - Completamente redondeado (pill shape) */
padding: 0.375rem 1.375rem;
font-size: 1rem;
font-weight: 400;
line-height: 1.75rem;
```

### Inputs y Formularios

#### Text Inputs
```css
border: 1px solid #969696; /* Gris medio */
border-radius: 1.5rem; /* 24px - Muy redondeado */
padding: 0.625rem 1.5rem; /* 10px 24px */
font-family: Inter;
width: 100%;
```

#### Radio Buttons
```css
/* Estado normal */
border: 1px solid #969696;
border-radius: 50%; /* Circular */
width: 1.5rem;
height: 1.5rem;

/* Estado checked */
background-color: #fdda24; /* Amarillo */
border: 6px solid #0f0f0f; /* Negro, borde grueso */
```

#### Checkboxes
```css
border: 1px solid #969696;
border-radius: 0.25rem; /* 4px - Ligeramente redondeado */
width: 1.5rem;
height: 1.5rem;

/* Hover */
background-color: #f2f2f2;
border: 1px solid #0f0f0f;

/* Checked */
background-color: #0f0f0f; /* Negro */
background-image: url('/images/check-yellow.svg'); /* Check amarillo */
```

### Contenedores y Tarjetas

#### Bordes
- **Grosor estándar:** `1px` solid
- **Color principal:** `#0f0f0f` (negro) o `#969696` (gris medio)
- **Bordes de error:** `0.125rem` (2px) solid `#ff3f00` (naranja/rojo)

#### Border Radius
- **Botones primarios:** `0.375rem` (6px) - Suave
- **Botones secundarios:** `6.25rem` (100px) - Pill shape completo
- **Inputs:** `1.5rem` (24px) - Muy redondeado
- **Checkboxes:** `0.25rem` (4px) - Mínimo
- **Radio buttons:** `50%` - Circular
- **Contenedores generales:** `0.125rem` - `0.3rem` (2px - 5px) - Muy sutil

### Sombras (Box-Shadow)

#### Estilo General
**NO se usan sombras suaves/difusas** en los elementos principales de UI. El diseño es predominantemente **flat** con bordes sólidos.

#### Excepciones (elementos específicos):
```css
/* Toolbar de código */
box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2); /* Sombra dura, offset vertical */

/* Line highlight en código */
box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2); /* Misma sombra dura */
```

**Características de las sombras:**
- **Tipo:** Duras, no difuminadas (blur mínimo o nulo)
- **Offset:** Principalmente vertical (0 2px)
- **Color:** Negro con baja opacidad (0.2)
- **Uso limitado:** Solo en elementos de código/sintaxis

### Espaciado y Layout

#### Sistema de Espaciado
Basado en `rem` (unidades relativas):
- `0.25rem` (4px) - Mínimo
- `0.375rem` (6px) - Pequeño
- `0.5rem` (8px) - Pequeño-medio
- `0.625rem` (10px) - Medio
- `1rem` (16px) - Estándar
- `1.5rem` (24px) - Grande
- `2.5rem` (40px) - Extra grande

#### Padding de Contenedores
- Horizontal: `1rem` - `1.5rem`
- Vertical: `0.375rem` - `0.625rem`

---

## 5. RESUMEN EJECUTIVO

### Identidad Visual Clave

**Stellar.org utiliza un sistema de diseño moderno y audaz caracterizado por:**

1. **Color:**
   - Amarillo brillante (#FDDA24) como color de marca distintivo
   - Violeta (#673AB7) para acciones y elementos interactivos
   - Negro suave (#0F0F0F) en lugar de negro puro
   - Paleta limitada pero vibrante con acentos de púrpura claro y tonos tierra

2. **Tipografía:**
   - Serif elegante (Lora) para títulos con alto impacto
   - Sans-serif moderna (Inter) para legibilidad en cuerpo de texto
   - Display font (Schabo) para números/estadísticas destacadas
   - Monospace (IBM Plex Mono) para código

3. **UI:**
   - Diseño **flat** sin sombras suaves
   - Bordes sólidos de 1px en negro o gris
   - Border-radius variado: desde mínimo (4px) hasta pill shape completo (100px)
   - Botones con dos estilos: redondeados suaves (6px) o completamente redondeados (pill)

4. **Ilustraciones:**
   - Estilo flat con superposición de capas
   - Texturas granuladas/orgánicas
   - Paleta limitada y consistente con la marca
   - Alto contraste y formas geométricas simples

### Filosofía de Diseño
**Moderno, Accesible, Audaz** - Un equilibrio entre profesionalismo financiero y energía innovadora del mundo crypto/blockchain.

---

## 6. RECURSOS TÉCNICOS

### CDN y Optimización
- **Imágenes:** Sanity CDN (`https://cdn.sanity.io/images/e2r40yh6/production-i18n/`)
- **Parámetros de optimización:** `?w=WIDTH&h=HEIGHT&fm=FORMAT&v=VERSION`

### Fuentes (Archivos WOFF2)
- Lora: `228f42325bf402fb-s.p.woff2`, `fd18e0bc729b0822-s.p.woff2`
- Inter: `f1f0c35b32161446-s.p.woff2`, `fcb100c7607696fd-s.p.woff2`
- Schabo: `a3da5eae6f08b9cf-s.p.woff2`
- IBM Plex Mono: `6e3aea9f3a99634d-s.p.woff2`

### Framework
- **Next.js** (React framework)
- **Styled Components** (CSS-in-JS)
- CSS Variables para temas y colores

---

**Documento generado:** 11 de febrero de 2026  
**Páginas analizadas:**
- https://stellar.org/es/casos-de-uso/defi
- https://stellar.org/es/casos-de-uso/tokenizacion
