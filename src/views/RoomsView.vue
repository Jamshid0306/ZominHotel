<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const rooms = computed(() => {
  const items = tm('rooms.list')
  return Array.isArray(items) ? items : []
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 pb-20">
    <section class="mt-10 flex flex-wrap items-start justify-between gap-6">
      <div class="max-w-3xl space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">{{ t('roomsPage.label') }}</p>
        <h1 class="font-display text-4xl font-semibold text-clay-950 sm:text-5xl">
          {{ t('roomsPage.title') }}
        </h1>
        <p class="text-base text-clay-800">
          {{ t('roomsPage.description') }}
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <RouterLink
            :to="{ path: '/', hash: '#booking' }"
            class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {{ t('actions.book') }}
          </RouterLink>
          <RouterLink
            to="/"
            class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-5 py-3 text-sm font-bold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
          >
            {{ t('actions.home') }}
          </RouterLink>
        </div>
      </div>
      <div class="rounded-2xl border border-clay-100/80 bg-white/80 px-4 py-3 shadow-sm shadow-clay-950/5">
        <p class="text-sm font-semibold text-clay-800">{{ t('roomsPage.summaryTitle') }}</p>
        <p class="text-xs text-clay-700">{{ t('roomsPage.summarySubtitle') }}</p>
      </div>
    </section>

    <section class="mt-10 grid gap-5 md:grid-cols-2">
      <article
        v-for="room in rooms"
        :key="room.id"
        class="group rounded-2xl border border-clay-100/90 bg-gradient-to-br from-sand-50 to-sand-100 p-6 shadow-sm shadow-clay-950/5 transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="flex items-center justify-between">
          <span class="rounded-full bg-clay-500/12 px-3 py-1 text-xs font-semibold text-clay-700">
            {{ room.size }}
          </span>
          <span class="text-base font-bold text-clay-950">{{ room.price }}</span>
        </div>
        <h3 class="mt-4 text-xl font-semibold text-clay-950">{{ room.name }}</h3>
        <p class="mt-1 text-sm text-clay-800">{{ room.vibe }}</p>
        <ul class="mt-3 space-y-2 text-sm text-clay-800">
          <li v-for="perk in room.perks" :key="perk" class="flex items-start gap-2">
            <span class="mt-1 h-2 w-2 rounded-full bg-clay-500/70"></span>
            <span>{{ perk }}</span>
          </li>
        </ul>
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <RouterLink
            :to="{ path: '/', hash: '#booking' }"
            class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-sm font-bold text-white shadow-md shadow-clay-950/15 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {{ t('actions.startBooking') }}
          </RouterLink>
          <RouterLink
            to="/"
            class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-sm font-semibold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
          >
            {{ t('actions.home') }}
          </RouterLink>
        </div>
      </article>
    </section>
  </main>
</template>
