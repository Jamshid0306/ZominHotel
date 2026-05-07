<script setup>
import { ref, computed, onMounted, onBeforeUnmount, inject } from 'vue'
import { RouterLink } from 'vue-router'
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
  <section class="relative mt-10 overflow-visible">
    <div class="grid min-h-[650px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="relative order-2 min-h-[520px] lg:order-1">
        <div class="absolute left-0 top-10 h-[78%] w-[86%] overflow-hidden rounded-[2rem] bg-sand-100 shadow-2xl shadow-clay-950/20">
          <div
            v-for="(image, index) in heroImages"
            :key="image.src"
            class="absolute inset-0 bg-cover bg-center transition duration-700 ease-out"
            :class="activeSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
            :style="{ backgroundImage: `url(${image.src})` }"
          >
            <div class="absolute inset-0 bg-linear-to-t from-clay-950/35 via-transparent to-transparent"></div>
          </div>
        </div>

        <div class="absolute bottom-8 right-0 w-[62%] rounded-3xl border border-white/80 bg-white/90 p-4 shadow-2xl shadow-clay-950/15 backdrop-blur">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-500">
            {{ t('hero.badge') }}
          </p>
          <h2 class="mt-3 text-lg font-semibold text-clay-950">
            {{ heroImages[activeSlide]?.title }}
          </h2>
          <p class="mt-1 text-sm text-clay-700">
            {{ heroImages[activeSlide]?.caption }}
          </p>
          <div class="mt-4 flex items-center gap-2">
            <button
              v-for="(image, index) in heroImages"
              :key="image.title"
              @click="
                goToSlide(index);
                startAutoplay();
              "
              class="h-1.5 flex-1 rounded-full bg-clay-100 transition"
              :class="activeSlide === index ? 'bg-clay-500' : ''"
              :aria-label="t('hero.slider.image', { index: index + 1 })"
            ></button>
          </div>
        </div>

        <div class="absolute left-8 top-0 rounded-3xl bg-white px-5 py-4 shadow-xl shadow-clay-950/10">
          <p class="text-3xl font-semibold text-clay-950">4.9</p>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-clay-500">
            {{ t('hero.stats.rating') }}
          </p>
        </div>
      </div>

      <div class="order-1 flex flex-col justify-center py-8 lg:order-2">
        <p class="w-fit rounded-full border border-clay-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-clay-600 shadow-lg shadow-clay-950/5">
          {{ t('hero.tagline') }}
        </p>
        <h1 class="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[1.02] text-clay-950 sm:text-6xl lg:text-7xl">
          {{ t('hero.title') }}
        </h1>
        <p class="mt-6 max-w-2xl text-base leading-8 text-clay-800 sm:text-lg">
          {{ t('hero.description') }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            class="rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-2xl"
            @click="openBookingModal"
          >
            {{ t('actions.book') }}
          </button>
          <RouterLink
            to="/rooms"
            class="rounded-full border border-clay-200 bg-white/80 px-6 py-3 text-sm font-bold text-clay-800 shadow-lg shadow-clay-950/5 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white"
          >
            {{ t('actions.viewRooms') }}
          </RouterLink>
        </div>

        <div class="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
          <div class="rounded-2xl border border-clay-100 bg-white/85 p-5 shadow-xl shadow-clay-950/10">
            <p class="text-2xl font-semibold text-clay-950">24/7</p>
            <p class="mt-1 text-sm text-clay-700">{{ t('hero.stats.concierge') }}</p>
          </div>
          <div class="rounded-2xl border border-clay-100 bg-white/85 p-5 shadow-xl shadow-clay-950/10">
            <p class="text-2xl font-semibold text-clay-950">5+</p>
            <p class="mt-1 text-sm text-clay-700">{{ t('hero.stats.roomTypes') }}</p>
          </div>
          <div class="rounded-2xl border border-clay-100 bg-white/85 p-5 shadow-xl shadow-clay-950/10">
            <p class="text-2xl font-semibold text-clay-950">360</p>
            <p class="mt-1 text-sm text-clay-700">{{ t('tourSection.label') }}</p>
          </div>
        </div>
      </div>

      <div class="absolute right-4 top-4 z-20 flex flex-col gap-2 sm:flex-row">
        <button
          @click="
            prevSlide();
            startAutoplay();
          "
          class="rounded-full bg-white/90 p-2 text-clay-900 shadow-lg shadow-clay-950/10 transition hover:-translate-y-0.5 hover:bg-white"
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
          class="rounded-full bg-white/90 p-2 text-clay-900 shadow-lg shadow-clay-950/10 transition hover:-translate-y-0.5 hover:bg-white"
          :aria-label="t('hero.slider.next')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
