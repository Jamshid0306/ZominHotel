<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { API_BASE_URL, buildRestaurantsUrl, withBaseUrl } from '../api'

const { t, locale } = useI18n()

const restaurants = ref([])
const isLoading = ref(false)
const error = ref('')
const menusById = ref({})
const menuLoading = ref({})
const menuErrors = ref({})

const localizedField = (item, base) => {
  if (!item) return ''
  const key = `${base}_${locale.value}`
  return item[key] || item[`${base}_uz`] || item[`${base}_ru`] || item[`${base}_en`] || ''
}

const fetchRestaurants = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const res = await fetch(buildRestaurantsUrl())
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
  if (!restaurantId) return
  menuLoading.value = { ...menuLoading.value, [restaurantId]: true }
  menuErrors.value = { ...menuErrors.value, [restaurantId]: '' }
  try {
    const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/menus`)
    if (!res.ok) {
      throw new Error(t('restaurantsPage.menuLoadError'))
    }
    const data = await res.json()
    menusById.value = {
      ...menusById.value,
      [restaurantId]: Array.isArray(data) ? data : [],
    }
  } catch (err) {
    menuErrors.value = {
      ...menuErrors.value,
      [restaurantId]: err?.message || t('restaurantsPage.menuLoadError'),
    }
  } finally {
    menuLoading.value = { ...menuLoading.value, [restaurantId]: false }
  }
}

const restaurantList = computed(() => restaurants.value || [])

onMounted(async () => {
  await fetchRestaurants()
  await Promise.all(restaurantList.value.map((restaurant) => fetchMenus(restaurant.id)))
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 pb-20">
    <section class="mt-10 flex flex-wrap items-start justify-between gap-6">
      <div class="max-w-3xl space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
          {{ t('restaurantsPage.label') }}
        </p>
        <h1 class="font-display text-4xl font-semibold text-clay-950 sm:text-5xl">
          {{ t('restaurantsPage.title') }}
        </h1>
        <p class="text-base text-clay-800">
          {{ t('restaurantsPage.description') }}
        </p>
      </div>
    </section>

    <div class="mt-8">
      <p v-if="isLoading" class="text-sm text-clay-700">{{ t('common.loading') }}</p>
      <p v-else-if="error" class="text-sm text-red-600">{{ error }}</p>
      <div v-else class="grid gap-10">
        <article
          v-for="(restaurant, index) in restaurantList"
          :key="restaurant.id"
          class="grid items-center gap-8 rounded-xl border border-clay-100/70 p-6 md:grid-cols-2 md:p-8"
        >
          <div :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'">
            <h2 class="text-3xl font-semibold text-clay-950">
              {{ localizedField(restaurant, 'name') }}
            </h2>
            <p class="mt-3 text-base text-clay-800 sm:text-lg">
              {{ localizedField(restaurant, 'description') }}
            </p>
          </div>
          <div
            class="grid gap-3"
            :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'"
          >
            <img
              v-for="image in (restaurant.images || [])"
              :key="image"
              :src="withBaseUrl(image)"
              :alt="localizedField(restaurant, 'name')"
              class="h-40 w-full rounded-lg object-cover sm:h-48"
            />
          </div>
          <div class="md:col-span-2">
            <div class="flex items-center justify-between">
              <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
                {{ t('restaurantSection.menuLabel') }}
              </p>
              <span class="text-xs text-clay-600">
                {{ (menusById[restaurant.id] || []).length }} {{ t('restaurantSection.menuCount') }}
              </span>
            </div>
            <p v-if="menuLoading[restaurant.id]" class="mt-3 text-sm text-clay-700">
              {{ t('common.loading') }}
            </p>
            <p v-else-if="menuErrors[restaurant.id]" class="mt-3 text-sm text-red-600">
              {{ menuErrors[restaurant.id] }}
            </p>
            <div v-else class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <article
                v-for="menu in menusById[restaurant.id] || []"
                :key="menu.id"
                class="rounded-lg border border-clay-100/70 bg-white/80 p-4"
              >
                <img
                  :src="withBaseUrl(menu.image)"
                  :alt="localizedField(menu, 'name')"
                  class="h-36 w-full rounded-xl object-cover"
                />
                <h3 class="mt-3 text-lg font-semibold text-clay-950">
                  {{ localizedField(menu, 'name') }}
                </h3>
              </article>
              <p
                v-if="(menusById[restaurant.id] || []).length === 0"
                class="text-sm text-clay-700"
              >
                {{ t('restaurantsPage.menuEmpty') }}
              </p>
            </div>
          </div>
        </article>
        <p v-if="restaurantList.length === 0" class="text-sm text-clay-700">
          {{ t('restaurantsPage.empty') }}
        </p>
      </div>
    </div>
  </main>
</template>
