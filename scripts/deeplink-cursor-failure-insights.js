/**
 * Genera deeplinks de Cursor para:
 * - Rule: cursor-failure-insights
 * - Command: /vibecoding-validate
 * - Skills: stellar-design, stellar-image-generation
 *
 * Ver: https://cursor.com/docs/integrations/deeplinks
 */

const fs = require("fs");
const path = require("path");

const IS_WEB = false; // true => https://cursor.com/link/* | false => cursor://anysphere.cursor-deeplink/*

const ruleName = "cursor-failure-insights";
const ruleContent = `# Cursor Failure Insights - Lecciones de 285+ sesiones

Reglas críticas (resumen): 1) Verificar build/check después de cambios (TS: pnpm run build, Rust: cargo check). 2) Tipos concretos en refs (HTMLDivElement, etc.) y guardas antes de usar. 3) En sync/OAuth leer flujo completo y usuario en contexto; hard reset si piden "sincronizar". 4) En Vercel/serverless no usar solo fileURLToPath(import.meta.url) para paths. 5) En scroll/animaciones revisar impacto en layout adyacente. 6) Tests según comportamiento real (??, ""). 7) Scripts con globs: usar find o compat zsh/bash. 8) Validar env al arranque. 9) Refactors: sin cierres huérfanos. 10) Tras editar: Read del archivo y build/check.

Checklist: ¿Leí todos los archivos del flujo? ¿Ref/propiedad admite null? ¿Build/check ejecutado?
Fuente completa: AGENTS.md en el repo.`;

const commandName = "vibecoding-validate";
const commandContent = `Ejecuta en orden en la terminal del proyecto:

1. cargo check
2. cargo fmt -- --check (o cargo fmt para formatear)
3. cargo test
4. Si es contrato Soroban: cargo scout-audit en la carpeta del contrato

No saltees pasos. Si alguno falla, reporta el error y corregi antes de seguir.`;

function generateRuleDeeplink(name, text) {
  const u = new URL(IS_WEB ? "https://cursor.com/link/rule" : "cursor://anysphere.cursor-deeplink/rule");
  u.searchParams.set("name", name);
  u.searchParams.set("text", text);
  return u.toString();
}

function generateCommandDeeplink(name, text) {
  const u = new URL(IS_WEB ? "https://cursor.com/link/command" : "cursor://anysphere.cursor-deeplink/command");
  u.searchParams.set("name", name);
  u.searchParams.set("text", text);
  return u.toString();
}

function generateSkillDeeplink(name, content) {
  const u = new URL(IS_WEB ? "https://cursor.com/link/skill" : "cursor://anysphere.cursor-deeplink/skill");
  u.searchParams.set("name", name);
  u.searchParams.set("text", content);
  return u.toString();
}

const ruleUrl = generateRuleDeeplink(ruleName, ruleContent);
const commandUrl = generateCommandDeeplink(commandName, commandContent);
console.log("Rule (cursor-failure-insights):", ruleUrl.length, "/ 8000");
console.log("Command (/vibecoding-validate):", commandUrl.length, "/ 8000");

const skillsDir = path.join(__dirname, "..", ".cursor", "skills");
const stellarDesignContent = fs.readFileSync(path.join(skillsDir, "stellar-design", "SKILL.md"), "utf8");
const stellarImageContent = fs.readFileSync(path.join(skillsDir, "stellar-image-generation", "SKILL.md"), "utf8");

const stellarDesignUrl = generateSkillDeeplink("stellar-design", stellarDesignContent);
const stellarImageUrl = generateSkillDeeplink("stellar-image-generation", stellarImageContent);

console.log("Skill (stellar-design):", stellarDesignUrl.length, "/ 8000");
console.log("Skill (stellar-image-generation):", stellarImageUrl.length, "/ 8000");
console.log("---");
console.log("Rule:", ruleUrl);
console.log("Command:", commandUrl);
console.log("Stellar Design:", stellarDesignUrl);
console.log("Stellar Image:", stellarImageUrl);

module.exports = {
  IS_WEB,
  ruleUrl,
  commandUrl,
  stellarDesignUrl,
  stellarImageUrl,
  ruleName,
  ruleContent,
  commandName,
  commandContent,
};
