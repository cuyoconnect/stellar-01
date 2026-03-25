# Guía de Setup para Desarrollo Stellar/Soroban

Todo lo que necesitás configurar antes y durante la hackathon para trabajar con Stellar y Soroban.

---

## Pre-requisitos

```bash
# Rust (necesario para Soroban)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown

# Stellar CLI
cargo install stellar-cli --locked

# Node.js 18+ (para frontend)
# Recomendado: usar nvm
nvm install 20
nvm use 20

# Verificar todo
stellar version
rustc --version
node --version
```

---

## Stellar CLI — Configuración de red

```bash
# Configurar testnet
stellar network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"

# Crear una identidad de desarrollo
stellar keys generate mi-wallet --network testnet

# Fondear con Friendbot (testnet)
stellar keys fund mi-wallet --network testnet

# Verificar balance
stellar keys address mi-wallet
# Usá la dirección en https://horizon-testnet.stellar.org/accounts/{address}
```

---

## Freighter Wallet (para tu app)

Los usuarios de tu app van a necesitar una wallet. Freighter es la más usada en Stellar.

1. Instalar extensión: [freighter.app](https://www.freighter.app/)
2. Crear cuenta o importar
3. **Cambiar a Testnet** en configuración
4. Fondear con Friendbot desde la interfaz

### Integración en código

```typescript
import { requestAccess, signTransaction } from '@stellar/freighter-api';

// Conectar wallet
const publicKey = await requestAccess();

// Firmar transacción
const signedXDR = await signTransaction(txXDR, {
  networkPassphrase: 'Test SDF Network ; September 2015',
});
```

---

## Soroban — Tu primer contrato

```bash
# Crear proyecto
stellar contract init mi-contrato
cd mi-contrato

# Estructura generada
# ├── Cargo.toml
# ├── src/
# │   └── lib.rs        ← Tu contrato
# └── test/
#     └── test.rs        ← Tests

# Compilar
stellar contract build

# Deploy a testnet
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/mi_contrato.wasm \
  --network testnet \
  --source mi-wallet
```

---

## Assets importantes en Stellar Testnet

| Asset | Issuer (testnet) | Notas |
|-------|-------------------|-------|
| XLM | Nativo | Gas y transferencias |
| USDC | `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5` | Circle testnet issuer |

### Establecer trustline para USDC

```typescript
import { Asset, Operation, TransactionBuilder } from '@stellar/stellar-sdk';

const usdc = new Asset('USDC', 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5');

const tx = new TransactionBuilder(account, { fee: '100' })
  .addOperation(Operation.changeTrust({ asset: usdc }))
  .setTimeout(30)
  .build();
```

---

## Errores comunes y cómo resolverlos

### 1. "Transaction simulation failed"

**Causa:** El contrato tiene un error o los parámetros son incorrectos.
**Solución:** Siempre usá `simulateTransaction` antes de `sendTransaction`:

```typescript
const sim = await server.simulateTransaction(tx);
if ('error' in sim) {
  console.error('Simulación falló:', sim.error);
  // No envíes la transacción
}
```

### 2. "Auth required" / Error de autorización

**Causa:** El contrato requiere autorización y no se incluyó.
**Solución:** Después de simular, prepará la transacción:

```typescript
const prepared = await server.prepareTransaction(tx);
// Esto agrega las entradas de auth necesarias
```

### 3. "Account not found"

**Causa:** La cuenta no existe en la red (no fue fondeada).
**Solución:** Fondear con Friendbot en testnet:

```bash
curl "https://friendbot.stellar.org?addr=TU_ADDRESS"
```

### 4. Polling de transacciones

**Nunca** hagas fire-and-forget con `sendTransaction`. Siempre polleá el resultado:

```typescript
const response = await server.sendTransaction(tx);

if (response.status === 'PENDING') {
  let result;
  do {
    await new Promise(r => setTimeout(r, 1000));
    result = await server.getTransaction(response.hash);
  } while (result.status === 'NOT_FOUND');

  if (result.status === 'SUCCESS') {
    console.log('Transacción exitosa');
  } else {
    console.error('Transacción falló:', result);
  }
}
```

### 5. SDK version mismatch

Asegurate de usar versiones compatibles:

```json
{
  "dependencies": {
    "@stellar/stellar-sdk": "^12.0.0",
    "@stellar/freighter-api": "^2.0.0"
  }
}
```

---

## Checklist pre-hackathon

- [ ] Rust + wasm32 target instalado
- [ ] Stellar CLI instalado y configurado
- [ ] Identidad de testnet creada y fondeada
- [ ] Freighter instalado y en testnet
- [ ] Node.js 18+ instalado
- [ ] Compilaste y deployaste un contrato de prueba
- [ ] Probaste `simulateTransaction` + `sendTransaction` + polling
