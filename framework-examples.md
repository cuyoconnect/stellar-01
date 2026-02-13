# Stellar Design System - Ejemplos para Frameworks

Guía de implementación del Stellar Design System en frameworks modernos.

---

## React / Next.js

### 1. Configuración Inicial

#### Instalar Fuentes (Next.js App Router)
```javascript
// app/layout.js
import { Lora, Inter } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-heading',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-body',
})

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${lora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

#### Importar CSS
```javascript
// app/layout.js o pages/_app.js
import '../styles/stellar-design-system.css'
```

### 2. Componentes React

#### Botón
```jsx
// components/Button.jsx
export function Button({ 
  variant = 'primary', 
  children, 
  ...props 
}) {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  
  return (
    <button 
      className={`${baseClass} ${variantClass}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Uso
<Button variant="primary">Empezar</Button>
<Button variant="secondary">Más Info</Button>
<Button variant="outline">Cancelar</Button>
```

#### Input
```jsx
// components/Input.jsx
export function Input({ 
  label, 
  error, 
  className = '', 
  ...props 
}) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <input 
        className={`input-text ${className}`}
        {...props}
      />
      {error && (
        <span className="text-error" style={{ fontSize: '0.875rem' }}>
          {error}
        </span>
      )}
    </div>
  )
}

// Uso
<Input 
  label="Email" 
  type="email" 
  placeholder="tu@email.com"
  error={errors.email}
/>
```

#### Card
```jsx
// components/Card.jsx
export function Card({ 
  title, 
  children, 
  variant = 'default',
  className = '' 
}) {
  const cardClass = variant === 'subtle' ? 'card-subtle' : 'card'
  
  return (
    <div className={`${cardClass} ${className}`}>
      {title && <h3 className="mb-md">{title}</h3>}
      {children}
    </div>
  )
}

// Uso
<Card title="DeFi en Stellar">
  <p>Construye aplicaciones DeFi escalables...</p>
</Card>
```

#### Hero Section
```jsx
// components/Hero.jsx
export function Hero({ title, subtitle, actions }) {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="mb-lg">{title}</h1>
        {subtitle && (
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            {subtitle}
          </p>
        )}
        {actions && (
          <div className="button-grid" style={{ justifyContent: 'center' }}>
            {actions}
          </div>
        )}
      </div>
    </section>
  )
}

// Uso
<Hero 
  title="Donde DeFi se une al mundo real"
  subtitle="Construye el futuro del acceso financiero"
  actions={
    <>
      <Button variant="primary">Empezar a Crear</Button>
      <Button variant="secondary">Obtener Soporte</Button>
    </>
  }
/>
```

#### Stat Card
```jsx
// components/StatCard.jsx
export function StatCard({ number, label }) {
  return (
    <div className="stat-card">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

// Uso
<div className="grid-2">
  <StatCard number="10.1M" label="Direcciones Totales" />
  <StatCard number="475K+" label="Ramps Globales" />
  <StatCard number="5.1B" label="Total de Operaciones" />
</div>
```

### 3. Hooks Personalizados

#### useTheme
```jsx
// hooks/useTheme.js
import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--bg-color', 
      theme === 'dark' ? 'var(--stellar-black)' : 'var(--stellar-white)'
    )
  }, [theme])
  
  return { theme, setTheme }
}
```

---

## Vue 3 / Nuxt 3

### 1. Configuración Inicial

#### Instalar Fuentes (Nuxt 3)
```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@400;600&display=swap'
        }
      ]
    }
  },
  css: ['~/assets/css/stellar-design-system.css']
})
```

### 2. Componentes Vue

#### Botón
```vue
<!-- components/StellarButton.vue -->
<template>
  <button 
    :class="['btn', `btn-${variant}`]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  }
})
</script>

<!-- Uso -->
<StellarButton variant="primary">Empezar</StellarButton>
```

#### Input
```vue
<!-- components/StellarInput.vue -->
<template>
  <div class="form-group">
    <label v-if="label" class="form-label">
      {{ label }}
    </label>
    <input 
      :class="['input-text', { 'error': error }]"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <span v-if="error" class="text-error" style="font-size: 0.875rem;">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  error: String,
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<!-- Uso -->
<StellarInput 
  v-model="email"
  label="Email" 
  type="email" 
  placeholder="tu@email.com"
  :error="emailError"
/>
```

#### Card
```vue
<!-- components/StellarCard.vue -->
<template>
  <div :class="[variant === 'subtle' ? 'card-subtle' : 'card']">
    <h3 v-if="title" class="mb-md">{{ title }}</h3>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: String,
  variant: {
    type: String,
    default: 'default'
  }
})
</script>

<!-- Uso -->
<StellarCard title="DeFi en Stellar">
  <p>Construye aplicaciones DeFi escalables...</p>
</StellarCard>
```

### 3. Composables

#### useColors
```javascript
// composables/useColors.js
export const useColors = () => {
  const colors = {
    yellow: '#FDDA24',
    purple: '#673AB7',
    black: '#0F0F0F',
    white: '#FFFFFF',
    purpleLight: '#B7ACE8',
    cyan: '#00A7B5',
    error: '#FF3F00',
  }
  
  return { colors }
}

// Uso
const { colors } = useColors()
```

---

## Svelte / SvelteKit

### 1. Configuración Inicial

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-auto'

export default {
  kit: {
    adapter: adapter()
  }
}
```

```html
<!-- src/app.html -->
<head>
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600&family=Inter:wght@400;600&display=swap" rel="stylesheet">
</head>
```

```javascript
// src/routes/+layout.svelte
<script>
  import '../app.css'
  import '$lib/styles/stellar-design-system.css'
</script>

<slot />
```

### 2. Componentes Svelte

#### Botón
```svelte
<!-- lib/components/Button.svelte -->
<script>
  export let variant = 'primary'
  export let type = 'button'
</script>

<button 
  class="btn btn-{variant}"
  {type}
  on:click
>
  <slot />
</button>

<!-- Uso -->
<script>
  import Button from '$lib/components/Button.svelte'
</script>

<Button variant="primary" on:click={handleClick}>
  Empezar
</Button>
```

#### Input
```svelte
<!-- lib/components/Input.svelte -->
<script>
  export let label = ''
  export let error = ''
  export let value = ''
  export let type = 'text'
  export let placeholder = ''
</script>

<div class="form-group">
  {#if label}
    <label class="form-label">{label}</label>
  {/if}
  <input 
    class="input-text"
    {type}
    {placeholder}
    bind:value
    on:input
  />
  {#if error}
    <span class="text-error" style="font-size: 0.875rem;">
      {error}
    </span>
  {/if}
</div>

<!-- Uso -->
<script>
  import Input from '$lib/components/Input.svelte'
  let email = ''
</script>

<Input 
  bind:value={email}
  label="Email" 
  type="email" 
  placeholder="tu@email.com"
/>
```

#### Card
```svelte
<!-- lib/components/Card.svelte -->
<script>
  export let title = ''
  export let variant = 'default'
</script>

<div class={variant === 'subtle' ? 'card-subtle' : 'card'}>
  {#if title}
    <h3 class="mb-md">{title}</h3>
  {/if}
  <slot />
</div>

<!-- Uso -->
<Card title="DeFi en Stellar">
  <p>Construye aplicaciones DeFi escalables...</p>
</Card>
```

---

## Tailwind CSS Integration

Si prefieres usar Tailwind CSS, aquí está la configuración:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        stellar: {
          yellow: '#FDDA24',
          'yellow-dark': '#DCC436',
          purple: '#673AB7',
          'purple-hover': '#764EBE',
          'purple-light': '#B7ACE8',
          'purple-lighter': '#BDB1F5',
          black: '#0F0F0F',
          'black-soft': '#212121',
          cyan: '#00A7B5',
          error: '#FF3F00',
        },
        gray: {
          lightest: '#F9F9F9',
          light: '#F2F2F2',
          medium: '#969696',
        }
      },
      fontFamily: {
        heading: ['Lora', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Schabo', 'Arial Black', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        'stellar-sm': '0.25rem',
        'stellar-md': '0.375rem',
        'stellar-lg': '1.5rem',
        'stellar-pill': '6.25rem',
      },
      spacing: {
        'stellar-xs': '0.25rem',
        'stellar-sm': '0.5rem',
        'stellar-md': '1rem',
        'stellar-lg': '1.5rem',
        'stellar-xl': '2.5rem',
      }
    }
  }
}
```

### Uso con Tailwind
```jsx
// Botón Primario
<button className="
  bg-stellar-purple 
  text-white 
  px-4 
  py-2 
  rounded-stellar-md 
  border 
  border-stellar-purple
  hover:bg-stellar-purple-hover
  transition-all
  duration-200
">
  Empezar
</button>

// Hero Section
<section className="
  bg-stellar-yellow 
  text-stellar-black 
  py-stellar-xl 
  px-stellar-md
  min-h-[60vh]
  flex 
  items-center 
  justify-center
  text-center
">
  <div className="container mx-auto">
    <h1 className="font-heading text-5xl md:text-6xl mb-stellar-lg">
      Título Hero
    </h1>
  </div>
</section>
```

---

## CSS Modules

Para proyectos que usan CSS Modules:

```css
/* Button.module.css */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0 1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary {
  background-color: var(--stellar-purple);
  color: var(--stellar-white);
  border-color: var(--stellar-purple);
  border-radius: var(--radius-md);
}

.primary:hover {
  background-color: var(--stellar-purple-hover);
}
```

```jsx
// Button.jsx
import styles from './Button.module.css'

export function Button({ variant = 'primary', children, ...props }) {
  return (
    <button 
      className={`${styles.btn} ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## Styled Components (React)

```jsx
// Button.styled.js
import styled from 'styled-components'

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0 1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.variant === 'primary' && `
    background-color: var(--stellar-purple);
    color: var(--stellar-white);
    border-color: var(--stellar-purple);
    border-radius: var(--radius-md);
    
    &:hover {
      background-color: var(--stellar-purple-hover);
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: var(--stellar-black);
    color: var(--stellar-white);
    border-color: var(--stellar-black);
    border-radius: var(--radius-pill);
    padding: 0.375rem 1.375rem;
  `}
`

// Uso
<Button variant="primary">Empezar</Button>
```

---

## Testing

### Jest + React Testing Library

```jsx
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza correctamente', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('aplica la clase correcta según variant', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByText('Primary')
    expect(button).toHaveClass('btn', 'btn-primary')
  })
  
  it('maneja clicks', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

---

## Storybook

```jsx
// Button.stories.jsx
import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline']
    }
  }
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  children: 'Botón Primario'
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  children: 'Botón Secundario'
}

export const Outline = Template.bind({})
Outline.args = {
  variant: 'outline',
  children: 'Botón Outline'
}
```

---

## TypeScript Support

```typescript
// Button.tsx
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

```typescript
// Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ 
  label, 
  error, 
  className = '', 
  ...props 
}: InputProps) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input className={`input-text ${className}`} {...props} />
      {error && (
        <span className="text-error" style={{ fontSize: '0.875rem' }}>
          {error}
        </span>
      )}
    </div>
  )
}
```

---

## Mejores Prácticas

1. **Usa CSS Variables**: Facilita cambios de tema
2. **Componentes Reutilizables**: Crea una biblioteca de componentes
3. **TypeScript**: Añade type safety a tus componentes
4. **Testing**: Escribe tests para componentes críticos
5. **Storybook**: Documenta tus componentes visualmente
6. **Accesibilidad**: Mantén los atributos ARIA y focus states
7. **Performance**: Usa lazy loading para componentes pesados
8. **Responsive**: Prueba en diferentes tamaños de pantalla

---

**Última actualización**: 11 de febrero de 2026
