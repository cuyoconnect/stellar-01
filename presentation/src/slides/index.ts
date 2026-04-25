import {
  Slide01Title,
  Slide02InstallClaudeCode,
  Slide02Vibecoding,
  Slide03Models,
  Slide03PromptCompare,
  Slide05Mcps,
  Slide06Skills,
  Slide06FrontendDesignSkill,
  Slide12SetupAi,
  Slide16Installation,
  Slide16ComponentLibraries,
  Slide18Close,
} from './registry'

/** Poné en `true` para mostrar la slide "Instalación" (IDE + Add to Cursor). */
export const SHOW_INSTALLATION_SLIDE = false

export const slides = [
  { id: '01-title', component: Slide01Title },
  { id: '02-claude-code-install', component: Slide02InstallClaudeCode },
  { id: '03-ai-basics', component: Slide02Vibecoding },
  { id: '03-models', component: Slide03Models },
  { id: '03-prompt-compare', component: Slide03PromptCompare },
  { id: '05-mcps', component: Slide05Mcps },
  { id: '06-frontend-design-skill', component: Slide06FrontendDesignSkill },
  { id: '06-skills', component: Slide06Skills },
  { id: '12-setup-ai', component: Slide12SetupAi },
  ...(SHOW_INSTALLATION_SLIDE
    ? [{ id: '16-instalacion' as const, component: Slide16Installation }]
    : []),
  { id: '16-component-libraries', component: Slide16ComponentLibraries },
  { id: '18-close', component: Slide18Close },
] as const
