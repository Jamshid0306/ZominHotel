<script setup>
const flakes = Array.from({ length: 36 }, (_, index) => index)
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-50 overflow-hidden">
    <span
      v-for="flake in flakes"
      :key="flake"
      class="snowflake"
      :style="{
        left: `${(flake * 37) % 100}%`,
        animationDelay: `${(flake % 12) * 0.6}s`,
        animationDuration: `${10 + (flake % 8) * 1.4}s`,
        opacity: 0.4 + (flake % 6) * 0.1,
        transform: `scale(${0.6 + (flake % 5) * 0.12})`,
      }"
    ></span>
  </div>
</template>

<style scoped>
.snowflake {
  position: absolute;
  top: -10%;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #ffffff, rgba(255, 255, 255, 0.65));
  animation-name: fall, drift;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes fall {
  0% {
    transform: translateY(-10vh);
  }
  100% {
    transform: translateY(110vh);
  }
}

@keyframes drift {
  0%,
  100% {
    margin-left: -10px;
  }
  50% {
    margin-left: 12px;
  }
}
</style>
