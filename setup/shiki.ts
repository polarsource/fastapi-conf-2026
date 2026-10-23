import { defineShikiSetup } from '@slidev/types'
import githubLight from '@shikijs/themes/github-light'
import vesper from '@shikijs/themes/vesper'

export default defineShikiSetup(() => ({
  themes: {
    light: {
      ...githubLight,
      tokenColors: [
        ...githubLight.tokenColors,
        { scope: 'comment.line.number-sign.python', settings: { foreground: '#cf222e' } },
      ],
    },
    dark: {
      ...vesper,
      tokenColors: [
        ...vesper.tokenColors,
        // Python comments in this deck display the migration diagnostic.
        { scope: 'comment.line.number-sign.python', settings: { foreground: '#f38ba8' } },
      ],
    },
  },
}))
