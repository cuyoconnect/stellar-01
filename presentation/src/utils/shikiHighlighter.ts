import { createHighlighter, type BundledLanguage } from 'shiki'

let instance: Awaited<ReturnType<typeof createHighlighter>> | null = null

const LANGS = [
  'bash',
  'markdown',
  'typescript',
  'rust',
  'json',
] as const satisfies readonly BundledLanguage[]

const LANG_SET = new Set<string>(LANGS)

export async function highlightCode(code: string, lang: string) {
  if (!instance) {
    instance = await createHighlighter({
      themes: ['github-dark'],
      langs: [...LANGS],
    })
  }
  const l = (LANG_SET.has(lang) ? lang : 'markdown') as BundledLanguage
  return instance.codeToHtml(code, {
    lang: l,
    theme: 'github-dark',
  })
}
