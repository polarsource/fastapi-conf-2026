import { defineShikiSetup } from '@slidev/types'
import vesper from '@shikijs/themes/vesper'

export default defineShikiSetup(() => ({
  theme: {
    ...vesper,
    tokenColors: [
      ...vesper.tokenColors,
      // Python comments in this deck display the migration diagnostic.
      { scope: 'comment.line.number-sign.python', settings: { foreground: '#f38ba8' } },
    ],
  },
}))
