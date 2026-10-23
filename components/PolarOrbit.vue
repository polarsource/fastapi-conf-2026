<template>
  <!-- Geometry adapted from Polar's Landing/graphics/OrbitingSpheres.tsx. -->
  <svg class="polar-orbit" viewBox="0 0 400 400" aria-hidden="true">
    <circle cx="200" cy="200" r="128" />
    <g class="orbit-rotation">
      <circle cx="264" cy="200" r="64" />
      <circle cx="239.68" cy="200" r="39.68" />
      <circle cx="224.6016" cy="200" r="24.6016" />
      <circle class="satellite" cx="360" cy="200" r="5" />
    </g>
  </svg>
</template>

<style scoped>
.polar-orbit { width: 100%; height: 100%; fill: none; stroke: var(--text-primary); stroke-width: 1.25; }
.orbit-rotation { transform-origin: 200px 200px; animation: orbit 25s linear infinite; }
.satellite { fill: var(--text-primary); stroke: none; }
@keyframes orbit { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .orbit-rotation { animation: none; } }
</style>
