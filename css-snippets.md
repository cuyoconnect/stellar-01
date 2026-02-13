# Stellar Design System - CSS Snippets

Fragmentos de código CSS listos para copiar y pegar.

---

## 🎨 Variables CSS Completas

```css
:root {
  /* ========== COLORES ========== */
  
  /* Principales */
  --stellar-yellow: #FDDA24;
  --stellar-yellow-dark: #DCC436;
  --stellar-purple: #673AB7;
  --stellar-purple-hover: #764EBE;
  --stellar-purple-light: #B7ACE8;
  --stellar-purple-lighter: #BDB1F5;
  --stellar-purple-lavender: #B6ADD4;
  --stellar-black: #0F0F0F;
  --stellar-black-soft: #212121;
  --stellar-black-bg: #262626;
  --stellar-white: #FFFFFF;
  
  /* Grises */
  --stellar-gray-lightest: #F9F9F9;
  --stellar-gray-light: #F2F2F2;
  --stellar-gray-medium: #969696;
  
  /* Acentos */
  --stellar-cyan: #00A7B5;
  --stellar-error: #FF3F00;
  
  /* Opacidades */
  --stellar-black-70: rgba(15, 15, 15, 0.7);
  --stellar-black-44: rgba(15, 15, 15, 0.44);
  --stellar-black-30: rgba(15, 15, 15, 0.3);
  --stellar-black-10: rgba(15, 15, 15, 0.1);
  
  /* ========== TIPOGRAFÍA ========== */
  --font-heading: 'Lora', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-display: 'Schabo', 'Arial Black', sans-serif;
  --font-mono: 'IBM Plex Mono', 'Courier New', monospace;
  
  /* ========== ESPACIADO ========== */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  
  /* ========== BORDER RADIUS ========== */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 1.5rem;
  --radius-pill: 6.25rem;
  --radius-circle: 50%;
  
  /* ========== EFECTOS ========== */
  --shadow-hard: 0 2px 0 0 rgba(0, 0, 0, 0.2);
  --transition-smooth: all 0.2s ease;
}
```

---

## 🔘 Botones

### Botón Primario (Violeta)
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0 1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 400;
  color: var(--stellar-white);
  background-color: var(--stellar-purple);
  border: 1px solid var(--stellar-purple);
  border-radius: var(--radius-md);
  cursor: pointer;
  user-select: none;
  transition: var(--transition-smooth);
  text-decoration: none;
}

.btn-primary:hover {
  background-color: var(--stellar-purple-hover);
  border-color: var(--stellar-purple-hover);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--stellar-purple);
  outline-offset: 2px;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
```

### Botón Secundario (Negro, Pill)
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 1.375rem;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: var(--stellar-white);
  background-color: var(--stellar-black);
  border: 1px solid var(--stellar-black);
  border-radius: var(--radius-pill);
  cursor: pointer;
  user-select: none;
  transition: var(--transition-smooth);
  text-decoration: none;
}

.btn-secondary:hover {
  background-color: var(--stellar-black-soft);
}
```

### Botón Outline
```css
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0 1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 400;
  color: var(--stellar-black);
  background-color: transparent;
  border: 1px solid var(--stellar-black);
  border-radius: var(--radius-md);
  cursor: pointer;
  user-select: none;
  transition: var(--transition-smooth);
  text-decoration: none;
}

.btn-outline:hover {
  background-color: var(--stellar-black);
  color: var(--stellar-white);
}
```

---

## 📋 Inputs

### Text Input
```css
.input-text {
  width: 100%;
  padding: 0.625rem 1.5rem;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--stellar-black);
  background-color: var(--stellar-white);
  border: 1px solid var(--stellar-gray-medium);
  border-radius: var(--radius-lg);
  transition: border-color 0.2s ease;
}

.input-text:hover {
  border-color: var(--stellar-black);
}

.input-text:focus {
  outline: none;
  border-color: var(--stellar-black);
}

.input-text::placeholder {
  color: var(--stellar-gray-medium);
}
```

### Textarea
```css
.textarea {
  width: 100%;
  min-height: 120px;
  padding: 0.625rem 1.5rem;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--stellar-black);
  background-color: var(--stellar-white);
  border: 1px solid var(--stellar-gray-medium);
  border-radius: var(--radius-lg);
  resize: vertical;
  transition: border-color 0.2s ease;
}

.textarea:hover {
  border-color: var(--stellar-black);
}

.textarea:focus {
  outline: none;
  border-color: var(--stellar-black);
}
```

