# Stellar Design System - Referencia Rápida

Guía de consulta rápida para diseñadores y desarrolladores.

---

## 🎨 Colores

### Principales
| Color | HEX | RGB | Uso |
|-------|-----|-----|-----|
| **Amarillo Stellar** | `#FDDA24` | `rgb(253, 218, 36)` | Fondos hero, acentos, elementos destacados |
| **Violeta Stellar** | `#673AB7` | `rgb(103, 58, 183)` | Botones CTA, enlaces, acciones |
| **Negro Stellar** | `#0F0F0F` | `rgb(15, 15, 15)` | Texto principal, bordes |
| **Blanco** | `#FFFFFF` | `rgb(255, 255, 255)` | Fondos, texto sobre oscuro |

### Secundarios
| Color | HEX | Uso |
|-------|-----|-----|
| Púrpura Claro | `#B7ACE8` | Ilustraciones, fondos sutiles |
| Púrpura Muy Claro | `#BDB1F5` | Ilustraciones |
| Cian | `#00A7B5` | Sintaxis código, acentos |
| Error | `#FF3F00` | Mensajes de error |

### Grises
| Color | HEX | Uso |
|-------|-----|-----|
| Gris Muy Claro | `#F9F9F9` | Fondos sutiles |
| Gris Claro | `#F2F2F2` | Fondos, hover states |
| Gris Medio | `#969696` | Bordes inputs, texto deshabilitado |
| Negro Suave | `#212121` | Alternativa al negro principal |

### Opacidades del Negro
| Opacidad | RGBA | Uso |
|----------|------|-----|
| 70% | `rgba(15, 15, 15, 0.7)` | Texto secundario |
| 44% | `rgba(15, 15, 15, 0.44)` | Texto terciario |
| 30% | `rgba(15, 15, 15, 0.3)` | Elementos sutiles |
| 10% | `rgba(15, 15, 15, 0.1)` | Fondos muy sutiles |

---

## 📝 Tipografía

### Familias
| Tipo | Fuente | Uso |
|------|--------|-----|
| **Títulos** | Lora (serif) | H1, H2 |
| **Cuerpo** | Inter (sans-serif) | Texto, H3, UI |
| **Display** | Schabo | Números grandes, estadísticas |
| **Código** | IBM Plex Mono | Bloques de código |

### Tamaños y Pesos

#### H1 (Lora)
- **Mobile**: 48px (3rem) | Line-height: 1.1
- **Desktop**: 64px (4rem) | Line-height: 1.1
- **Peso**: 400 (Regular)

#### H2 (Lora)
- **Mobile**: 32px (2rem) | Line-height: 1.1
- **Desktop**: 48px (3rem) | Line-height: 1.1
- **Peso**: 400 (Regular)

#### H3 (Inter)
- **Mobile**: 24px (1.5rem) | Line-height: 40px (2.5rem)
- **Desktop**: 32px (2rem) | Line-height: 48px (3rem)
- **Peso**: 400 (Regular)

#### Cuerpo (Inter)
- **Tamaño**: 16px (1rem)
- **Line-height**: 28px (1.75rem)
- **Peso**: 400 (Regular), 600 (Semi-Bold para énfasis)

#### Números Grandes (Schabo)
- **Tamaño**: 48px (3rem)
- **Line-height**: 1

---

## 🔘 Botones

### Variantes

#### Primario (Violeta)
```css
background: #673AB7
color: #FFFFFF
border: 1px solid #673AB7
border-radius: 6px (0.375rem)
padding: 0 16px
min-height: 40px
```

#### Secundario (Negro, Pill)
```css
background: #0F0F0F
color: #FFFFFF
border: 1px solid #0F0F0F
border-radius: 100px (6.25rem)
padding: 6px 22px
```

#### Outline
```css
background: transparent
color: #0F0F0F
border: 1px solid #0F0F0F
border-radius: 6px
```

### Estados
- **Hover**: Cambio de color de fondo
- **Focus**: Outline 2px violeta, offset 2px
- **Disabled**: Opacity 0.7

---

## 📋 Formularios

### Text Input
```css
border: 1px solid #969696
border-radius: 24px (1.5rem)
padding: 10px 24px
font-size: 16px
```
- **Hover/Focus**: border-color → #0F0F0F

### Radio Button
```css
/* Normal */
border: 1px solid #969696
border-radius: 50%
size: 24px × 24px

/* Checked */
background: #FDDA24 (amarillo)
border: 6px solid #0F0F0F
```

### Checkbox
```css
/* Normal */
border: 1px solid #969696
border-radius: 4px
size: 24px × 24px

/* Checked */
background: #0F0F0F
background-image: check amarillo (SVG)
```

### Select
```css
border: 1px solid #969696
border-radius: 24px
padding: 10px 24px
```

---

## 📦 Contenedores

### Tarjeta Estándar
```css
background: #FFFFFF
border: 1px solid #0F0F0F
border-radius: 6px
padding: 40px
```

### Tarjeta Sutil
```css
background: #F9F9F9
border: 1px solid #969696
border-radius: 6px
padding: 40px
```

### Contenedor de Error
```css
border: 2px solid #FF3F00
border-radius: 2px
padding: 12px 24px
color: #FF3F00
```

---

## 📏 Espaciado

| Nombre | Valor | Píxeles |
|--------|-------|---------|
| XS | 0.25rem | 4px |
| SM | 0.5rem | 8px |
| MD | 1rem | 16px |
| LG | 1.5rem | 24px |
| XL | 2.5rem | 40px |

