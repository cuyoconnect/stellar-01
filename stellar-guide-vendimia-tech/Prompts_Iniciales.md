# Prompts Iniciales para Claude Code

Prompts listos para copiar y pegar en tu sesión de Claude Code. Adaptados para proyectos Stellar en el contexto argentino.

---

## Arrancar un proyecto desde cero

### MVP de pagos con Stellar

```
Necesito crear una aplicación web que permita a usuarios argentinos enviar
pagos en USDC a través de Stellar. El stack es Next.js 15 con TypeScript
y Tailwind CSS. La wallet es Freighter.

Requisitos:
1. Conectar Freighter wallet
2. Mostrar balance de XLM y USDC
3. Formulario para enviar USDC a otra dirección Stellar
4. Historial de transacciones

Usamos Stellar testnet. Empezá con el plan de arquitectura antes de codear.
```

### DeFi dashboard

```
Quiero construir un dashboard DeFi que muestre información de protocolos
Stellar. El usuario conecta su Freighter wallet y ve:

1. Su balance de XLM, USDC y otros assets
2. Sus posiciones en Blend (lending/borrowing)
3. Liquidez aportada en Soroswap/Phoenix
4. Un resumen de ganancias/pérdidas

Stack: Next.js, TypeScript, Tailwind, stellar-sdk.
Red: testnet para desarrollo, pero la UI debe servir para mainnet después.
Planificá primero la arquitectura.
```

### Contrato Soroban personalizado

```
Necesito crear un contrato Soroban en Rust que implemente un sistema de
escrow simple:

1. Un usuario deposita USDC en el contrato
2. Define un beneficiario y una condición (timestamp)
3. Después del timestamp, el beneficiario puede retirar
4. Antes del timestamp, el depositante puede cancelar

Empezá con la estructura del contrato y los tests.
```

---

## Integración con el ecosistema argentino

### On/off ramp conceptual

```
Diseñá la arquitectura (sin implementar el backend completo) para un
servicio que permita:

1. Un usuario deposita ARS vía transferencia bancaria (CBU/CVU)
2. El servicio convierte a USDC en Stellar
3. El USDC se envía a la wallet del usuario

Necesito:
- Diagrama de flujo del proceso
- Interfaces TypeScript para cada paso
- Mock del frontend en Next.js
- Consideraciones de compliance para Argentina

Esto es para una demo de hackathon, no producción.
```

### Remesas LatAm

```
Quiero hacer una demo de remesas entre Argentina y otro país de LatAm
usando Stellar como rail. El flujo es:

1. Emisor en Argentina envía ARS
2. Se convierte a USDC en Stellar
3. El receptor en [país] recibe en su moneda local

Necesito un frontend que simule este flujo con datos mock para la demo.
Usá Next.js + TypeScript + Tailwind. Mostrá las fees y el tipo de cambio.
```

---

## Prompts para debugging

### Cuando algo no compila

```
Este contrato Soroban no compila. El error es:
[pegá el error exacto]

El código está en src/lib.rs. Revisalo y decime qué está mal y cómo
arreglarlo. Mostrame el fix exacto.
```

### Cuando una transacción falla

```
Estoy intentando enviar USDC en Stellar testnet y la transacción falla
con este error:
[pegá el error exacto]

Mi código está en [archivo]. Necesito que:
1. Expliques por qué falla
2. Propongas el fix
3. Implementes el fix
```

### Cuando el frontend no conecta

```
La conexión con Freighter wallet no funciona. Cuando hago click en
"Conectar Wallet" no pasa nada. El código está en [componente].

Revisá:
1. Que Freighter esté instalado y en testnet
2. Que el código de conexión sea correcto
3. Que los event handlers estén bien
```

---

## Prompts para la demo final

### Preparar la presentación

```
La hackathon termina en 6 horas. Necesito preparar mi demo:

1. Revisá el estado actual del proyecto y listá qué funciona y qué no
2. Priorizá: qué puedo arreglar en 4 horas para tener la mejor demo
3. Escribime un guión de demo de 3 minutos que muestre el flujo principal
4. Asegurate de que el happy path funcione perfecto
```

### Limpiar para la entrega

```
Necesito preparar el repo para la entrega de la hackathon:

1. Asegurate de que el README explique qué es el proyecto y cómo correrlo
2. Revisá que no haya API keys o secrets en el código
3. Verificá que las instrucciones de instalación funcionen
4. Agregá un .env.example con las variables necesarias
```

---

## Tips para escribir buenos prompts

1. **Contexto primero:** Explicá qué estás construyendo antes de pedir algo
2. **Sé específico:** "Creá un hook useBalance que consulte el balance USDC via Horizon API" > "Hacé el balance"
3. **Incluí errores completos:** Copiá el error exacto, no lo parafrasees
4. **Un paso a la vez:** Mejor 5 prompts chicos que 1 prompt gigante
5. **Referenciá archivos:** "En src/components/Wallet.tsx, línea 45..." es más útil que "en el componente de la wallet"
