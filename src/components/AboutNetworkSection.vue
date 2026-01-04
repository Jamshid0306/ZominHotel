<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import image from "@/assets/images/about-images/1.jpg"
const { t, tm } = useI18n()

const galleryUrls = [
  image
]

const gallery = computed(() => {
  const items = tm('aboutNetwork.gallery')
  const localized = Array.isArray(items) ? items : []
  return galleryUrls.map((src, index) => ({
    src,
    alt: localized[index]?.alt || '',
  }))
})

const advantages = computed(() => {
  const items = tm('aboutNetwork.advantages.items')
  return Array.isArray(items) ? items : []
})

const hospitality = computed(() => {
  const items = tm('aboutNetwork.hospitality.items')
  return Array.isArray(items) ? items : []
})

const services = computed(() => {
  const items = tm('aboutNetwork.services.items')
  return Array.isArray(items) ? items : []
})

const partnership = computed(() => {
  const items = tm('aboutNetwork.partnership.items')
  return Array.isArray(items) ? items : []
})

const hotelBlocks = computed(() => {
  const items = tm('aboutNetwork.hotelBlocks')
  return Array.isArray(items) ? items : []
})
</script>

<template>
  <section class="mt-16">
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="space-y-4">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
          {{ t('aboutNetwork.label') }}
        </p>
        <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
          {{ t('aboutNetwork.title') }}
        </h2>
        <p class="text-base text-clay-800">
          {{ t('aboutNetwork.description') }}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(image, index) in gallery"
          :key="image.src"
          class="group relative overflow-hidden rounded-2xl border border-clay-100/70 bg-sand-50 shadow-sm shadow-clay-950/5"
          :class="index === 0 ? 'col-span-2 h-48 sm:h-56' : 'h-44 sm:h-48'"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>

    <div class="mt-12">
        <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
            {{ t('aboutNetwork.advantages.label') }}
          </p>
          <h3 class="mt-2 font-display text-2xl font-semibold text-clay-950 sm:text-3xl">
            {{ t('aboutNetwork.advantages.title') }}
          </h3>
        </div>
        <span class="rounded-full bg-clay-500/10 px-4 py-2 text-xs font-semibold text-clay-700">
          {{ t('aboutNetwork.advantages.badge') }}
        </span>
      </div>
      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <article
          v-for="item in advantages"
          :key="item.title"
          class="rounded-2xl border border-clay-100/70 bg-white/80 p-5 shadow-sm shadow-clay-950/5"
        >
          <h4 class="text-lg font-semibold text-clay-900">
            {{ item.title }}
          </h4>
          <p class="mt-2 text-sm text-clay-800">{{ item.text }}</p>
        </article>
      </div>
    </div>

    <div class="mt-12 rounded-3xl border border-clay-100/80 bg-linear-to-br from-sand-50 via-white to-sand-100 p-6 sm:p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
        {{ t('aboutNetwork.hospitality.label') }}
      </p>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <div
          v-for="item in hospitality"
          :key="item.title"
          class="rounded-2xl border border-white/80 bg-white/70 p-5 shadow-sm shadow-clay-950/5"
        >
          <h4 class="text-base font-semibold text-clay-900">
            {{ item.title }}
          </h4>
          <p class="mt-2 text-sm text-clay-800">{{ item.text }}</p>
        </div>
      </div>
      <div class="mt-6 flex flex-wrap justify-end">
        <RouterLink
          to="/restaurants"
          class="inline-flex items-center justify-center rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          {{ t('actions.viewRestaurants') }}
        </RouterLink>
      </div>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="space-y-4">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
          {{ t('aboutNetwork.services.label') }}
        </p>
        <h3 class="font-display text-2xl font-semibold text-clay-950 sm:text-3xl">
          {{ t('aboutNetwork.services.title') }}
        </h3>
        <div class="grid gap-4">
          <div
            v-for="item in services"
            :key="item.title"
            class="rounded-2xl border border-clay-100/80 bg-white/90 p-5 shadow-sm shadow-clay-950/5"
          >
            <h4 class="text-base font-semibold text-clay-900">
              {{ item.title }}
            </h4>
            <p class="mt-2 text-sm text-clay-800">{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-3xl border border-clay-100/80 bg-white/85 p-6 shadow-sm shadow-clay-950/5">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
          {{ t('aboutNetwork.partnership.label') }}
        </p>
        <h3 class="mt-2 font-display text-2xl font-semibold text-clay-950">
          {{ t('aboutNetwork.partnership.title') }}
        </h3>
        <div class="mt-4 space-y-4">
          <div
            v-for="item in partnership"
            :key="item.title"
            class="rounded-2xl border border-clay-100/80 bg-sand-50/90 p-4"
          >
            <h4 class="text-sm font-semibold text-clay-900">
              {{ item.title }}
            </h4>
            <p class="mt-2 text-sm text-clay-800">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 rounded-3xl border border-clay-100/80 bg-white/90 p-6 shadow-sm shadow-clay-950/5 sm:p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
        {{ t('aboutNetwork.hotelLabel') }}
      </p>
      <h3 class="mt-2 font-display text-2xl font-semibold text-clay-950 sm:text-3xl">
        {{ t('aboutNetwork.hotelTitle') }}
      </h3>
      <p class="mt-3 text-base text-clay-800">
        {{ t('aboutNetwork.hotelDescription') }}
      </p>
      <p class="mt-3 text-sm font-semibold text-clay-800">
        {{ t('aboutNetwork.hotelCapacity') }}
      </p>

      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <article
          v-for="block in hotelBlocks"
          :key="block.title"
          class="rounded-2xl border border-clay-100/80 bg-sand-50/80 p-5 shadow-sm shadow-clay-950/5"
        >
          <h4 class="text-lg font-semibold text-clay-900">
            {{ block.title }}
          </h4>
          <ul class="mt-3 space-y-2 text-sm text-clay-800">
            <li v-for="item in block.items" :key="item" class="flex gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-clay-500"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
