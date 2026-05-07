<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { buildHotelRoomsUrl, withBaseUrl } from '../api'
import heroImage from '@/assets/images/about-images/1.jpg'
import restaurantImage from '@/assets/images/services/alcarte.jpg'
import teaImage from '@/assets/images/product-images/chay.jpg'
import saffronImage from '@/assets/images/product-images/shafran.jpg'

const { t, tm, locale } = useI18n()
const openBookingModal = inject('openBookingModal', () => {})

const rooms = ref([])
const isLoadingRooms = ref(false)

const heroCards = computed(() => [
  {
    title: t('hero.stats.concierge'),
    value: '24/7',
  },
  {
    title: t('hero.stats.roomTypes'),
    value: '5+',
  },
  {
    title: t('tourSection.label'),
    value: '360',
  },
])

const advantages = computed(() => {
  const items = tm('aboutNetwork.advantages.items')
  return Array.isArray(items) ? items.slice(0, 3) : []
})

const hospitality = computed(() => {
  const items = tm('aboutNetwork.hospitality.items')
  return Array.isArray(items) ? items.slice(0, 4) : []
})

const featuredRooms = computed(() => rooms.value.slice(0, 2))

const getRoomName = (room) => {
  if (locale.value === 'ru') return room.room_name_ru
  if (locale.value === 'en') return room.room_name_en
  return room.room_name_uz
}

const getRoomDescription = (room) => {
  if (locale.value === 'ru') return room.room_description_ru
  if (locale.value === 'en') return room.room_description_en
  return room.room_description_uz
}

const currencyLabel = computed(() => (locale.value === 'uz' ? "so'm" : 'sum'))

const formatPrice = (value) => {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return '-'
  return `${new Intl.NumberFormat('en-US').format(amount)} ${currencyLabel.value}`
}

const fetchRooms = async () => {
  isLoadingRooms.value = true
  try {
    const res = await fetch(buildHotelRoomsUrl())
    if (!res.ok) return
    const data = await res.json()
    rooms.value = Array.isArray(data) ? data : []
  } finally {
    isLoadingRooms.value = false
  }
}

onMounted(fetchRooms)
</script>

