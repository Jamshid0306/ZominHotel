<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const amenities = computed(() => {
  const items = tm('amenities')
  return Array.isArray(items) ? items : []
})

const featuredAmenity = computed(() => amenities.value.slice(0, 1))
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
    <div class="grid gap-8">
      <article
        v-for="(item, index) in featuredAmenity"
        :key="item.title"
        class="grid items-center gap-6 rounded-xl border border-clay-100/90 bg-white/80 p-6 shadow-sm shadow-clay-950/5 ring-1 ring-transparent transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-clay-100 md:grid-cols-2 md:gap-10 md:p-8"
      >
        <div
          v-if="item.image"
          class="overflow-hidden rounded-lg shadow-lg shadow-clay-950/10"
          :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'"
        >
          <img
            :src="item.image"
            :alt="item.imageAlt || item.title"
            class="h-56 w-full object-cover md:h-72"
            loading="lazy"
          />
        </div>
        <div :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-clay-500/25 to-clay-300/40 text-clay-800"
          >
            <span class="text-2xl leading-none">•</span>
          </div>
          <h3 class="mt-5 text-2xl font-semibold text-clay-950 sm:text-3xl">
            {{ item.title }}
          </h3>
          <p class="mt-3 text-base text-clay-800 sm:text-lg">{{ item.detail }}</p>
        </div>
      </article>
    </div>
    <div class="pt-2">
      <RouterLink
        to="/services"
        class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-clay-700 transition hover:text-clay-950"
      >
        {{ t('actions.viewAll') }}
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </section>
</template>
