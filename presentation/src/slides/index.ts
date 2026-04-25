import {
  Slide01Title,
  Slide02Vibecoding,
  Slide03PromptCompare,
  Slide05Mcps,
  Slide06Skills,
  Slide06FrontendDesignSkill,
  Slide07Validation,
  Slide08FreeApi,
  Slide12SetupAi,
  Slide14Prompts,
  Slide16Installation,
  Slide16ComponentLibraries,
  Slide17Resources,
  Slide18Close,
} from './registry'

/** Poné en `true` para mostrar la slide "Instalación" (IDE + Add to Cursor). */
export const SHOW_INSTALLATION_SLIDE = false

export const slides = [
  { id: '01-title', component: Slide01Title },
  { id: '02-ai-basics', component: Slide02Vibecoding },
  { id: '03-prompt-compare', component: Slide03PromptCompare },
  { id: '05-mcps', component: Slide05Mcps },
  { id: '06-frontend-design-skill', component: Slide06FrontendDesignSkill },
  { id: '06-skills', component: Slide06Skills },
  { id: '07-validation', component: Slide07Validation },
  { id: '08-free-api', component: Slide08FreeApi },
  { id: '12-setup-ai', component: Slide12SetupAi },
  { id: '14-prompts', component: Slide14Prompts },
  ...(SHOW_INSTALLATION_SLIDE
    ? [{ id: '16-instalacion' as const, component: Slide16Installation }]
    : []),
  { id: '16-component-libraries', component: Slide16ComponentLibraries },
  { id: '17-resources', component: Slide17Resources },
  { id: '18-close', component: Slide18Close },
] as const