### Select
```css
.select {
  width: 100%;
  padding: 0.625rem 1.5rem;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--stellar-black);
  background-color: var(--stellar-white);
  border: 1px solid var(--stellar-gray-medium);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.select:hover {
  border-color: var(--stellar-black);
}

.select:focus {
  outline: none;
  border-color: var(--stellar-black);
}
```

### Radio Button Personalizado
```css
.radio-custom {
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--stellar-gray-medium);
  border-radius: var(--radius-circle);
  cursor: pointer;
  position: relative;
  transition: var(--transition-smooth);
}

.radio-custom:hover {
  border-color: var(--stellar-black);
}

.radio-custom:checked {
  background-color: var(--stellar-yellow);
  border: 6px solid var(--stellar-black);
}

.radio-custom:focus-visible {
  outline: 2px solid var(--stellar-purple);
  outline-offset: 2px;
}
```

### Checkbox Personalizado
```css
.checkbox-custom {
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  min-width: 1.5rem;
  border: 1px solid var(--stellar-gray-medium);
  border-radius: var(--radius-sm);
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  transition: var(--transition-smooth);
}

.checkbox-custom:hover {
  background-color: var(--stellar-gray-light);
  border-color: var(--stellar-black);
}

.checkbox-custom:checked {
  background-color: var(--stellar-black);
  border-color: var(--stellar-black);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23FDDA24' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
}

.checkbox-custom:focus-visible {
  outline: 2px solid var(--stellar-purple);
  outline-offset: 2px;
}
```

---

## 📦 Tarjetas

### Tarjeta Estándar
```css
.card {
  background-color: var(--stellar-white);
  border: 1px solid var(--stellar-black);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
}
```

### Tarjeta Sutil
```css
.card-subtle {
  background-color: var(--stellar-gray-lightest);
  border: 1px solid var(--stellar-gray-medium);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
}
```

### Contenedor de Error
```css
.error-container {
  border: 0.125rem solid var(--stellar-error);
  border-radius: 0.125rem;
  padding: 0.75rem 1.5rem;
  line-height: 2rem;
  color: var(--stellar-error);
  background-color: rgba(255, 63, 0, 0.05);
}
```

---

## 📝 Tipografía

### H1
```css
h1, .h1 {
  font-family: var(--font-heading);
  font-size: 3rem;
  line-height: 1.1;
  font-weight: 400;
  color: var(--stellar-black);
}

@media screen and (min-width: 768px) {
  h1, .h1 {
    font-size: 4rem;
  }
}
```

### H2
```css
h2, .h2 {
  font-family: var(--font-heading);
  font-size: 2rem;
  line-height: 1.1;
  font-weight: 400;
  color: var(--stellar-black);
}

@media screen and (min-width: 768px) {
  h2, .h2 {
    font-size: 3rem;
  }
}
```

### H3
```css
h3, .h3 {
  font-family: var(--font-body);
  font-size: 1.5rem;
  line-height: 2.5rem;
  font-weight: 400;
  color: var(--stellar-black);
}

@media screen and (min-width: 768px) {
  h3, .h3 {
    font-size: 2rem;
    line-height: 3rem;
  }
}
```

### Cuerpo de Texto
```css
body, p {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.75rem;
  font-weight: 400;
  color: var(--stellar-black);
}
```

### Número Grande (Estadística)
```css
.big-number {
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 1;
  color: var(--stellar-black);
}
```

### Código
```css
code, pre {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  background-color: var(--stellar-black-bg);
  color: var(--stellar-purple-light);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
}

pre {
  padding: 1rem;
  overflow-x: auto;
}
```

---

## 🎯 Componentes Especiales

### Hero Section
```css
.hero {
  background-color: var(--stellar-yellow);
  color: var(--stellar-black);
  padding: var(--space-xl) var(--space-md);
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero h1 {
  margin-bottom: var(--space-lg);
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}
```

### Tarjeta de Estadística
```css
.stat-card {
  text-align: center;
  padding: var(--space-lg);
}

.stat-number {
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 1;
  color: var(--stellar-black);
  margin-bottom: var(--space-sm);
}

.stat-label {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--stellar-black-70);
  line-height: 1.5;
}
```

### Tag/Badge
```css
.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: var(--stellar-purple-light);
  color: var(--stellar-black);
  border-radius: var(--radius-md);
}
```

### Link Primario
```css
.link-primary {
  color: var(--stellar-purple);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition-smooth);
}

.link-primary:hover {
  color: var(--stellar-purple-hover);
  text-decoration: underline;
}

.link-primary:focus-visible {
  outline: 2px solid var(--stellar-purple);
  outline-offset: 2px;
}
```

---

