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
  <section class="mt-10 grid gap-5 md:grid-cols-2">
    <p v-if="isLoading" class="text-sm text-clay-700">{{ t('common.loading') }}</p>
    <p v-else-if="errorMessage" class="text-sm text-red-600">
      {{ errorMessage }}
    </p>
    <article
      v-for="room in rooms"
      :key="room.id"
      class="group rounded-2xl border border-clay-100/90 bg-gradient-to-br from-sand-50 to-sand-100 p-6 shadow-sm shadow-clay-950/5 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        v-if="room.room_images?.length"
        class="mb-4 overflow-hidden rounded-2xl border border-clay-100/80 bg-white/80"
      >
        <img
          :src="withBaseUrl(room.room_images[0])"
          :alt="getRoomName(room)"
          class="h-44 w-full object-cover"
        />
      </div>
      <div class="flex items-center justify-between">
        <span class="rounded-full bg-clay-500/12 px-3 py-1 text-xs font-semibold text-clay-700">
          {{ room.room_type }}
        </span>
        <span class="text-base font-bold text-clay-950">${{ room.price }}</span>
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
</template>