<template>
  <main class="overflow-hidden pb-16">
    <section class="grid grid-cols-1 bg-sand-50 lg:grid-cols-[72px_1fr]">
      <aside class="hidden border-r border-clay-100 bg-white/55 px-4 py-8 lg:flex lg:flex-col lg:items-center lg:justify-between">
        <span class="writing-mode-vertical text-[10px] font-bold uppercase tracking-[0.35em] text-clay-500">
          Zamindor stay
        </span>
        <span class="h-20 w-px bg-clay-200"></span>
      </aside>

      <div class="grid items-center lg:grid-cols-[0.92fr_1.08fr]">
        <div class="flex flex-col justify-between px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div>
            <p class="inline-flex rounded-full border border-clay-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-clay-600 shadow-lg shadow-clay-950/5">
              {{ t('hero.tagline') }}
            </p>
            <h1 class="mt-8 max-w-4xl font-display text-5xl font-bold leading-[0.95] text-clay-950 sm:text-7xl xl:text-8xl">
              {{ t('hero.title') }}
            </h1>
          </div>

          <div class="mt-10 grid gap-8 xl:grid-cols-[1fr_auto]">
            <p class="max-w-xl text-base leading-8 text-clay-800 sm:text-lg">
              {{ t('hero.description') }}
            </p>
            <div class="flex flex-wrap content-start gap-3">
              <button
                type="button"
                class="rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-2xl"
                @click="openBookingModal"
              >
                {{ t('actions.book') }}
              </button>
              <RouterLink
                to="/rooms"
                class="rounded-full border border-clay-200 bg-white px-6 py-3 text-sm font-bold text-clay-800 shadow-lg shadow-clay-950/5 transition hover:-translate-y-0.5 hover:border-clay-300"
              >
                {{ t('actions.viewRooms') }}
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="relative bg-white p-5 sm:p-8 lg:p-10">
          <div class="absolute inset-x-5 top-5 z-10 grid grid-cols-3 gap-2 sm:inset-x-8 sm:top-8">
            <div
              v-for="card in heroCards"
              :key="card.title"
              class="rounded-2xl border border-white/80 bg-white/88 p-4 shadow-xl shadow-clay-950/10 backdrop-blur"
            >
              <p class="text-2xl font-bold text-clay-950">{{ card.value }}</p>
              <p class="mt-1 text-xs font-semibold text-clay-600">{{ card.title }}</p>
            </div>
          </div>

          <div class="grid h-[430px] grid-cols-5 grid-rows-5 gap-3 sm:h-[460px] lg:h-[430px] xl:h-[470px]">
            <div class="col-span-5 row-span-3 overflow-hidden rounded-[2rem] shadow-2xl shadow-clay-950/18 sm:col-span-3 sm:row-span-5">
              <img :src="heroImage" :alt="t('common.logoAlt')" class="h-full w-full object-cover" />
            </div>
            <div class="col-span-3 row-span-2 overflow-hidden rounded-[2rem] shadow-xl shadow-clay-950/12 sm:col-span-2">
              <img :src="restaurantImage" :alt="t('restaurantSection.label')" class="h-full w-full object-cover" />
            </div>
            <div class="col-span-2 row-span-2 overflow-hidden rounded-[2rem] bg-sand-100 p-5 shadow-xl shadow-clay-950/10 sm:col-span-2">
              <p class="text-xs font-bold uppercase tracking-[0.28em] text-clay-500">
                {{ t('aboutNetwork.advantages.badge') }}
              </p>
              <p class="mt-5 font-display text-4xl font-bold leading-none text-clay-950">Zamindor</p>
              <p class="mt-2 text-sm text-clay-700">{{ t('footer.tagline') }}</p>
            </div>
            <div class="col-span-3 row-span-1 overflow-hidden rounded-[2rem] shadow-xl shadow-clay-950/10 sm:col-span-2">
              <img :src="saffronImage" :alt="t('servicesProducts.title')" class="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid border-y border-clay-100 bg-white lg:grid-cols-[0.85fr_1.15fr]">
      <div class="px-5 py-12 sm:px-8 lg:px-16">
        <p class="text-xs font-bold uppercase tracking-[0.28em] text-clay-600">
          {{ t('aboutNetwork.label') }}
        </p>
        <h2 class="mt-4 max-w-xl font-display text-4xl font-bold leading-tight text-clay-950 sm:text-6xl">
          {{ t('aboutNetwork.title') }}
        </h2>
      </div>
      <div class="grid border-t border-clay-100 lg:grid-cols-3 lg:border-l lg:border-t-0">
        <article
          v-for="item in advantages"
          :key="item.title"
          class="border-b border-clay-100 p-6 transition hover:bg-sand-50 lg:border-b-0 lg:border-r last:border-r-0"
        >
          <span class="block h-1 w-10 rounded-full bg-clay-400"></span>
          <h3 class="mt-8 text-lg font-bold text-clay-950">{{ item.title }}</h3>
          <p class="mt-3 text-sm leading-7 text-clay-700">{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="grid gap-6 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12">
      <div class="rounded-[2rem] border border-clay-100 bg-white p-6 shadow-2xl shadow-clay-950/8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.28em] text-clay-600">
              {{ t('aboutNetwork.hospitality.label') }}
            </p>
            <h2 class="mt-4 font-display text-4xl font-bold text-clay-950">
              {{ t('restaurantSection.title') }}
            </h2>
          </div>
          <img :src="teaImage" :alt="t('servicesProducts.title')" class="h-24 w-24 rounded-3xl object-cover shadow-lg shadow-clay-950/10" />
        </div>
        <div class="mt-8 grid gap-3 sm:grid-cols-2">
          <div
            v-for="item in hospitality"
            :key="item.title"
            class="rounded-2xl bg-sand-50 p-4"
          >
            <h3 class="text-sm font-bold text-clay-950">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-clay-700">{{ item.text }}</p>
          </div>
        </div>
      </div>

      <div class="rounded-[2rem] border border-clay-100 bg-sand-100 p-6 shadow-2xl shadow-clay-950/8">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.28em] text-clay-600">
              {{ t('roomsSection.label') }}
            </p>
            <h2 class="mt-4 font-display text-4xl font-bold text-clay-950">
              {{ t('roomsSection.title') }}
            </h2>
          </div>
          <RouterLink
            to="/rooms"
            class="rounded-full border border-clay-200 bg-white px-4 py-2 text-xs font-bold text-clay-800 shadow-lg shadow-clay-950/5"
          >
            {{ t('actions.viewAll') }}
          </RouterLink>
        </div>

        <div class="mt-8 space-y-4">
          <p v-if="isLoadingRooms" class="text-sm text-clay-700">{{ t('common.loading') }}</p>
          <article
            v-for="room in featuredRooms"
            :key="room.id"
            class="grid gap-4 rounded-[1.5rem] border border-white/80 bg-white/85 p-4 shadow-xl shadow-clay-950/8 sm:grid-cols-[160px_1fr]"
          >
            <img
              v-if="room.room_images?.length"
              :src="withBaseUrl(room.room_images[0])"
              :alt="getRoomName(room)"
              class="h-40 w-full rounded-[1.25rem] object-cover sm:h-full"
            />
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.2em] text-clay-500">{{ room.room_type }}</p>
              <h3 class="mt-2 text-xl font-bold text-clay-950">{{ getRoomName(room) }}</h3>
              <p class="mt-2 line-clamp-2 text-sm leading-6 text-clay-700">{{ getRoomDescription(room) }}</p>
              <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span class="text-sm font-bold text-clay-950">{{ formatPrice(room.price_weekday) }}</span>
                <button
                  type="button"
                  class="rounded-full bg-clay-700 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-clay-950/15"
                  @click="openBookingModal"
                >
                  {{ t('actions.startBooking') }}
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="px-5 pb-8 sm:px-8 lg:px-12">
      <div class="grid overflow-hidden rounded-[2rem] border border-clay-100 bg-white shadow-2xl shadow-clay-950/10 lg:grid-cols-[0.8fr_1.2fr]">
        <div class="p-6 sm:p-8">
          <p class="text-xs font-bold uppercase tracking-[0.28em] text-clay-600">
            {{ t('tourSection.label') }}
          </p>
          <h2 class="mt-4 font-display text-4xl font-bold text-clay-950">
            {{ t('tourSection.title') }}
          </h2>
          <p class="mt-4 text-sm leading-7 text-clay-700">
            {{ t('tourSection.description') }}
          </p>
          <button
            type="button"
            class="mt-6 rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20"
            @click="openBookingModal"
          >
            {{ t('actions.book') }}
          </button>
        </div>
        <iframe
          class="min-h-[360px] w-full"
          src="https://app.lapentor.com/sphere/zafaron"
          :title="t('tourSection.iframeTitle')"
          allow="fullscreen; vr"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  </main>
</template>

<style scoped>
.writing-mode-vertical {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
</style>
