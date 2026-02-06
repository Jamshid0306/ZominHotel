<script setup>
import { computed, ref, provide } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import LanguageDropdown from "./components/LanguageDropdown.vue";
import BookingModal from "./components/BookingModal.vue";
import SnowOverlay from "./components/SnowOverlay.vue";

const { t } = useI18n();
const route = useRoute();
const year = new Date().getFullYear();
const isAdminRoute = computed(() => route.path.startsWith("/admin"));
const isMobileMenuOpen = ref(false);
const isBookingModalOpen = ref(false);

const openBookingModal = () => {
  isBookingModalOpen.value = true;
};

const closeBookingModal = () => {
  isBookingModalOpen.value = false;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

provide("openBookingModal", openBookingModal);
</script>

<template>
  <div class="min-h-screen bg-white text-clay-900">
    <header
      v-if="!isAdminRoute"
      class="sticky top-0 z-30 border-b border-clay-100/80 bg-[#f7f7f7]"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2"
      >
        <div class="flex items-center gap-3">
          <RouterLink
            to="/"
            class="text-lg font-display font-semibold tracking-widest text-clay-900 transition hover:text-clay-700"
          >
            <img src="/logo.png" :alt="t('common.logoAlt')" class="w-20" />
          </RouterLink>
        </div>
        <div class="hidden items-center gap-2 md:flex">
          <RouterLink
            to="/"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >{{ t("nav.home") }}</RouterLink
          >
          <RouterLink
            to="/rooms"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >{{ t("nav.rooms") }}</RouterLink
          >
          <RouterLink
            to="/restaurants"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >{{ t("nav.restaurants") }}</RouterLink
          >
          <RouterLink
            to="/services"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >{{ t("nav.services") }}</RouterLink
          >
          <RouterLink
            :to="{ path: '/', hash: '#contact' }"
            class="rounded-full px-4 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
            >{{ t("nav.contacts") }}</RouterLink
          >
          <LanguageDropdown />
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="hidden items-center justify-center rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl sm:inline-flex"
            @click="openBookingModal"
          >
            {{ t("actions.book") }}
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-3 py-2 text-xs font-semibold text-clay-800 transition hover:bg-clay-500/10 md:hidden"
            @click="toggleMobileMenu"
            :aria-expanded="isMobileMenuOpen"
            :aria-label="t('common.toggleMenu')"
          >
            <span class="relative h-4 w-5">
              <span
                class="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition duration-300"
                :class="isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''"
              ></span>
              <span
                class="absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition duration-300"
                :class="isMobileMenuOpen ? 'opacity-0' : ''"
              ></span>
              <span
                class="absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition duration-300"
                :class="isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''"
              ></span>
            </span>
          </button>
        </div>
      </div>
      <div
        v-if="isMobileMenuOpen"
        class="flex flex-col gap-2 px-4 pb-4 md:hidden"
      >
        <RouterLink
          class="rounded-xl px-3 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
          to="/"
          @click="closeMobileMenu"
          >{{ t("nav.home") }}</RouterLink
        >
        <RouterLink
          class="rounded-xl px-3 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
          to="/rooms"
          @click="closeMobileMenu"
          >{{ t("nav.rooms") }}</RouterLink
        >
        <RouterLink
          class="rounded-xl px-3 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
          to="/restaurants"
          @click="closeMobileMenu"
          >{{ t("nav.restaurants") }}</RouterLink
        >
        <RouterLink
          class="rounded-xl px-3 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
          to="/services"
          @click="closeMobileMenu"
          >{{ t("nav.services") }}</RouterLink
        >
        <RouterLink
          class="rounded-xl px-3 py-2 text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
          :to="{ path: '/', hash: '#contact' }"
          @click="closeMobileMenu"
          >{{ t("nav.contacts") }}</RouterLink
        >
        <button
          type="button"
          class="rounded-xl px-3 py-2 text-left text-sm font-semibold text-clay-800 transition hover:bg-clay-500/10"
          @click="
            openBookingModal();
            closeMobileMenu();
          "
        >
          {{ t("actions.book") }}
        </button>
        <div class="pt-2">
          <LanguageDropdown compact />
        </div>
      </div>
    </header>

    <RouterView />
    <SnowOverlay />
    <BookingModal :open="isBookingModalOpen" @close="closeBookingModal" />

    <footer
      v-if="!isAdminRoute"
      class="mt-14 border-t border-clay-100/70 bg-[#f7f7f7]"
    >
      <div class="mx-auto max-w-6xl px-4 py-10">
        <div class="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div class="space-y-4">
            <img src="/logo.png" :alt="t('common.logoAlt')" class="w-16" />
            <p class="text-sm text-clay-800">
              {{ t("footer.description") }}
            </p>
            <div class="flex items-center gap-3">
              <a
                class="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-clay-200/80 bg-white/70 text-clay-700 shadow-sm transition hover:-translate-y-0.5 hover:border-clay-300 hover:text-clay-950 hover:shadow-md"
                href="https://www.instagram.com/zafaron_premium_hotel?igsh=czc2dmZlYTZja3p2"
                aria-label="Instagram"
                target="_blank"
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.5A3 3 0 0 0 4.5 7.5v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-9Zm4.5 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.1-.9a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z"
                  />
                </svg>
              </a>
              <a
                class="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-clay-200/80 bg-white/70 text-clay-700 shadow-sm transition hover:-translate-y-0.5 hover:border-clay-300 hover:text-clay-950 hover:shadow-md"
                href="https://www.facebook.com/share/1DU7NEBpbn/?mibextid=wwXIfr"
                aria-label="Facebook"
                target="_blank"
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M13.5 8.25V6.6c0-.8.5-1.1 1.2-1.1h1.8V3h-2.4C11.9 3 10.5 4.5 10.5 6.6v1.65H9V11h1.5v7.5h3V11h2.1l.4-2.75h-2.5Z"
                  />
                </svg>
              </a>
            </div>
            <div class="space-y-2 text-sm text-clay-800">
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="text-xs font-semibold uppercase tracking-[0.2em] text-clay-500"
                >
                  {{ t("location.label") }}
                </span>
                <span>{{ t("location.address") }}</span>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="text-xs font-semibold uppercase tracking-[0.2em] text-clay-500"
                >
                  {{ t("common.phoneLabel") }}
                </span>
                <a
                  class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:border-clay-300 hover:text-clay-950"
                  href="tel:+998702289999"
                >
                  +998 70 228 99 99
                </a>
                <a
                  class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:border-clay-300 hover:text-clay-950"
                  href="tel:+998715010606"
                >
                  +998 71 501 06 06
                </a>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <span
                  class="text-xs font-semibold uppercase tracking-[0.2em] text-clay-500"
                >
                  {{ t("common.emailLabel") }}
                </span>
                <a
                  class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:border-clay-300 hover:text-clay-950"
                  href="mailto:zafaronpremiumhotel@gmail.com"
                >
                  zafaronpremiumhotel@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div class="space-y-4 text-sm text-clay-800">
            <p
              class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700"
            >
              {{ t("footer.navTitle") }}
            </p>
            <RouterLink class="block rounded py-1 hover:text-clay-950" to="/">
              {{ t("nav.home") }}
            </RouterLink>
            <RouterLink
              class="block rounded py-1 hover:text-clay-950"
              to="/rooms"
            >
              {{ t("nav.rooms") }}
            </RouterLink>
            <RouterLink
              class="block rounded py-1 hover:text-clay-950"
              to="/restaurants"
            >
              {{ t("nav.restaurants") }}
            </RouterLink>
            <RouterLink
              class="block rounded py-1 hover:text-clay-950"
              to="/services"
            >
              {{ t("nav.services") }}
            </RouterLink>
            <RouterLink
              class="block rounded py-1 hover:text-clay-950"
              :to="{ path: '/', hash: '#contact' }"
            >
              {{ t("nav.contacts") }}
            </RouterLink>
          </div>

          <div class="space-y-4 text-sm text-clay-800">
            <p
              class="text-xs font-semibold uppercase tracking-[0.22em] text-clay-700"
            >
              {{ t("footer.bookingTitle") }}
            </p>
            <button
              type="button"
              class="inline-flex items-center bg-clay-500 cursor-pointer justify-center rounded-full bg-linear-to-r from-clay-600 to-clay-400 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              @click="openBookingModal"
            >
              {{ t("actions.book") }}
            </button>
            <p class="text-xs text-clay-700">
              {{ t("footer.questionsLabel") }}
              <a
                class="font-semibold text-clay-800"
                href="mailto:zafaronpremiumhotel@gmail.com"
              >
                zafaronpremiumhotel@gmail.com
              </a>
            </p>
            <RouterLink
              class="inline-flex items-center gap-2 text-xs font-semibold text-clay-700 hover:text-clay-950"
              :to="{ path: '/', hash: '#contact' }"
            >
              {{ t("nav.contacts") }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="flex justify-center pt-5 h-15 items-center gap-2">
        <img
          class="rounded-[20px] w-10"
          src="@/assets/images/edev-icon.ico"
          alt="Edev"
        />
        <a target="_blank" href="https://edev.uz">{{ t("creat") }}</a>
      </div>
      <div class="border-t border-clay-100/60 bg-sand-50/90">
        <div
          class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-clay-700"
        >
          <span>{{ t("footer.rights", { year }) }}</span>
          <span class="flex items-center gap-3">
            <span class="h-1.5 w-1.5 rounded-full bg-clay-500"></span>
            {{ t("footer.tagline") }}
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>
