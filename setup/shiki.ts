import { defineShikiSetup } from '@slidev/types'
import githubLight from '@shikijs/themes/github-light-high-contrast'
import githubDark from '@shikijs/themes/github-dark-high-contrast'

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
      ...githubDark,
      tokenColors: [
        ...githubDark.tokenColors,
        // Python comments in this deck display the migration diagnostic.
        { scope: 'comment.line.number-sign.python', settings: { foreground: '#f38ba8' } },
      ],
    },
  },
}))
