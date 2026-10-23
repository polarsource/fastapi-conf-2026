<script setup lang="ts">
defineProps<{ step: number }>()
const connections = [
  { step: 1, path: 'M168 150H350', begin: '0s' },
  { step: 2, path: 'M499 150H568Q588 150 588 130V90Q588 70 608 70H688', begin: '0s' },
  { step: 2, path: 'M499 150H568Q588 150 588 170V210Q588 230 608 230H688', begin: '-2s' },
]
</script>

<template>
  <div class="generator-scene" role="img" aria-label="Versioned OpenAPI documents combine in an intermediate representation, then generate Python and TypeScript SDKs">
    <svg viewBox="0 0 864 280" class="generator-wires" aria-hidden="true">
      <g v-for="connection in connections" :key="connection.path" :class="['connection', { live: step >= connection.step }]">
        <path :d="connection.path" class="connector" />
      </g>
      <g v-for="connection in connections" :key="connection.path">
        <circle v-if="step >= connection.step" class="generator-packet" r="3" fill="var(--text-primary)" stroke="none">
          <animateMotion dur="4s" :begin="connection.begin" repeatCount="indefinite" :path="connection.path" />
        </circle>
      </g>
    </svg>
    <div class="spec-stack">
      <div class="spec-sheet back">2026-10</div>
      <div class="spec-sheet front"><span>2026-07</span><strong>{ }</strong><span>OpenAPI</span></div>
    </div>
    <div :class="['ir-engine', { active: step >= 1 }]">
      <svg class="ir-cube" viewBox="0 0 165 155" aria-hidden="true">
        <path d="M8 39 82.5 1 157 39 82.5 77Z" fill="var(--text-primary)" fill-opacity=".07" />
        <path d="M8 39 82.5 77V154L8 116Z" fill="var(--text-primary)" fill-opacity=".024" />
        <path d="M82.5 77 157 39V116L82.5 154Z" fill="var(--text-primary)" fill-opacity=".043" />
        <path d="M8 39V116L82.5 154 157 116V39L82.5 1Z M8 39 82.5 77 157 39 M82.5 77V154" class="cube-edges" />
        <text class="cube-label" transform="matrix(.707 -.361 .707 .361 82.5 39)" text-anchor="middle" dominant-baseline="central">IR</text>
      </svg>
    </div>
    <div :class="['sdk-output python', { active: step >= 2 }]"><span>Python</span><code>v2026_07<br>v2026_10</code></div>
    <div :class="['sdk-output typescript', { active: step >= 2 }]"><span>TypeScript</span><code>2026-07<br>2026-10</code></div>
    <div class="generator-labels"><span>Versioned contracts</span><span>Intermediate representation</span><span>Typed packages</span></div>
  </div>
</template>

<style scoped>
.generator-scene { position: relative; width: 864px; height: 340px; }
.generator-wires { position: absolute; width: 100%; height: 280px; fill: none; stroke: var(--border-primary); }
.connection { opacity: .2; transition: opacity 700ms; }.connection.live { opacity: 1; }
.connector { stroke: var(--text-secondary); stroke-width: 1; }
.spec-stack { position: absolute; left: 28px; top: 68px; width: 180px; height: 170px; }
.spec-sheet { width: 140px; height: 164px; border: 1px solid var(--text-secondary); background: var(--background-secondary); padding: 14px; position: absolute; font: 17px GeistMono, monospace; }
.spec-sheet.back { left: 24px; top: -48px; color: var(--text-primary); background: var(--background-primary); }
.spec-sheet.front { display: flex; flex-direction: column; justify-content: space-between; }
.spec-sheet strong { font-size: 40px; font-weight: 300; }.spec-sheet span:last-child { color: var(--text-secondary); }
.ir-engine { position: absolute; left: 342px; top: 72.5px; width: 165px; height: 155px; opacity: .2; transition: opacity 800ms; }
.ir-engine.active { opacity: 1; }
.ir-cube { width: 100%; height: 100%; }
.cube-edges { fill: none; stroke: var(--text-secondary); stroke-width: 1; stroke-linejoin: round; }
.ir-cube .cube-label { font-size: 38px; fill: var(--text-primary); }
.sdk-output { position: absolute; left: 688px; width: 160px; height: 136px; border: 1px solid var(--text-secondary); background: var(--background-secondary); padding: 14px; opacity: .2; transition: opacity 700ms; }
.sdk-output.active { opacity: 1; }.python { top: 2px; }.typescript { top: 162px; }
.sdk-output > span { display: block; font-size: 25px; margin-bottom: 10px; }.sdk-output code { background: none !important; padding: 0 !important; font: 20px/1.5 GeistMono, monospace; color: var(--text-secondary); }
.generator-labels { position: absolute; bottom: 0; width: 100%; display: grid; grid-template-columns: 230px 1fr 205px; text-align: center; color: var(--text-secondary); font-size: 16px; }
@media (prefers-reduced-motion: reduce) { .generator-packet { display: none; }.sdk-output, .ir-engine { transition: none; } }
</style>
