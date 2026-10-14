<script setup lang="ts">
defineProps<{ step: number }>()
</script>

<template>
  <svg class="contract-flow" viewBox="0 0 864 312" role="img" aria-label="One FastAPI model produces an July contract with user_id and an October contract with customer_id">
    <g class="flow-source">
      <path d="M30 110L50 90H235V211L215 231H30Z" class="layer-back" />
      <rect x="30" y="110" width="185" height="121" class="flow-surface" />
      <path d="M215 110L235 90" class="flow-wire" />
      <text x="50" y="140" class="micro">SINGLE APPLICATION</text>
      <text x="50" y="178" class="flow-title">FastAPI</text>
      <text x="50" y="207" class="flow-code">OrderResponse</text>
    </g>
    <g :class="['flow-stage', { revealed: step >= 1 }]">
      <path d="M235 169H354Q374 169 374 149V91Q374 71 394 71H558 M235 169H354Q374 169 374 189V239Q374 259 394 259H558" class="flow-wire" />
      <circle class="contract-packet" r="3" fill="white"><animateMotion dur="4s" repeatCount="indefinite" path="M235 169H354Q374 169 374 149V91Q374 71 394 71H558" /></circle>
      <circle class="contract-packet" r="3" fill="white"><animateMotion dur="4s" begin="-2s" repeatCount="indefinite" path="M235 169H354Q374 169 374 189V239Q374 259 394 259H558" /></circle>
      <g class="contract-doc">
        <path d="M570 12H824V124H570Z" class="layer-back" />
        <rect x="558" y="24" width="254" height="112" class="flow-surface" />
        <text x="578" y="53" class="flow-code">2026-07 / openapi.json</text>
        <path d="M578 69H792" class="flow-wire" />
        <text x="578" y="99" class="flow-title small">user_id</text>
      </g>
      <g class="contract-doc">
        <path d="M570 176H824V288H570Z" class="layer-back" />
        <rect x="558" y="188" width="254" height="112" class="flow-surface" />
        <text x="578" y="217" class="flow-code">2026-10 / openapi.json</text>
        <path d="M578 233H792" class="flow-wire" />
        <text x="578" y="266" class="flow-title small">customer_id</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.contract-flow { width: 100%; overflow: visible; }
.flow-surface { fill: #111; stroke: #606060; }
.layer-back { fill: #0b0b0b; stroke: #333; }
.flow-wire { fill: none; stroke: #555; stroke-width: 1; }
text { fill: #f0f0f0; font-family: 'PP Neue Montreal', sans-serif; }
.micro { font: 11px GeistMono, monospace; fill: #999; letter-spacing: 1px; }
.flow-title { font-size: 31px; }.small { font: 22px GeistMono, monospace; }
.flow-code { font: 13px GeistMono, monospace; fill: #bbb; }
.flow-stage { opacity: 0; transform: translateX(-12px); transition: opacity 700ms, transform 1000ms cubic-bezier(.22,1,.36,1); }
.flow-stage.revealed { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .contract-packet { animation: none; opacity: 0; }.flow-stage { transition: none; } }
</style>
