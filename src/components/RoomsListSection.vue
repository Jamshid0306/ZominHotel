<script setup>
import { ref, computed, onMounted, inject, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { buildHotelRoomsUrl, withBaseUrl } from '../api'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { t, locale } = useI18n()
const openBookingModal = inject('openBookingModal', () => {})

const rooms = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const swiperModules = [Autoplay, Navigation, Pagination]
const isLightboxOpen = ref(false)
const lightboxImages = ref([])
const lightboxTitle = ref('')
const lightboxStartIndex = ref(0)

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

const fetchRooms = async () => {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(buildHotelRoomsUrl())
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

const openLightbox = (room, index) => {
  lightboxImages.value = Array.isArray(room.room_images) ? room.room_images : []
  lightboxTitle.value = getRoomName(room)
  lightboxStartIndex.value = index
  isLightboxOpen.value = true
}

const closeLightbox = () => {
  isLightboxOpen.value = false
}

const onLightboxKeydown = (event) => {
  if (event.key === 'Escape') {
    closeLightbox()
  }
}

watch(isLightboxOpen, (open) => {
  if (open) {
    document.addEventListener('keydown', onLightboxKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onLightboxKeydown)
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  fetchRooms()
})
</script>

<template>
  <section class="mt-10 grid gap-5 md:grid-cols-2">
    <p v-if="isLoading" class="text-sm text-clay-700">{{ t('common.loading') }}</p>
    <p v-else-if="errorMessage" class="text-sm text-red-600">
      {{ errorMessage }}
    </p>
    <article
      v-for="room in rooms"
      :key="room.id"
      class="group rounded-lg border border-clay-100/90 bg-gradient-to-br from-sand-50 to-sand-100 p-6 shadow-sm shadow-clay-950/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        v-if="room.room_images?.length"
        class="mb-4 overflow-hidden rounded-lg border border-clay-100/80 bg-white/80"
      >
        <div class="relative">
          <Swiper
            class="h-44"
            :modules="swiperModules"
            :slides-per-view="1"
            :loop="true"
            :autoplay="{ delay: 3500, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            :navigation="{
              prevEl: `.rooms-swiper-prev-${room.id}`,
              nextEl: `.rooms-swiper-next-${room.id}`,
            }"
            :style="{
              '--swiper-pagination-color': '#8C6B4B',
              '--swiper-pagination-bullet-inactive-color': '#E6D9CA',
              '--swiper-pagination-bullet-inactive-opacity': '1',
              '--swiper-pagination-bullet-size': '7px',
              '--swiper-pagination-bullet-horizontal-gap': '6px',
            }"
          >
            <SwiperSlide v-for="(image, index) in room.room_images" :key="image">
              <img
                :src="withBaseUrl(image)"
                :alt="getRoomName(room)"
                class="h-44 w-full cursor-zoom-in object-cover"
                @click="openLightbox(room, index)"
              />
            </SwiperSlide>
          </Swiper>
          <button
            type="button"
            :class="`rooms-swiper-prev-${room.id}`"
            class="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-clay-200/80 bg-white/90 p-2 text-clay-800 shadow-md shadow-clay-950/10 transition hover:-translate-y-1/2 hover:bg-white"
            :aria-label="t('hero.slider.prev')"
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
            :class="`rooms-swiper-next-${room.id}`"
            class="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-clay-200/80 bg-white/90 p-2 text-clay-800 shadow-md shadow-clay-950/10 transition hover:-translate-y-1/2 hover:bg-white"
            :aria-label="t('hero.slider.next')"
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
      <h3 class="mt-4 text-xl font-semibold text-clay-950">{{ getRoomName(room) }}</h3>
      <p class="mt-1 text-sm text-clay-800">{{ getRoomDescription(room) }}</p>
      <div class="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-sm font-bold text-white shadow-md shadow-clay-950/15 transition hover:-translate-y-0.5 hover:shadow-lg"
          @click="openBookingModal"
        >
          {{ t('actions.startBooking') }}
        </button>
        <RouterLink
          to="/"
          class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-sm font-semibold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
        >
          {{ t('actions.home') }}
        </RouterLink>
      </div>
    </article>
  </section>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isLightboxOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="lightboxTitle"
      >
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
          @click="closeLightbox"
        ></div>
        <div
          class="relative z-10 w-full max-w-5xl overflow-hidden rounded-xl border border-white/20 bg-black/90 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        >
          <div class="flex items-center justify-between px-5 py-4 text-white">
            <p class="text-sm font-semibold">{{ lightboxTitle }}</p>
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
              @click="closeLightbox"
              aria-label="Close"
            >
              <span class="text-lg leading-none">×</span>
            </button>
          </div>
          <Swiper
            class="h-[60vh] sm:h-[70vh]"
            :modules="swiperModules"
            :slides-per-view="1"
            :loop="true"
            :initial-slide="lightboxStartIndex"
            :pagination="{ clickable: true }"
            :navigation="{
              prevEl: '.rooms-lightbox-prev',
              nextEl: '.rooms-lightbox-next',
            }"
            :style="{
              '--swiper-pagination-color': '#E8D9C8',
              '--swiper-pagination-bullet-inactive-color': '#6B5A49',
              '--swiper-pagination-bullet-inactive-opacity': '1',
              '--swiper-pagination-bullet-size': '8px',
              '--swiper-pagination-bullet-horizontal-gap': '6px',
            }"
          >
            <SwiperSlide v-for="image in lightboxImages" :key="image">
              <img
                :src="withBaseUrl(image)"
                :alt="lightboxTitle"
                class="h-full w-full object-contain"
              />
            </SwiperSlide>
          </Swiper>
          <button
            type="button"
            class="rooms-lightbox-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
            class="rooms-lightbox-next absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
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
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