## 🎨 Utilidades de Color

### Fondos
```css
.bg-yellow { background-color: var(--stellar-yellow); }
.bg-purple { background-color: var(--stellar-purple); }
.bg-black { background-color: var(--stellar-black); }
.bg-white { background-color: var(--stellar-white); }
.bg-gray-light { background-color: var(--stellar-gray-light); }
.bg-gray-lightest { background-color: var(--stellar-gray-lightest); }
```

### Colores de Texto
```css
.text-yellow { color: var(--stellar-yellow); }
.text-purple { color: var(--stellar-purple); }
.text-black { color: var(--stellar-black); }
.text-white { color: var(--stellar-white); }
.text-secondary { color: var(--stellar-black-70); }
.text-tertiary { color: var(--stellar-black-44); }
.text-error { color: var(--stellar-error); }
```

### Bordes
```css
.border-black { border: 1px solid var(--stellar-black); }
.border-gray { border: 1px solid var(--stellar-gray-medium); }
.border-purple { border: 1px solid var(--stellar-purple); }
```

---

## 📏 Utilidades de Espaciado

### Margin
```css
/* Margin Top */
.mt-xs { margin-top: var(--space-xs); }
.mt-sm { margin-top: var(--space-sm); }
.mt-md { margin-top: var(--space-md); }
.mt-lg { margin-top: var(--space-lg); }
.mt-xl { margin-top: var(--space-xl); }

/* Margin Bottom */
.mb-xs { margin-bottom: var(--space-xs); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }

/* Margin Left */
.ml-xs { margin-left: var(--space-xs); }
.ml-sm { margin-left: var(--space-sm); }
.ml-md { margin-left: var(--space-md); }
.ml-lg { margin-left: var(--space-lg); }
.ml-xl { margin-left: var(--space-xl); }

/* Margin Right */
.mr-xs { margin-right: var(--space-xs); }
.mr-sm { margin-right: var(--space-sm); }
.mr-md { margin-right: var(--space-md); }
.mr-lg { margin-right: var(--space-lg); }
.mr-xl { margin-right: var(--space-xl); }
```

### Padding
```css
/* Padding */
.p-xs { padding: var(--space-xs); }
.p-sm { padding: var(--space-sm); }
.p-md { padding: var(--space-md); }
.p-lg { padding: var(--space-lg); }
.p-xl { padding: var(--space-xl); }

/* Padding Top */
.pt-xs { padding-top: var(--space-xs); }
.pt-sm { padding-top: var(--space-sm); }
.pt-md { padding-top: var(--space-md); }
.pt-lg { padding-top: var(--space-lg); }
.pt-xl { padding-top: var(--space-xl); }

/* Padding Bottom */
.pb-xs { padding-bottom: var(--space-xs); }
.pb-sm { padding-bottom: var(--space-sm); }
.pb-md { padding-bottom: var(--space-md); }
.pb-lg { padding-bottom: var(--space-lg); }
.pb-xl { padding-bottom: var(--space-xl); }
```

---

## 🎯 Layout

### Container
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md);
}
```

### Grid 2 Columnas
```css
.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

### Grid 3 Columnas
```css
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
```

### Flex Center
```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Flex Between
```css
.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

---

## ♿ Accesibilidad

### Focus Visible
```css
*:focus-visible {
  outline: 2px solid var(--stellar-purple);
  outline-offset: 2px;
}

/* Quitar outline en mouse click pero mantener en teclado */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### Reducir Movimiento
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Skip to Content
```css
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--stellar-black);
  color: var(--stellar-white);
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-to-content:focus {
  top: 0;
}
```

---

## 📱 Responsive

### Hide on Mobile
```css
@media screen and (max-width: 767px) {
  .hide-mobile {
    display: none !important;
  }
}
```

### Hide on Desktop
```css
@media screen and (min-width: 768px) {
  .hide-desktop {
    display: none !important;
  }
}
```

### Responsive Text
```css
.text-responsive {
  font-size: 1rem;
}

@media screen and (min-width: 768px) {
  .text-responsive {
    font-size: 1.25rem;
  }
}
```

---

## 🎨 Animaciones

### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}
```

### Slide Up
```css
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-up {
  animation: slideUp 0.4s ease-out;
}
```

### Hover Lift
```css
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}
```

---

## 🔧 Reset y Base

### Reset Básico
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  color: var(--stellar-black);
  background-color: var(--stellar-white);
  line-height: 1.75;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

button {
  font-family: inherit;
}
```

---

**Última actualización**: 11 de febrero de 2026  
**Uso**: Copia y pega estos snippets en tu proyecto
