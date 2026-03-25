# Setup de AI Gratis

No necesitás una suscripción paga para construir con AI en la hackathon. Acá van las mejores opciones gratuitas.

---

## APIs en la nube (sin tarjeta de crédito)

### Tier 1 — Las más útiles para la hackathon

| Servicio | Modelo destacado | Límite gratis | Ideal para |
|----------|-----------------|---------------|------------|
| **Google AI Studio** | Gemini 2.5 Pro | Generoso free tier | Razonamiento largo, análisis de código |
| **Groq** | Llama 3.3 70B, DeepSeek R1 | Rate limit alto | Iteración rápida, respuestas veloces |
| **Mistral** | Mistral Large, Codestral | Free tier con API key | Generación de código, debugging |

### Tier 2 — Alternativas sólidas

| Servicio | Modelo destacado | Notas |
|----------|-----------------|-------|
| **Anthropic** | Claude Sonnet 4 | Free tier limitado pero muy capaz |
| **OpenRouter** | Acceso a múltiples modelos | Algunos modelos gratis, otros con créditos |
| **HuggingFace Inference** | Modelos open source | Ideal para experimentar |

---

## Modelos locales (tu propia máquina)

Si tenés una laptop con +16GB de RAM, podés correr modelos locales sin depender de internet.

### Setup con Ollama

```bash
# Instalar Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Modelos recomendados para coding
ollama pull qwen2.5-coder:7b    # 4.7GB - Excelente para código
ollama pull deepseek-coder-v2:lite  # Liviano y capaz
ollama pull llama3.1:8b          # General purpose
```

### Cuándo usar modelos locales vs nube

- **Local:** Cuando la WiFi del venue está saturada (pasa siempre en hackathons)
- **Nube:** Cuando necesitás razonamiento complejo o contexto largo
- **Combo ideal:** Modelo local para autocompletado + API en nube para consultas grandes

---

## Alquilar GPU (si tu máquina no da)

Para modelos más grandes (30B+), podés alquilar una GPU por el fin de semana:

| Servicio | Costo aprox. | GPU |
|----------|-------------|-----|
| **RunPod** | ~$10-20 USD/weekend | A40, A100 |
| **Vast.ai** | ~$5-15 USD/weekend | Variado, subasta |
| **Lambda** | ~$15-25 USD/weekend | A100, H100 |

### Tips para alquiler de GPU

1. Reservá **antes** de la hackathon — la demanda sube durante eventos
2. Usá spot instances si podés tolerar interrupciones
3. Tené un script de setup listo para no perder tiempo configurando

---

## Setup rápido recomendado para la hackathon

```
Opción A (minimalista):
  Google AI Studio + Groq → 0 pesos, 0 configuración

Opción B (con laptop potente):
  Ollama + qwen2.5-coder:7b + Groq como backup → 0 pesos, funciona offline

Opción C (máxima potencia gratis):
  Claude Code free tier + Google AI Studio + Mistral API → 0 pesos, 3 modelos
```

---

## Checklist pre-hackathon

- [ ] Crear cuenta en Google AI Studio y obtener API key
- [ ] Crear cuenta en Groq y obtener API key
- [ ] (Opcional) Instalar Ollama y descargar al menos un modelo
- [ ] Testear que las API keys funcionen antes del evento
- [ ] Guardar las keys en un `.env` (nunca en el código)
