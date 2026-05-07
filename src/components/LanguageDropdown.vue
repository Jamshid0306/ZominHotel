<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { supportedLocales } from '../i18n'
import flagUz from '../assets/flags/uz.svg'
import flagRu from '../assets/flags/ru.svg'
import flagEn from '../assets/flags/en.svg'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
})

const { t, locale } = useI18n()
const isOpen = ref(false)
const dropdownRef = ref(null)

const flagMap = {
  uz: flagUz,
  ru: flagRu,
  en: flagEn,
}

const locales = computed(() =>
  supportedLocales.map((lang) => ({
    ...lang,
    flag: flagMap[lang.code],
  }))
)

const currentLocale = computed(
  () => locales.value.find((lang) => lang.code === locale.value) || locales.value[0]
)

const setLocale = (code) => {
  locale.value = code
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (!dropdownRef.value) return
  if (!dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

const buttonClasses = computed(() =>
  props.compact
    ? 'flex items-center gap-2 rounded-full border border-clay-200/80 bg-white/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-700 shadow-sm shadow-clay-950/10 transition hover:bg-white'
    : 'flex items-center gap-2 rounded-full border border-clay-200/80 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-clay-700 shadow-sm shadow-clay-950/10 transition hover:bg-white'
)

const menuClasses = computed(() =>
  props.compact
    ? 'absolute right-0 z-30 mt-2 w-32 rounded-lg border border-clay-200/80 bg-white/95 p-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-clay-700 shadow-lg shadow-clay-950/15 backdrop-blur'
    : 'absolute right-0 z-30 mt-2 w-36 rounded-lg border border-clay-200/80 bg-white/95 p-1 text-xs font-semibold uppercase tracking-[0.16em] text-clay-700 shadow-lg shadow-clay-950/15 backdrop-blur'
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      :class="buttonClasses"
      :aria-label="t('nav.language')"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <img
        v-if="currentLocale?.flag"
        :src="currentLocale.flag"
        :alt="currentLocale.label"
        class="h-4 w-6 rounded-sm border border-clay-200/80 object-cover"
      />
      <span>{{ currentLocale?.label }}</span>
      <svg
        class="h-3.5 w-3.5 text-clay-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-if="isOpen" :class="menuClasses" role="listbox">
      <button
        v-for="language in locales"
        :key="language.code"
        type="button"
        class="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left transition hover:bg-clay-500/10"
        :class="locale === language.code ? 'bg-clay-500/12 text-clay-900' : ''"
        @click="setLocale(language.code)"
      >
        <img
          v-if="language.flag"
          :src="language.flag"
          :alt="language.label"
          class="h-4 w-6 rounded-sm border border-clay-200/80 object-cover"
        />
        <span>{{ language.label }}</span>
      </button>
    </div>
  </div>
</template>
