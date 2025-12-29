<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="mt-14">
    <div
      class="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-clay-100/90 bg-gradient-to-br from-clay-500/15 via-sand-100 to-sand-50 p-8 shadow-[0_14px_50px_rgba(31,18,12,0.1)]"
    >
      <div class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
          {{ t('cta.label') }}
        </p>
        <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
          {{ t('cta.title') }}
        </h2>
        <p class="max-w-2xl text-base text-clay-800">
          {{ t('cta.description') }}
        </p>
        <div class="flex flex-wrap items-center gap-3 text-sm font-semibold text-clay-800">
          <span>{{ t('location.label') }}</span>
          <span class="rounded-full bg-clay-500/12 px-3 py-1">
            {{ t('location.address') }}
          </span>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <a
          class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
          href="#booking"
          >{{ t('actions.book') }}</a
        >
        <a
          class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-5 py-3 text-sm font-bold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
          href="mailto:zafaronpremiumhotel@gmail.com"
          >{{ t('actions.ask') }}</a
        >
      </div>
    </div>
  </section>
</template>
