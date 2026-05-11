<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import image from "@/assets/images/about-images/1.jpg"
import alcarteImage from "@/assets/images/services/alcarte.jpg"
import teaImage from "@/assets/images/product-images/chay.jpg"
import saffronImage from "@/assets/images/product-images/shafran.jpg"
const { t, tm } = useI18n()

const galleryUrls = [
  image,
  alcarteImage,
  teaImage,
  saffronImage,
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
  <section class="mt-20">
    <div class="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
      <div class="relative overflow-hidden rounded-[1.5rem] bg-pine-900 p-7 text-white shadow-2xl shadow-clay-950/18">
        <div class="absolute inset-0 bg-linear-to-br from-pine-700/92 via-pine-900 to-clay-950"></div>
        <div class="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-gold-500/25"></div>
        <div class="absolute -bottom-20 left-8 h-52 w-52 rounded-full border border-white/10"></div>
        <div class="relative space-y-5">
          <p class="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sand-100 backdrop-blur">
            {{ t('aboutNetwork.label') }}
          </p>
          <h2 class="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {{ t('aboutNetwork.title') }}
          </h2>
          <p class="text-base leading-8 text-sand-100/88">
            {{ t('aboutNetwork.description') }}
          </p>
          <div class="flex flex-wrap gap-3 pt-2">
            <span class="rounded-full bg-white px-4 py-2 text-xs font-bold text-pine-900">
              {{ t('aboutNetwork.advantages.badge') }}
            </span>
            <span class="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white">
              {{ t('aboutNetwork.hotelCapacity') }}
            </span>
          </div>
          <RouterLink
            to="/rooms"
            class="inline-flex items-center justify-center rounded-full bg-linear-to-r from-gold-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {{ t('actions.viewRooms') }}
          </RouterLink>
        </div>
      </div>
      <div class="grid grid-cols-6 gap-3">
        <div
          v-for="(image, index) in gallery"
          :key="image.src"
          class="group relative overflow-hidden border border-white bg-sand-50 shadow-lg shadow-clay-950/10"
          :class="[
            index === 0 ? 'col-span-6 h-72 sm:col-span-3 sm:h-96' : '',
            index === 1 ? 'col-span-3 h-44 sm:h-52' : '',
            index === 2 ? 'col-span-3 h-44 translate-y-8 sm:h-52' : '',
            index === 3 ? 'col-span-6 h-40 sm:col-span-3 sm:h-48' : '',
          ]"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-linear-to-t from-pine-900/45 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>

    <div class="mt-20">
        <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-pine-700">
            {{ t('aboutNetwork.advantages.label') }}
          </p>
          <h3 class="mt-2 font-display text-2xl font-semibold text-clay-950 sm:text-3xl">
            {{ t('aboutNetwork.advantages.title') }}
          </h3>
        </div>
        <span class="rounded-full border border-clay-200 bg-white px-4 py-2 text-xs font-semibold text-clay-700 shadow-lg shadow-clay-950/5">
          {{ t('aboutNetwork.advantages.badge') }}
        </span>
      </div>
      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <article
          v-for="item in advantages"
          :key="item.title"
          class="rounded-2xl border border-clay-100/70 bg-white/85 p-6 shadow-xl shadow-clay-950/10 transition hover:-translate-y-1 hover:border-clay-200 hover:shadow-2xl"
        >
          <div class="mb-5 h-1 w-12 rounded-full bg-clay-500"></div>
          <h4 class="text-lg font-semibold text-clay-900">
            {{ item.title }}
          </h4>
          <p class="mt-2 text-sm text-clay-800">{{ item.text }}</p>
        </article>
      </div>
    </div>

    <div class="mt-16 rounded-[1.75rem] border border-clay-100/80 bg-linear-to-br from-white via-sand-50 to-sand-100 p-6 shadow-2xl shadow-clay-950/10 sm:p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
        {{ t('aboutNetwork.hospitality.label') }}
      </p>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <div
          v-for="item in hospitality"
          :key="item.title"
          class="rounded-2xl border border-clay-100 bg-white/80 p-5 shadow-lg shadow-clay-950/5"
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
            class="rounded-2xl border border-clay-100/80 bg-white/90 p-5 shadow-lg shadow-clay-950/5"
          >
            <h4 class="text-base font-semibold text-clay-900">
              {{ item.title }}
            </h4>
            <p class="mt-2 text-sm text-clay-800">{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-[1.5rem] border border-clay-100/80 bg-white/85 p-6 shadow-xl shadow-clay-950/10">
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
            class="rounded-2xl border border-clay-100/80 bg-sand-50/90 p-4 shadow-sm shadow-clay-950/5"
          >
            <h4 class="text-sm font-semibold text-clay-900">
              {{ item.title }}
            </h4>
            <p class="mt-2 text-sm text-clay-800">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12 rounded-[1.75rem] border border-clay-100/80 bg-white/90 p-6 shadow-2xl shadow-clay-950/10 sm:p-8">
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
          class="rounded-2xl border border-clay-100/80 bg-sand-50/80 p-5 shadow-lg shadow-clay-950/5"
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
