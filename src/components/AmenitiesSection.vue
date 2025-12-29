<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const amenities = computed(() => {
  const items = tm('amenities')
  return Array.isArray(items) ? items : []
})
</script>

<template>
  <section class="mt-14 space-y-6" id="amenities">
    <div class="max-w-3xl space-y-2">
      <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
        {{ t('amenitiesSection.label') }}
      </p>
      <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
        {{ t('amenitiesSection.title') }}
      </h2>
      <p class="text-base text-clay-800">
        {{ t('amenitiesSection.description') }}
      </p>
    </div>
    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="item in amenities"
        :key="item.title"
        class="rounded-2xl border border-clay-100/90 bg-white/80 p-6 shadow-sm shadow-clay-950/5 ring-1 ring-transparent transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-clay-100"
      >
        <div
          class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-clay-500/25 to-clay-300/40 text-clay-800"
        >
          <span class="text-xl leading-none">•</span>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-clay-950">
          {{ item.title }}
        </h3>
        <p class="mt-2 text-sm text-clay-800">{{ item.detail }}</p>
      </article>
    </div>
  </section>
</template>
