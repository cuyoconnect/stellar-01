# Stellar Design System - Auditoría Completa

Este repositorio contiene una auditoría de diseño completa del sitio web Stellar.org, con todos los recursos necesarios para replicar su sistema de diseño.

## 📁 Archivos Incluidos

### 1. `auditoria-diseno-stellar.md`
**Documento principal de auditoría** con análisis detallado de:
- Paleta de colores exacta (HEX/RGB)
- Tipografía completa (familias, pesos, tamaños)
- Análisis de ilustraciones
- Especificaciones de UI (botones, bordes, sombras)
- Resumen ejecutivo

### 2. `stellar-design-system.css`
**Archivo CSS listo para usar** con:
- Variables CSS (custom properties) para todos los colores
- Clases de utilidad completas
- Componentes pre-construidos (botones, formularios, tarjetas)
- Sistema de espaciado
- Tipografía responsive
- Utilidades de accesibilidad

### 3. `stellar-design-showcase.html`
**Página de demostración interactiva** que muestra:
- Todos los colores de la paleta
- Ejemplos de tipografía
- Variantes de botones
- Formularios completos
- Tarjetas y contenedores
- Estadísticas
- Tags y enlaces

## 🚀 Inicio Rápido

### Opción 1: Ver el Showcase
1. Abre `stellar-design-showcase.html` en tu navegador
2. Explora todos los componentes visualmente
3. Inspecciona el código para ver la implementación

### Opción 2: Usar el CSS en tu Proyecto
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="stylesheet" href="stellar-design-system.css">
</head>
<body>
    <button class="btn btn-primary">Mi Botón</button>
</body>
</html>
```

### Opción 3: Usar Variables CSS
```css
/* En tu propio CSS */
.mi-componente {
    background-color: var(--stellar-yellow);
    color: var(--stellar-black);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
}
```

## 🎨 Paleta de Colores Rápida

```css
/* Principales */
--stellar-yellow: #FDDA24;     /* Amarillo de marca */
--stellar-purple: #673AB7;     /* Violeta para acciones */
--stellar-black: #0F0F0F;      /* Negro (no puro) */
--stellar-white: #FFFFFF;      /* Blanco */

/* Secundarios */
--stellar-purple-light: #B7ACE8;
--stellar-cyan: #00A7B5;
--stellar-error: #FF3F00;
--stellar-gray-medium: #969696;
```

## 📝 Tipografía

### Fuentes Necesarias
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@400;600&family=IBM+Plex+Mono&display=swap" rel="stylesheet">
```

### Uso
- **Lora** (serif): Títulos H1, H2
- **Inter** (sans-serif): Cuerpo de texto, H3, UI
- **Schabo** (display): Números grandes/estadísticas
- **IBM Plex Mono**: Código

## 🧩 Componentes Principales

### Botones
```html
<button class="btn btn-primary">Primario</button>
<button class="btn btn-secondary">Secundario</button>
<button class="btn btn-outline">Outline</button>
```

### Formularios
```html
<input type="text" class="input-text" placeholder="Texto">
<input type="checkbox" class="checkbox-custom">
<input type="radio" class="radio-custom">
```

### Tarjetas
```html
<div class="card">
    <h3>Título</h3>
    <p>Contenido</p>
</div>
```

### Hero Section
```html
<section class="hero">
    <h1>Título Grande</h1>
    <button class="btn btn-primary">CTA</button>
</section>
```

## 🎯 Características del Diseño

### Filosofía
- **Flat Design**: Sin sombras suaves, bordes sólidos
- **Alto Contraste**: Colores vibrantes sobre fondos claros/oscuros
- **Tipografía Mixta**: Serif para impacto, sans-serif para legibilidad
- **Espaciado Generoso**: Mucho breathing room

### Especificaciones Técnicas
- **Border Radius**: 4px (mínimo) a 100px (pill)
- **Bordes**: 1px solid, colores negro o gris
- **Transiciones**: 0.2s ease (suaves y rápidas)
- **Espaciado**: Sistema basado en rem (4px, 8px, 16px, 24px, 40px)

## 📱 Responsive

El sistema incluye breakpoints:
- **Mobile**: 0px - 767px
- **Desktop**: 768px+

Ejemplo:
```css
/* Mobile first */
h1 { font-size: 3rem; }

/* Desktop */
@media screen and (min-width: 768px) {
    h1 { font-size: 4rem; }
}
```

## ♿ Accesibilidad

El sistema incluye:
- Focus visible para navegación por teclado
- Contraste adecuado (WCAG AA)
- Soporte para `prefers-reduced-motion`
- Tamaños de toque adecuados (min 40px)

## 🔧 Personalización

### Cambiar Colores
```css
:root {
    --stellar-yellow: #TU_COLOR;
    --stellar-purple: #TU_COLOR;
}
```

### Cambiar Tipografía
```css
:root {
    --font-heading: 'Tu Fuente', serif;
    --font-body: 'Tu Fuente', sans-serif;
}
```

## 📊 Páginas Analizadas

- https://stellar.org/es/casos-de-uso/defi
- https://stellar.org/es/casos-de-uso/tokenizacion

## 🛠️ Stack Técnico de Stellar.org

- **Framework**: Next.js (React)
- **Styling**: Styled Components (CSS-in-JS)
- **Fuentes**: WOFF2 con fallbacks optimizados
- **CDN**: Sanity CDN para imágenes

## 📖 Documentación Adicional

Para más detalles técnicos, consulta:
- `auditoria-diseno-stellar.md` - Análisis completo
- `stellar-design-system.css` - Comentarios en código

## 🎨 Uso de Ilustraciones

Las ilustraciones de Stellar siguen estos principios:
- Paleta limitada (amarillo, violeta, tonos tierra)
- Texturas granuladas (grain effect)
- Formas orgánicas y geométricas simples
- Superposición de capas para profundidad
- Estilo flat con elementos de collage digital

## 💡 Tips de Implementación

1. **Usa las variables CSS**: Facilita cambios globales
2. **Mobile First**: Diseña primero para móvil
3. **Consistencia**: Usa las clases de utilidad para mantener coherencia
4. **Performance**: Las fuentes WOFF2 están optimizadas
5. **Accesibilidad**: Mantén los focus states y contrastes

## 📝 Licencia

Este es un análisis de diseño con fines educativos. Los derechos de diseño pertenecen a Stellar Development Foundation.

## 🤝 Contribuciones

Si encuentras discrepancias o mejoras, siéntete libre de actualizar los archivos.

---

**Creado**: 11 de febrero de 2026  
**Autor**: Auditoría de Diseño Stellar.org  
**Versión**: 1.0