---

## 🔲 Border Radius

| Nombre | Valor | Píxeles | Uso |
|--------|-------|---------|-----|
| Pequeño | 0.25rem | 4px | Checkboxes |
| Medio | 0.375rem | 6px | Botones, tarjetas |
| Grande | 1.5rem | 24px | Inputs |
| Pill | 6.25rem | 100px | Botones secundarios |
| Circular | 50% | - | Radio buttons |

---

## 🎯 Breakpoints

| Dispositivo | Ancho |
|-------------|-------|
| Mobile | 0px - 767px |
| Desktop | 768px+ |

---

## ✨ Efectos y Transiciones

### Transiciones
```css
transition: all 0.2s ease;
```

### Sombras (uso limitado)
```css
/* Solo en elementos de código */
box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
```

**Nota**: El diseño es predominantemente **flat** sin sombras suaves.

---

## 🎨 Componentes Comunes

### Hero Section
```
Fondo: #FDDA24 (amarillo)
Texto: #0F0F0F (negro)
Padding: 40px 16px
Min-height: 60vh
Alineación: Centro
```

### Estadística
```
Número: Schabo, 48px
Label: Inter, 14px, color #0F0F0F con 70% opacidad
Alineación: Centro
```

### Tag/Badge
```
Fondo: #B7ACE8 (púrpura claro)
Texto: #0F0F0F
Padding: 4px 12px
Font-size: 12px
Font-weight: 600
Border-radius: 6px
Text-transform: uppercase
Letter-spacing: 0.05em
```

### Link
```
Color: #673AB7 (violeta)
Text-decoration: none
Font-weight: 600

Hover:
Color: #764EBE
Text-decoration: underline
```

---

## 📱 Responsive

### Estrategia
- **Mobile First**: Diseñar primero para móvil
- **Breakpoint único**: 768px

### Ejemplo
```css
/* Mobile (default) */
h1 { font-size: 3rem; }

/* Desktop */
@media screen and (min-width: 768px) {
  h1 { font-size: 4rem; }
}
```

---

## ♿ Accesibilidad

### Contraste
- Texto principal sobre blanco: **21:1** (AAA)
- Violeta sobre blanco: **4.5:1** (AA)
- Amarillo sobre negro: **14:1** (AAA)

### Focus States
```css
*:focus-visible {
  outline: 2px solid #673AB7;
  outline-offset: 2px;
}
```

### Tamaños Mínimos
- Botones: 40px altura mínima
- Áreas de toque: 44px × 44px (recomendado)

---

## 🎨 Ilustraciones

### Estilo
- **Paleta limitada**: Amarillo, violeta, tonos tierra
- **Texturas**: Grain/ruido para profundidad
- **Formas**: Geométricas simples, orgánicas
- **Composición**: Superposición de capas
- **Estilo**: Flat con elementos de collage

### Colores de Ilustraciones
- Base: #FDDA24 (amarillo)
- Acentos: #673AB7, #B7ACE8, #BDB1F5 (violetas)
- Complementarios: #5E4839 (marrón), #A08C31 (mostaza)

---

## 🚀 Quick Start CSS

```css
/* Variables esenciales */
:root {
  --stellar-yellow: #FDDA24;
  --stellar-purple: #673AB7;
  --stellar-black: #0F0F0F;
  --stellar-white: #FFFFFF;
  --font-heading: 'Lora', serif;
  --font-body: 'Inter', sans-serif;
  --radius-md: 0.375rem;
  --space-md: 1rem;
}

/* Botón básico */
.btn {
  padding: 0 1rem;
  min-height: 2.5rem;
  border-radius: var(--radius-md);
  background: var(--stellar-purple);
  color: var(--stellar-white);
  border: 1px solid var(--stellar-purple);
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.2s ease;
}
```

---

## 📦 Imports Rápidos

### HTML
```html
<!-- Fuentes -->
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@400;600&display=swap" rel="stylesheet">

<!-- CSS -->
<link rel="stylesheet" href="stellar-design-system.css">
```

### React/Next.js
```javascript
import { Lora, Inter } from 'next/font/google'
import '../styles/stellar-design-system.css'
```

### Vue/Nuxt
```javascript
// nuxt.config.ts
css: ['~/assets/css/stellar-design-system.css']
```

---

## 🎯 Checklist de Diseño

- [ ] Usar colores de la paleta oficial
- [ ] Tipografía: Lora para títulos, Inter para cuerpo
- [ ] Border-radius consistente (4px, 6px, 24px, 100px)
- [ ] Espaciado del sistema (4px, 8px, 16px, 24px, 40px)
- [ ] Transiciones de 0.2s ease
- [ ] Sin sombras suaves (diseño flat)
- [ ] Bordes sólidos de 1px
- [ ] Contraste mínimo AA (preferible AAA)
- [ ] Focus states visibles
- [ ] Tamaños de toque mínimos (40px)
- [ ] Responsive (mobile first, breakpoint 768px)

---

## 🔗 Recursos

- **Documentación completa**: `auditoria-diseno-stellar.md`
- **CSS listo para usar**: `stellar-design-system.css`
- **Showcase interactivo**: `stellar-design-showcase.html`
- **Ejemplos de frameworks**: `framework-examples.md`

---

## 📞 Páginas de Referencia

- https://stellar.org/es/casos-de-uso/defi
- https://stellar.org/es/casos-de-uso/tokenizacion

---

**Última actualización**: 11 de febrero de 2026  
**Versión**: 1.0
