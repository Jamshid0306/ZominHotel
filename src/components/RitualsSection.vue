<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const rituals = computed(() => {
  const items = tm('rituals')
  return Array.isArray(items) ? items : []
})
</script>

<template>
  <section class="mt-14 space-y-6" id="contact">
    <div
      class="grid gap-6 rounded-3xl border border-clay-100/90 bg-white/80 p-8 shadow-[0_14px_50px_rgba(31,18,12,0.12)] lg:grid-cols-2"
    >
      <div class="space-y-4">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
          {{ t('ritualsSection.label') }}
        </p>
        <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
          {{ t('ritualsSection.title') }}
        </h2>
        <p class="text-base text-clay-800">
          {{ t('ritualsSection.description') }}
        </p>
        <div class="flex flex-wrap items-center gap-3 text-sm font-semibold text-clay-800">
          <span>{{ t('common.phoneLabel') }}</span>
          <a class="rounded-full bg-clay-500/12 px-3 py-1 hover:bg-clay-500/18" href="tel:+998702289999"
            >+998 70 228 99 99</a
          >
          <span class="text-clay-700">•</span>
          <span>{{ t('common.emailLabel') }}</span>
          <a
            class="rounded-full bg-clay-500/12 px-3 py-1 hover:bg-clay-500/18"
            href="mailto:zafaronpremiumhotel@gmail.com"
            >zafaronpremiumhotel@gmail.com</a
          >
          <span class="text-clay-700">•</span>
          <span>{{ t('location.label') }}</span>
          <span class="rounded-full bg-clay-500/12 px-3 py-1">
            {{ t('location.address') }}
          </span>
        </div>
      </div>
      <div class="grid gap-3">
        <div
          v-for="ritual in rituals"
          :key="ritual.title"
          class="rounded-2xl border border-clay-100/90 bg-sand-50/70 p-5 shadow-sm shadow-clay-950/5"
        >
          <h4 class="text-base font-semibold text-clay-950">
            {{ ritual.title }}
          </h4>
          <p class="mt-1 text-sm text-clay-800">{{ ritual.detail }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
