<script setup>
import { inject, ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { API_BASE_URL } from '../api'

const { t } = useI18n()
const openBookingModal = inject('openBookingModal', () => {})

const roomsCount = ref(0)

const summaryTitle = computed(() =>
  t('roomsPage.summaryTitle', { count: roomsCount.value })
)

const fetchRoomsCount = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/hotel-rooms`)
    if (!res.ok) return
    const data = await res.json()
    roomsCount.value = Array.isArray(data) ? data.length : 0
  } catch (error) {
    roomsCount.value = 0
  }
}

onMounted(() => {
  fetchRoomsCount()
})
</script>

<template>
  <section class="mt-10 flex flex-wrap items-start justify-between gap-6">
    <div class="max-w-3xl space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
        {{ t('roomsPage.label') }}
      </p>
      <h1 class="font-display text-4xl font-semibold text-clay-950 sm:text-5xl">
        {{ t('roomsPage.title') }}
      </h1>
      <p class="text-base text-clay-800">
        {{ t('roomsPage.description') }}
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
          @click="openBookingModal"
        >
          {{ t('actions.book') }}
        </button>
        <RouterLink
          to="/"
          class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-5 py-3 text-sm font-bold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
        >
          {{ t('actions.home') }}
        </RouterLink>
      </div>
    </div>
    <div class="rounded-2xl border border-clay-100/80 bg-white/80 px-4 py-3 shadow-sm shadow-clay-950/5">
      <p class="text-sm font-semibold text-clay-800">{{ summaryTitle }}</p>
      <p class="text-xs text-clay-700">{{ t('roomsPage.summarySubtitle') }}</p>
    </div>
  </section>
</template>
