<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { API_BASE_URL, withBaseUrl } from '../api'

const { t, locale } = useI18n()
const openBookingModal = inject('openBookingModal', () => {})

const rooms = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const activeSlides = ref({})

const featuredRooms = computed(() => rooms.value.slice(0, 3))

const getRoomName = (room) => {
  if (locale.value === 'ru') return room.room_name_ru
  if (locale.value === 'en') return room.room_name_en
  return room.room_name_uz
}

const getRoomDescription = (room) => {
  if (locale.value === 'ru') return room.room_description_ru
  if (locale.value === 'en') return room.room_description_en
  return room.room_description_uz
}

const currencyLabel = computed(() => (locale.value === 'uz' ? "so'm" : 'sum'))

const formatPrice = (value) => {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return '-'
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
  return `${formatted} ${currencyLabel.value}`
}

const setActiveSlide = (roomId, index) => {
  activeSlides.value = { ...activeSlides.value, [roomId]: index }
}

const nextSlide = (roomId, length) => {
  const current = activeSlides.value[roomId] || 0
  setActiveSlide(roomId, (current + 1) % length)
}

const prevSlide = (roomId, length) => {
  const current = activeSlides.value[roomId] || 0
  setActiveSlide(roomId, (current - 1 + length) % length)
}

const fetchRooms = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(`${API_BASE_URL}/hotel-rooms`)
    if (!res.ok) {
      throw new Error(t('roomsPage.loadError'))
    }
    rooms.value = await res.json()
  } catch (error) {
    errorMessage.value = error?.message || t('roomsPage.loadError')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchRooms()
})
</script>

<template>
  <section class="mt-14 space-y-6" id="rooms">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
          {{ t('roomsSection.label') }}
        </p>
        <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
          {{ t('roomsSection.title') }}
        </h2>
        <p class="text-base text-clay-800">
          {{ t('roomsSection.description') }}
        </p>
      </div>
      <RouterLink
        to="/rooms"
        class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-sm font-bold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
      >
        {{ t('actions.viewAll') }}
      </RouterLink>
    </div>
    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <p v-if="isLoading" class="text-sm text-clay-700">{{ t('common.loading') }}</p>
      <p v-else-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>
      <article
        v-for="room in featuredRooms"
        :key="room.id"
        class="group rounded-2xl border border-clay-100/90 bg-gradient-to-br from-sand-50 to-sand-100 p-6 shadow-sm shadow-clay-950/5 transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div
          v-if="room.room_images?.length"
          class="relative mb-4 overflow-hidden rounded-2xl border border-clay-100/80 bg-white/80"
        >
          <div
            class="flex transition-transform duration-500"
            :style="{
              width: `${room.room_images.length * 100}%`,
              transform: `translateX(-${
                (activeSlides[room.id] || 0) * (100 / room.room_images.length)
              }%)`,
            }"
          >
            <div
              v-for="image in room.room_images"
              :key="image"
              class="w-full shrink-0"
              :style="{ width: `${100 / room.room_images.length}%` }"
            >
              <img
                :src="withBaseUrl(image)"
                :alt="getRoomName(room)"
                class="h-44 w-full object-cover"
              />
            </div>
          </div>
          <button
            type="button"
            class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-clay-900 shadow-md shadow-clay-950/10 transition hover:-translate-y-1/2 hover:bg-white"
            :aria-label="t('hero.slider.prev')"
            @click="prevSlide(room.id, room.room_images.length)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-clay-900 shadow-md shadow-clay-950/10 transition hover:-translate-y-1/2 hover:bg-white"
            :aria-label="t('hero.slider.next')"
            @click="nextSlide(room.id, room.room_images.length)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div
            class="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-clay-700"
          >
            {{ (activeSlides[room.id] || 0) + 1 }} / {{ room.room_images.length }}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="rounded-full bg-clay-500/12 px-3 py-1 text-xs font-semibold text-clay-700">
            {{ room.room_type }}
          </span>
          <span class="text-xs font-semibold text-clay-600">Pricing</span>
        </div>
        <div class="mt-2 space-y-1 text-sm text-clay-800">
          <div class="flex items-center justify-between">
            <span>Weekday Price</span>
            <span class="font-semibold text-clay-950">{{ formatPrice(room.price_weekday) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Weekend Price</span>
            <span class="font-semibold text-clay-950">{{ formatPrice(room.price_weekend) }}</span>
          </div>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-clay-950">
          {{ getRoomName(room) }}
        </h3>
        <p class="mt-1 text-sm text-clay-800">{{ getRoomDescription(room) }}</p>
        <div class="mt-4">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-sm font-semibold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
            @click="openBookingModal"
          >
            {{ t('actions.startBooking') }}
          </button>
        </div>
      </article>
    </div>
  </section>
</template>
