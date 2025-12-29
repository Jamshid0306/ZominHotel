<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageDropdown from './components/LanguageDropdown.vue'

const { t } = useI18n()
const route = useRoute()
const year = new Date().getFullYear()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(200,156,111,0.18),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(140,93,59,0.18),transparent_32%),linear-gradient(180deg,rgba(255,252,248,0.9),rgba(245,235,223,0.95))] text-clay-900"
  >
    <header
      v-if="!isAdminRoute"
      class="sticky top-0 z-30 border-b border-clay-100/80 bg-sand-50/80 backdrop-blur-lg"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2"
      >
        <div class="flex items-center gap-3">
          <RouterLink
            to="/"
            class="text-lg font-display font-semibold tracking-[0.1em] text-clay-900 transition hover:text-clay-700"
          >
            <img src="./assets/images/logo.png" :alt="t('common.logoAlt')" class="w-15" />
          </RouterLink>
        </div>
        <div class="hidden items-center gap-2 md:flex">
          <RouterLink
            :to="{ path: '/', hash: '#rooms' }"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >{{ t('nav.rooms') }}</RouterLink
          >
          <RouterLink
            :to="{ path: '/', hash: '#amenities' }"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >{{ t('nav.amenities') }}</RouterLink
          >
          <RouterLink
            :to="{ path: '/', hash: '#contact' }"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >{{ t('nav.contact') }}</RouterLink
          >
          <RouterLink
            to="/rooms"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >{{ t('nav.all') }}</RouterLink
          >
          <LanguageDropdown />
        </div>
        <RouterLink
          :to="{ path: '/', hash: '#booking' }"
          class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          {{ t('actions.book') }}
        </RouterLink>
      </div>
      <div class="flex flex-wrap items-center gap-2 px-4 pb-3 md:hidden">
        <RouterLink
          class="rounded-full px-3 py-2 text-sm font-semibold text-clay-800"
          :to="{ path: '/', hash: '#rooms' }"
          >{{ t('nav.rooms') }}</RouterLink
        >
        <RouterLink
          class="rounded-full px-3 py-2 text-sm font-semibold text-clay-800"
          :to="{ path: '/', hash: '#amenities' }"
          >{{ t('nav.amenities') }}</RouterLink
        >
        <RouterLink
          class="rounded-full px-3 py-2 text-sm font-semibold text-clay-800"
          :to="{ path: '/', hash: '#contact' }"
          >{{ t('nav.contact') }}</RouterLink
        >
        <RouterLink
          class="rounded-full px-3 py-2 text-sm font-semibold text-clay-800"
          to="/rooms"
          >{{ t('nav.all') }}</RouterLink
        >
        <div class="ml-auto">
          <LanguageDropdown compact />
        </div>
      </div>
    </header>

    <RouterView />

    <footer v-if="!isAdminRoute" class="mt-14 border-t border-clay-100/70 bg-sand-50/90">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between"
      >
        <div class="space-y-3 max-w-md">
          <img src="./assets/images/logo.png" :alt="t('common.logoAlt')" class="w-15" />
          <p class="text-sm text-clay-800">
            {{ t('footer.description') }}
          </p>
          <div
            class="flex flex-wrap items-center gap-3 text-sm font-semibold text-clay-800"
          >
            <span>{{ t('common.phoneLabel') }}</span>
            <a
              class="rounded-full bg-clay-500/12 px-3 py-1 hover:bg-clay-500/18"
              href="tel:+998702289999"
              >+998 70 228 99 99</a
            >
            <span class="text-clay-700">•</span>
            <span>{{ t('common.emailLabel') }}</span>
            <a
              class="rounded-full bg-clay-500/12 px-3 py-1 hover:bg-clay-500/18"
              href="mailto:zafaronpremiumhotel@gmail.com"
              >zafaronpremiumhotel@gmail.com</a
            >
          </div>
        </div>

        <div class="grid grid-cols-2 gap-10 text-sm text-clay-800">
          <div class="space-y-3">
            <p
              class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700"
            >
              {{ t('footer.navTitle') }}
            </p>
            <RouterLink
              class="block rounded px-0 py-1 hover:text-clay-900"
              :to="{ path: '/', hash: '#rooms' }"
              >{{ t('nav.rooms') }}</RouterLink
            >
            <RouterLink
              class="block rounded px-0 py-1 hover:text-clay-900"
              :to="{ path: '/', hash: '#amenities' }"
              >{{ t('nav.amenities') }}</RouterLink
            >
            <RouterLink
              class="block rounded px-0 py-1 hover:text-clay-900"
              :to="{ path: '/', hash: '#contact' }"
              >{{ t('nav.contact') }}</RouterLink
            >
            <RouterLink
              class="block rounded px-0 py-1 hover:text-clay-900"
              to="/rooms"
              >{{ t('nav.all') }}</RouterLink
            >
          </div>
          <div class="space-y-3">
            <p
              class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700"
            >
              {{ t('footer.bookingTitle') }}
            </p>
            <RouterLink
              class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              :to="{ path: '/', hash: '#booking' }"
            >
              {{ t('actions.book') }}
            </RouterLink>
            <p class="text-xs text-clay-700">
              {{ t('footer.questionsLabel') }}
              <a
                class="font-semibold text-clay-800"
                href="mailto:zafaronpremiumhotel@gmail.com"
                >zafaronpremiumhotel@gmail.com</a
              >
            </p>
          </div>
        </div>
      </div>
      <div class="border-t border-clay-100/60 bg-sand-50/90">
        <div
          class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-clay-700"
        >
          <span>{{ t('footer.rights', { year }) }}</span>
          <span class="flex items-center gap-3">
            <span class="h-1.5 w-1.5 rounded-full bg-clay-500"></span>
            {{ t('footer.tagline') }}
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>
