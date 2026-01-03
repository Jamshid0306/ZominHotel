<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { API_BASE_URL, withBaseUrl } from '../api'

const { t, locale } = useI18n()

const restaurants = ref([])
const menus = ref([])
const isLoading = ref(false)
const error = ref('')
const isLoadingMenus = ref(false)
const menuError = ref('')

const activeImageIndex = ref(0)
const activeMenuIndex = ref(0)
const imageTimer = ref(null)
const menuTimer = ref(null)

const activeRestaurant = computed(() => restaurants.value[0] || null)

const localizedField = (item, base) => {
  if (!item) return ''
  const key = `${base}_${locale.value}`
  return item[key] || item[`${base}_uz`] || item[`${base}_ru`] || item[`${base}_en`] || ''
}

const restaurantImages = computed(() => {
  const images = activeRestaurant.value?.images || []
  return images.map((image) => withBaseUrl(image))
})

const menuSlides = computed(() => menus.value || [])

const stopImageAutoplay = () => {
  if (imageTimer.value) {
    clearInterval(imageTimer.value)
    imageTimer.value = null
  }
}

const startImageAutoplay = () => {
  stopImageAutoplay()
  if (restaurantImages.value.length <= 1) return
  imageTimer.value = setInterval(() => {
    const length = restaurantImages.value.length
    activeImageIndex.value = (activeImageIndex.value + 1) % length
  }, 2000)
}

const stopMenuAutoplay = () => {
  if (menuTimer.value) {
    clearInterval(menuTimer.value)
    menuTimer.value = null
  }
}

const startMenuAutoplay = () => {
  stopMenuAutoplay()
  if (menuSlides.value.length <= 1) return
  menuTimer.value = setInterval(() => {
    const length = menuSlides.value.length
    activeMenuIndex.value = (activeMenuIndex.value + 1) % length
  }, 2000)
}

const fetchRestaurants = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const res = await fetch(`${API_BASE_URL}/restaurants`)
    if (!res.ok) {
      throw new Error(t('restaurantsPage.loadError'))
    }
    restaurants.value = await res.json()
  } catch (err) {
    error.value = err?.message || t('restaurantsPage.loadError')
  } finally {
    isLoading.value = false
  }
}

const fetchMenus = async (restaurantId) => {
  if (!restaurantId) {
    menus.value = []
    return
  }
  isLoadingMenus.value = true
  menuError.value = ''
  try {
    const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/menus`)
    if (!res.ok) {
      throw new Error(t('restaurantsPage.menuLoadError'))
    }
    const data = await res.json()
    menus.value = Array.isArray(data) ? data : []
  } catch (err) {
    menuError.value = err?.message || t('restaurantsPage.menuLoadError')
  } finally {
    isLoadingMenus.value = false
  }
}

watch(
  activeRestaurant,
  (restaurant) => {
    activeImageIndex.value = 0
    activeMenuIndex.value = 0
    if (restaurant?.id) {
      fetchMenus(restaurant.id)
    } else {
      menus.value = []
    }
  },
  { immediate: true }
)

watch(restaurantImages, () => {
  activeImageIndex.value = 0
  startImageAutoplay()
})

watch(menuSlides, () => {
  activeMenuIndex.value = 0
  startMenuAutoplay()
})

onMounted(async () => {
  await fetchRestaurants()
  startImageAutoplay()
  startMenuAutoplay()
})

onBeforeUnmount(() => {
  stopImageAutoplay()
  stopMenuAutoplay()
})
</script>

<template>
  <section class="mt-14 space-y-8" id="restaurants">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div class="max-w-3xl space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
          {{ t('restaurantSection.label') }}
        </p>
        <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
          {{ t('restaurantSection.title') }}
        </h2>
        <p class="text-base text-clay-800">
          {{ t('restaurantSection.description') }}
        </p>
      </div>
      <RouterLink
        to="/restaurants"
        class="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-clay-700 transition hover:text-clay-950"
      >
        {{ t('actions.viewAll') }}
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <div v-if="isLoading" class="text-sm text-clay-700">{{ t('common.loading') }}</div>
    <div v-else-if="error" class="text-sm text-red-600">{{ error }}</div>

    <div v-else-if="activeRestaurant" class="grid gap-8 lg:grid-cols-[1fr_1.1fr] h-100">
      <div class="space-y-4">
        <h3 class="text-3xl font-semibold text-clay-950">
          {{ localizedField(activeRestaurant, 'name') }}
        </h3>
        <p class="text-base text-clay-800 sm:text-lg">
          {{ localizedField(activeRestaurant, 'description') }}
        </p>
      </div>
      <div class="relative overflow-hidden rounded-3xl bg-sand-50">
        <div
          v-for="(image, index) in restaurantImages"
          :key="image"
          class="absolute inset-0 transition duration-700 ease-out"
          :class="activeImageIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
        >
          <img
            :src="image"
            :alt="localizedField(activeRestaurant, 'name')"
            class="w-full object-cover sm:h-96 rounded-3xl"
          />
        </div>
        <div
          class="pointer-events-none absolute inset-y-0 left-0 w-44 bg-linear-to-r from-sand-100 via-sand-100/70 to-transparent"
        ></div>
      </div>
    </div>

    <div v-if="activeRestaurant" class="space-y-3">
      <div class="flex items-center justify-between">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
          {{ t('restaurantSection.menuLabel') }}
        </p>
        <span class="text-xs text-clay-600">
          {{ menuSlides.length }} {{ t('restaurantSection.menuCount') }}
        </span>
      </div>

      <div v-if="isLoadingMenus" class="text-sm text-clay-700">
        {{ t('common.loading') }}
      </div>
      <div v-else-if="menuError" class="text-sm text-red-600">{{ menuError }}</div>

      <div v-else class="overflow-hidden rounded-3xl border border-clay-100/70 bg-white/70">
        <div
          class="flex transition duration-700 ease-out"
          :style="{ transform: `translateX(-${activeMenuIndex * 100}%)` }"
        >
          <article
            v-for="menu in menuSlides"
            :key="menu.id"
            class="min-w-full p-6 sm:p-8"
          >
            <div class="mx-auto flex w-full max-w-xs flex-col gap-2 rounded-[10px] border border-gray-200 p-2 sm:max-w-sm">
              <img
                :src="withBaseUrl(menu.image)"
                :alt="localizedField(menu, 'name')"
                class="h-28 w-full rounded-2xl object-cover"
              />
              <div>
                <h4 class="text-[20px] text-center font-semibold text-clay-950">
                  {{ localizedField(menu, 'name') }}
                </h4>
              </div>
            </div>
          </article>
        </div>
        <div v-if="menuSlides.length === 0" class="p-6 text-sm text-clay-700">
          {{ t('restaurantsPage.menuEmpty') }}
        </div>
      </div>

      <div class="flex flex-wrap justify-end">
        <RouterLink
          to="/restaurants"
          class="inline-flex items-center justify-center rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          {{ t('actions.viewRestaurants') }}
        </RouterLink>
      </div>
    </div>
    <p v-else class="text-sm text-clay-700">{{ t('restaurantsPage.empty') }}</p>
  </section>
</template>
