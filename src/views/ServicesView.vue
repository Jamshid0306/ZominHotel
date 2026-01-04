<script setup>
import { computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const { t, tm, locale } = useI18n()
const openBookingModal = inject('openBookingModal', () => {})

const services = computed(() => {
  const items = tm('amenities')
  return Array.isArray(items) ? items : []
})

const products = computed(() => {
  const items = tm('productsSection.items')
  return Array.isArray(items) ? items : []
})

const swiperModules = [Autoplay, Navigation, Pagination]

const getImageSrc = (image) => (typeof image === 'string' ? image : image?.src || '')
const getImageAlt = (image, fallback) =>
  typeof image === 'string' ? fallback : image?.alt || fallback

const onServiceSwiper = (swiper) => {
  requestAnimationFrame(() => swiper.update())
}

const onServiceImagesReady = (swiper) => {
  swiper.update()
}

const productName = (product) => {
  if (!product) {
    return ''
  }

  switch (locale.value) {
    case 'ru':
      return product.nameRu || product.nameEn || product.nameUz || ''
    case 'en':
      return product.nameEn || product.nameUz || product.nameRu || ''
    default:
      return product.nameUz || product.nameEn || product.nameRu || ''
  }
}

const localeLabel = computed(() => locale.value.toUpperCase())
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
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
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
          v-if="service.images && service.images.length"
          class="relative overflow-hidden rounded-2xl bg-sand-50"
          :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'"
        >
          <Swiper
            class="h-full"
            :modules="swiperModules"
            :slides-per-view="1"
            :loop="true"
            :observer="true"
            :observe-parents="true"
            :autoplay="{ delay: 3200, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            :navigation="
              index === 0
                ? { prevEl: '.service-swiper-prev', nextEl: '.service-swiper-next' }
                : false
            "
            @swiper="onServiceSwiper"
            @imagesReady="onServiceImagesReady"
            :style="{
              '--swiper-pagination-color': '#8C6B4B',
              '--swiper-pagination-bullet-inactive-color': '#E6D9CA',
              '--swiper-pagination-bullet-inactive-opacity': '1',
              '--swiper-pagination-bullet-size': '8px',
              '--swiper-pagination-bullet-horizontal-gap': '6px',
            }"
          >
            <SwiperSlide v-for="(image, imageIndex) in service.images" :key="imageIndex">
              <div class="relative h-80 w-full md:h-105">
                <img
                  :src="getImageSrc(image)"
                  :alt="getImageAlt(image, service.imageAlt || service.title)"
                  class="h-full w-full object-cover"
                  :class="index % 2 === 0 ? '-translate-x-1' : 'translate-x-1'"
                  loading="lazy"
                />
                <div
                  class="pointer-events-none absolute inset-y-0 w-52 blur-[1px]"

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
            </SwiperSlide>
          </Swiper>
          <div
            v-if="index === 0"
            class="pointer-events-none absolute inset-x-6 bottom-5 flex items-center justify-between"
          >
            <button
              type="button"
              class="service-swiper-prev pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-clay-200/80 bg-white/90 text-clay-700 shadow-lg shadow-clay-950/15 transition hover:-translate-y-0.5 hover:border-clay-300 hover:text-clay-950"
              aria-label="Previous"
            >
              <span class="text-lg leading-none">←</span>
            </button>
            <button
              type="button"
              class="service-swiper-next pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-clay-600 to-clay-400 text-white shadow-xl shadow-clay-950/30 transition hover:-translate-y-0.5"
              aria-label="Next"
            >
              <span class="text-lg leading-none">→</span>
            </button>
          </div>
        </div>
        <div
          v-else-if="service.image"
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

          ></div>
          <div
            class="pointer-events-none absolute inset-0 rounded-2xl"
 
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

    <section class="mt-16 rounded-3xl border border-clay-100/80 bg-sand-50/70 p-8 sm:p-12">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div class="max-w-2xl space-y-3">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
            {{ t('productsSection.label') }}
          </p>
          <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
            {{ t('productsSection.title') }}
          </h2>
          <p class="text-base text-clay-800">
            {{ t('productsSection.description') }}
          </p>
        </div>
      </div>
      <div class="mt-8">
        <div class="flex items-center justify-between gap-3 pb-4">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-500">
            {{ t('productsSection.label') }}
          </p>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="products-swiper-prev inline-flex h-10 w-10 items-center justify-center rounded-full border border-clay-200/80 bg-white text-clay-700 shadow-sm shadow-clay-950/10 transition hover:-translate-y-0.5 hover:border-clay-300 hover:text-clay-950"
              aria-label="Previous"
            >
              <span class="text-lg leading-none">←</span>
            </button>
            <button
              type="button"
              class="products-swiper-next inline-flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-clay-500 to-clay-300 text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              aria-label="Next"
            >
              <span class="text-lg leading-none">→</span>
            </button>
          </div>
        </div>

        <Swiper
          :modules="swiperModules"
          :space-between="24"
          :slides-per-view="1"
          :loop="true"
          :navigation="{
            prevEl: '.products-swiper-prev',
            nextEl: '.products-swiper-next',
          }"
          :autoplay="{ delay: 3500, disableOnInteraction: false }"
          :breakpoints="{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }"
        >
          <SwiperSlide v-for="product in products" :key="product.nameUz">
            <article
              class="overflow-hidden rounded-2xl border border-clay-100/80 bg-white shadow-sm shadow-clay-950/5"
            >
            <div class="relative h-56">
              <img
                :src="product.image"
                :alt="product.imageAlt || product.nameUz"
                class="h-full w-full object-cover"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-linear-to-t from-clay-950/35 via-transparent to-transparent"></div>
            </div>
            <div class="space-y-4 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-500">
                {{ t('productsSection.nameLabel') }}
              </p>
              <div class="flex items-center justify-between border-b border-clay-100/80 pb-2">
                <span class="text-base font-semibold text-clay-950">
                  {{ productName(product) }}
                </span>
              </div>
            </div>
          </article>
        </SwiperSlide>
        </Swiper>
      </div>
    </section>
  </main>
</template>
