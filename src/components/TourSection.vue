<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const tourLink = (import.meta.env.VITE_TOUR_LINK || '').trim()
const hasTour = computed(() => tourLink.length > 0)
</script>

<template>
  <section v-if="hasTour" class="mt-16">
    <div
      class="grid gap-6 rounded-xl border border-clay-100/70 bg-white/90 p-6 shadow-sm shadow-clay-950/5 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div class="flex flex-col justify-between gap-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
            {{ t('tourSection.label') }}
          </p>
          <h3 class="mt-2 font-display text-2xl font-semibold text-clay-950 sm:text-3xl">
            {{ t('tourSection.title') }}
          </h3>
          <p class="mt-3 text-base text-clay-800">
            {{ t('tourSection.description') }}
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <a
            :href="tourLink"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {{ t('tourSection.action') }}
          </a>
          <span class="text-xs font-semibold text-clay-600">
            {{ t('tourSection.note') }}
          </span>
        </div>
      </div>
      <div class="overflow-hidden rounded-lg border border-clay-100/80 bg-sand-50/70 shadow-sm shadow-clay-950/5">
        <div class="aspect-[16/10] w-full">
          <iframe
            :src="tourLink"
            class="h-full w-full"
            style="border: 0"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :title="t('tourSection.iframeTitle')"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>
