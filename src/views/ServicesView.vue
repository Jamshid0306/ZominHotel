<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const services = computed(() => {
  const items = tm('amenities')
  return Array.isArray(items) ? items : []
})
</script>

<template>
  <main class="mx-auto max-w-7xl px-4 pb-20">
    <section class="mt-10 flex flex-wrap items-start justify-between gap-6">
      <div class="max-w-3xl space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
          {{ t('servicesPage.label') }}
        </p>
        <h1 class="font-display text-4xl font-semibold text-clay-950 sm:text-5xl">
          {{ t('servicesPage.title') }}
        </h1>
        <p class="text-base text-clay-800">
          {{ t('servicesPage.description') }}
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <RouterLink
            :to="{ path: '/', hash: '#booking' }"
            class="inline-flex items-center justify-center rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
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
        <p class="text-sm font-semibold text-clay-800">
          {{ t('servicesPage.summaryTitle', { count: services.length }) }}
        </p>
        <p class="text-xs text-clay-700">{{ t('servicesPage.summarySubtitle') }}</p>
      </div>
    </section>

    <section class="mt-10 grid gap-8">
      <article
        v-for="(service, index) in services"
        :key="service.title"
        class="grid items-center gap-8 rounded-3xl border border-clay-100/60 p-8 md:grid-cols-2 md:gap-12 md:p-12"
      >
        <div
          v-if="service.image"
          class="relative overflow-hidden rounded-2xl bg-sand-50"
          :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'"
        >
          <img
            :src="service.image"
            :alt="service.imageAlt || service.title"
            class="h-80 w-full scale-[1.08] object-cover md:h-105"
            :class="index % 2 === 0 ? '-translate-x-1' : 'translate-x-1'"
            loading="lazy"
          />
          <div
            class="pointer-events-none absolute inset-y-0 w-52 blur-[1px]"
            :class="
              index % 2 === 0
                ? '-left-0.5 bg-linear-to-r from-sand-200 via-sand-200/80 to-transparent'
                : '-right-0.5 bg-linear-to-l from-sand-200 via-sand-200/80 to-transparent'
            "
          ></div>
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl"
            :class="
              index % 2 === 0
                ? 'bg-linear-to-r from-sand-200/35 via-transparent to-transparent'
                : 'bg-linear-to-l from-sand-200/35 via-transparent to-transparent'
            "
          ></div>
        </div>
        <div :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'">
          <h3 class="text-2xl font-semibold text-clay-950 sm:text-3xl">
            {{ service.title }}
          </h3>
          <p class="mt-3 text-base text-clay-800 sm:text-lg">
            {{ service.detail }}
          </p>
        </div>
      </article>
    </section>
  </main>
</template>
