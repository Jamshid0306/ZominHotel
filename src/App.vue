<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div
    class="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(200,156,111,0.18),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(140,93,59,0.18),transparent_32%),linear-gradient(180deg,rgba(255,252,248,0.9),rgba(245,235,223,0.95))] text-clay-900"
  >
    <header
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
            <img src="./assets/images/logo.png" alt="Logo" class="w-15" />
          </RouterLink>
        </div>
        <div class="hidden items-center gap-2 md:flex">
          <RouterLink
            :to="{ path: '/', hash: '#rooms' }"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >Xonalar</RouterLink
          >
          <RouterLink
            :to="{ path: '/', hash: '#amenities' }"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >Xizmatlar</RouterLink
          >
          <RouterLink
            :to="{ path: '/', hash: '#contact' }"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >Aloqa</RouterLink
          >
          <RouterLink
            to="/rooms"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >Hammasi</RouterLink
          >
        </div>
        <RouterLink
          :to="{ path: '/', hash: '#booking' }"
          class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Bron qilish
        </RouterLink>
      </div>
      <div class="flex items-center gap-2 px-4 pb-3 md:hidden">
        <RouterLink
          class="rounded-full px-3 py-2 text-sm font-semibold text-clay-800"
          :to="{ path: '/', hash: '#rooms' }"
          >Xonalar</RouterLink
        >
        <RouterLink
          class="rounded-full px-3 py-2 text-sm font-semibold text-clay-800"
          :to="{ path: '/', hash: '#amenities' }"
          >Xizmatlar</RouterLink
        >
        <RouterLink
          class="rounded-full px-3 py-2 text-sm font-semibold text-clay-800"
          :to="{ path: '/', hash: '#contact' }"
          >Aloqa</RouterLink
        >
        <RouterLink
          class="rounded-full px-3 py-2 text-sm font-semibold text-clay-800"
          to="/rooms"
          >Hammasi</RouterLink
        >
      </div>
    </header>

    <RouterView />

    <footer class="mt-14 border-t border-clay-100/70 bg-sand-50/90">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between"
      >
        <div class="space-y-3 max-w-md">
          <img src="./assets/images/logo.png" alt="Logo" class="w-15">
          <p class="text-sm text-clay-800">
            Minimalistik dizayn, jigarrang ohanglar va sokin tunash uchun qulay
            manzil. Shahar markazida, ammo shovqindan yiroq.
          </p>
          <div
            class="flex flex-wrap items-center gap-3 text-sm font-semibold text-clay-800"
          >
            <span>Telefon:</span>
            <a
              class="rounded-full bg-clay-500/12 px-3 py-1 hover:bg-clay-500/18"
              href="tel:+998998001010"
              >+998 99 800 10 10</a
            >
            <span class="text-clay-700">•</span>
            <span>Email:</span>
            <a
              class="rounded-full bg-clay-500/12 px-3 py-1 hover:bg-clay-500/18"
              href="mailto:stay@zafaronpremium.com"
              >stay@zafaronpremium.com</a
            >
          </div>
        </div>

        <div class="grid grid-cols-2 gap-10 text-sm text-clay-800">
          <div class="space-y-3">
            <p
              class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700"
            >
              Navigatsiya
            </p>
            <RouterLink
              class="block rounded px-0 py-1 hover:text-clay-900"
              :to="{ path: '/', hash: '#rooms' }"
              >Xonalar</RouterLink
            >
            <RouterLink
              class="block rounded px-0 py-1 hover:text-clay-900"
              :to="{ path: '/', hash: '#amenities' }"
              >Xizmatlar</RouterLink
            >
            <RouterLink
              class="block rounded px-0 py-1 hover:text-clay-900"
              :to="{ path: '/', hash: '#contact' }"
              >Aloqa</RouterLink
            >
            <RouterLink
              class="block rounded px-0 py-1 hover:text-clay-900"
              to="/rooms"
              >Hammasi</RouterLink
            >
          </div>
          <div class="space-y-3">
            <p
              class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700"
            >
              Bron
            </p>
            <RouterLink
              class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              :to="{ path: '/', hash: '#booking' }"
            >
              Bron qilish
            </RouterLink>
            <p class="text-xs text-clay-700">
              Savollar uchun:
              <a
                class="font-semibold text-clay-800"
                href="mailto:stay@zafaronpremium.com"
                >stay@zafaronpremium.com</a
              >
            </p>
          </div>
        </div>
      </div>
      <div class="border-t border-clay-100/60 bg-sand-50/90">
        <div
          class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-clay-700"
        >
          <span
            >© {{ new Date().getFullYear() }} Zafaron Premium Hotel. Barcha
            huquqlar himoyalangan.</span
          >
          <span class="flex items-center gap-3">
            <span class="h-1.5 w-1.5 rounded-full bg-clay-500"></span>
            Boutique stay & crafted comfort
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>
