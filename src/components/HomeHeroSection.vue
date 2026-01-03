<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const openBookingModal = inject('openBookingModal', () => {})

const slideImageModules = import.meta.glob('../assets/images/slide-images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})

const slideSources = Object.entries(slideImageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, src]) => src)

const heroImageTexts = computed(() => {
  const images = tm('heroImages')
  return Array.isArray(images) ? images : []
})

const heroImages = computed(() =>
  slideSources.map((src, index) => {
    const text = heroImageTexts.value[index] || {}
    return {
      src,
      title: text.title || '',
      caption: text.caption || '',
    }
  })
)

const activeSlide = ref(0)
const slideTimer = ref(null)

const nextSlide = () => {
  const length = heroImages.value.length
  if (!length) return
  activeSlide.value = (activeSlide.value + 1) % length
}

const prevSlide = () => {
  const length = heroImages.value.length
  if (!length) return
  activeSlide.value = (activeSlide.value - 1 + length) % length
}

const goToSlide = (index) => {
  activeSlide.value = index
}

const stopAutoplay = () => {
  if (slideTimer.value) {
    clearInterval(slideTimer.value)
    slideTimer.value = null
  }
}

const startAutoplay = () => {
  stopAutoplay()
  slideTimer.value = setInterval(nextSlide, 5200)
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})
</script>

<template>
  <section
    class="relative isolate mt-6 w-screen -ml-[50vw] -mr-[50vw] left-1/2 right-1/2 overflow-hidden rounded-none bg-sand-50"
  >
    <div class="relative h-170 sm:h-190">
      <div
        class="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/45"
      ></div>
      <div class="absolute inset-0">
        <div
          v-for="(image, index) in heroImages"
          :key="image.src"
          class="absolute inset-0 bg-cover bg-center transition duration-700 ease-out"
          :class="activeSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
          :style="{ backgroundImage: `url(${image.src})` }"
        >
          <div
            class="absolute inset-0 bg-linear-to-r from-black/45 via-black/25 to-black/20"
          ></div>
        </div>
      </div>

      <div class="absolute right-4 top-4 z-20 flex flex-col gap-2 sm:flex-row">
        <button
          @click="
            prevSlide();
            startAutoplay();
          "
          class="rounded-full bg-white/85 p-2 text-clay-900 shadow-md shadow-clay-950/10 transition hover:-translate-y-0.5 hover:bg-white"
          :aria-label="t('hero.slider.prev')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="
            nextSlide();
            startAutoplay();
          "
          class="rounded-full bg-white/85 p-2 text-clay-900 shadow-md shadow-clay-950/10 transition hover:-translate-y-0.5 hover:bg-white"
          :aria-label="t('hero.slider.next')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div
        class="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-xs font-semibold text-clay-900 shadow-md shadow-clay-950/10"
      >
        <button
          v-for="(image, index) in heroImages"
          :key="image.title"
          @click="
            goToSlide(index);
            startAutoplay();
          "
          class="h-2.5 w-2.5 rounded-full transition"
          :class="activeSlide === index ? 'bg-clay-500 w-5' : 'bg-clay-200/80'"
          :aria-label="t('hero.slider.image', { index: index + 1 })"
        ></button>
      </div>
    </div>
  </section>
</template>
