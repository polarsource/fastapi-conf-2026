<script setup lang="ts">
defineProps<{ step: number }>()
const versions = ['2026-07', '2026-10', '2027-01', '2027-04', '2027-07']
</script>

<template>
  <!-- Click-driven adaptation of the landing page's MissionRulers. -->
  <div class="version-ruler" role="img" :aria-label="`${versions[step + 1]} current, ${versions[step]} deprecated, ${versions[step + 2]} next`">
    <div class="ruler-focus"></div>
    <div class="ruler-crop">
      <div class="ruler-belt" :style="{ transform: `translateX(${-step * 288}px)` }">
        <div class="ruler-ticks" aria-hidden="true">
          <i v-for="n in 121" :key="n" :class="{ major: (n - 1) % 6 === 0 }"></i>
        </div>
        <div class="ruler-dates">
          <span v-for="(version, i) in versions" :key="version" :class="{ selected: i === step + 1 }">{{ version }}</span>
        </div>
      </div>
    </div>
    <div class="ruler-needle" aria-hidden="true"></div>
    <div class="ruler-states"><span>Deprecated</span><span>Current</span><span>Next</span></div>
  </div>
</template>

<style scoped>
.version-ruler { width: 864px; height: 205px; position: relative; }
.ruler-crop { overflow: hidden; mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent); padding: 30px 0; }
.ruler-belt { width: 1440px; transition: transform 1200ms cubic-bezier(.22,1,.36,1); }
.ruler-ticks { display: flex; height: 42px; align-items: flex-start; }
.ruler-ticks i { flex: 0 0 12px; height: 14px; border-left: 1px solid var(--border-primary); }
.ruler-ticks i.major { height: 27px; border-color: var(--text-secondary); }
.ruler-dates { display: flex; margin-top: 16px; }
.ruler-dates span { width: 288px; flex: 0 0 288px; text-align: center; font: 25px GeistMono, monospace; color: var(--text-secondary); transition: color 900ms; }
.ruler-dates span.selected { color: var(--text-primary); }
.ruler-focus { position: absolute; left: 330px; top: 0; width: 204px; height: 150px; background: linear-gradient(color-mix(in srgb, var(--text-primary) 3%, transparent), transparent); border-top: 1px solid var(--border-primary); }
.ruler-needle { position: absolute; left: 50%; transform: translateX(-50%); top: 15px; height: 50px; width: 1px; background: var(--text-primary); }
.ruler-needle::after { content: ''; position: absolute; left: 50%; bottom: -4px; width: 7px; height: 7px; background: var(--text-primary); transform: translateX(-50%) rotate(45deg); }
.ruler-states { display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; font-size: 20px; color: var(--text-secondary); }
.ruler-states span:nth-child(2) { color: var(--background-primary); background: var(--background-inverse); border-radius: 30px; padding: 4px 20px; justify-self: center; margin-top: -4px; }
@media (prefers-reduced-motion: reduce) { .ruler-belt, .ruler-dates span { transition: none; } }
</style>
