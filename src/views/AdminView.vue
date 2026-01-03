<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  API_BASE_URL,
  withBaseUrl,
  getCookie,
  setCookie,
  deleteCookie,
} from '../api'

const { t } = useI18n()

const username = ref('')
const password = ref('')
const token = ref(getCookie('zafaron_access') || '')
const status = ref({ tone: '', message: '' })
const isLoggingIn = ref(false)
const isLoadingRooms = ref(false)
const rooms = ref([])
const roomsError = ref('')
const isSaving = ref(false)
const isDeleting = ref(false)
const isLoadingRestaurants = ref(false)
const restaurants = ref([])
const restaurantsError = ref('')
const isSavingRestaurant = ref(false)
const isDeletingRestaurant = ref(false)
const restaurantStatus = ref({ tone: '', message: '' })
const isRestaurantModalOpen = ref(false)
const selectedRestaurant = ref(null)
const restaurantModalMode = ref('update')
const restaurantForm = ref({
  name_uz: '',
  name_ru: '',
  name_en: '',
  description_uz: '',
  description_ru: '',
  description_en: '',
})
const restaurantImages = ref([])
const restaurantImagePreviews = ref([])
const isLoadingMenus = ref(false)
const restaurantMenus = ref([])
const menusError = ref('')
const isSavingMenu = ref(false)
const isDeletingMenu = ref(false)
const menuStatus = ref({ tone: '', message: '' })
const isMenuModalOpen = ref(false)
const selectedMenu = ref(null)
const menuModalMode = ref('update')
const menuForm = ref({
  restaurant_id: '',
  name_uz: '',
  name_ru: '',
  name_en: '',
})
const menuImage = ref(null)
const menuImagePreview = ref(null)

const isModalOpen = ref(false)
const selectedRoom = ref(null)
const modalMode = ref('update')
const form = ref({
  room_name_uz: '',
  room_name_ru: '',
  room_name_en: '',
  room_description_uz: '',
  room_description_ru: '',
  room_description_en: '',
  price: '',
  room_type: '',
})
const formImages = ref([])
const imagePreviews = ref([])

const isAuthenticated = computed(() => Boolean(token.value))

const setStatus = (tone, message) => {
  status.value = { tone, message }
}

const clearStatus = () => {
  status.value = { tone: '', message: '' }
}

const setRestaurantStatus = (tone, message) => {
  restaurantStatus.value = { tone, message }
}

const clearRestaurantStatus = () => {
  restaurantStatus.value = { tone: '', message: '' }
}

const setMenuStatus = (tone, message) => {
  menuStatus.value = { tone, message }
}

const clearMenuStatus = () => {
  menuStatus.value = { tone: '', message: '' }
}

const fetchRooms = async () => {
  isLoadingRooms.value = true
  roomsError.value = ''
  try {
    const res = await fetch(`${API_BASE_URL}/hotel-rooms`, {
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
    })
    if (!res.ok) {
      throw new Error(t('admin.errors.roomsLoad'))
    }
    rooms.value = await res.json()
  } catch (error) {
    roomsError.value = error?.message || t('admin.errors.roomsLoad')
  } finally {
    isLoadingRooms.value = false
  }
}

const fetchRestaurants = async () => {
  isLoadingRestaurants.value = true
  restaurantsError.value = ''
  try {
    const res = await fetch(`${API_BASE_URL}/restaurants`, {
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
    })
    if (!res.ok) {
      throw new Error(t('admin.errors.restaurantsLoad'))
    }
    restaurants.value = await res.json()
  } catch (error) {
    restaurantsError.value = error?.message || t('admin.errors.restaurantsLoad')
  } finally {
    isLoadingRestaurants.value = false
  }
}

const fetchMenus = async () => {
  isLoadingMenus.value = true
  menusError.value = ''
  try {
    const res = await fetch(`${API_BASE_URL}/restaurant-menus`, {
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
    })
    if (!res.ok) {
      throw new Error(t('admin.errors.menusLoad'))
    }
    restaurantMenus.value = await res.json()
  } catch (error) {
    menusError.value = error?.message || t('admin.errors.menusLoad')
  } finally {
    isLoadingMenus.value = false
  }
}

const login = async () => {
  clearStatus()
  isLoggingIn.value = true
  try {
    const res = await fetch(`${API_BASE_URL}/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error(t('admin.errors.invalidCredentials'))
      }
      if (res.status === 500) {
        throw new Error(t('admin.errors.adminNotConfigured'))
      }
      throw new Error(t('admin.errors.loginFailed'))
    }

    const data = await res.json()
    token.value = data.access_token
    setCookie('zafaron_access', data.access_token, 60)
    setStatus('success', t('admin.messages.loginSuccess'))
    await fetchRooms()
    await fetchRestaurants()
    await fetchMenus()
  } catch (error) {
    setStatus('error', error?.message || t('admin.errors.loginFailed'))
  } finally {
    isLoggingIn.value = false
  }
}

const logout = () => {
  token.value = ''
  deleteCookie('zafaron_access')
  username.value = ''
  password.value = ''
  rooms.value = []
  restaurants.value = []
  restaurantMenus.value = []
  setStatus('success', t('admin.messages.logoutSuccess'))
}

const openModal = (room) => {
  selectedRoom.value = room
  modalMode.value = 'update'
  form.value = {
    room_name_uz: room.room_name_uz || '',
    room_name_ru: room.room_name_ru || '',
    room_name_en: room.room_name_en || '',
    room_description_uz: room.room_description_uz || '',
    room_description_ru: room.room_description_ru || '',
    room_description_en: room.room_description_en || '',
    price: room.price ?? '',
    room_type: room.room_type || '',
  }
  formImages.value = []
  isModalOpen.value = true
}

const openCreateModal = () => {
  selectedRoom.value = null
  modalMode.value = 'create'
  form.value = {
    room_name_uz: '',
    room_name_ru: '',
    room_name_en: '',
    room_description_uz: '',
    room_description_ru: '',
    room_description_en: '',
    price: '',
    room_type: '',
  }
  formImages.value = []
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedRoom.value = null
  formImages.value = []
}

const openRestaurantModal = (restaurant) => {
  selectedRestaurant.value = restaurant
  restaurantModalMode.value = 'update'
  restaurantForm.value = {
    name_uz: restaurant.name_uz || '',
    name_ru: restaurant.name_ru || '',
    name_en: restaurant.name_en || '',
    description_uz: restaurant.description_uz || '',
    description_ru: restaurant.description_ru || '',
    description_en: restaurant.description_en || '',
  }
  restaurantImages.value = []
  isRestaurantModalOpen.value = true
}

const openCreateRestaurantModal = () => {
  selectedRestaurant.value = null
  restaurantModalMode.value = 'create'
  restaurantForm.value = {
    name_uz: '',
    name_ru: '',
    name_en: '',
    description_uz: '',
    description_ru: '',
    description_en: '',
  }
  restaurantImages.value = []
  isRestaurantModalOpen.value = true
}

const closeRestaurantModal = () => {
  isRestaurantModalOpen.value = false
  selectedRestaurant.value = null
  restaurantImages.value = []
}

const openMenuModal = (menu) => {
  selectedMenu.value = menu
  menuModalMode.value = 'update'
  menuForm.value = {
    restaurant_id: menu.restaurant_id ?? '',
    name_uz: menu.name_uz || '',
    name_ru: menu.name_ru || '',
    name_en: menu.name_en || '',
  }
  clearMenuImage()
  isMenuModalOpen.value = true
}

const openCreateMenuModal = () => {
  selectedMenu.value = null
  menuModalMode.value = 'create'
  menuForm.value = {
    restaurant_id: '',
    name_uz: '',
    name_ru: '',
    name_en: '',
  }
  clearMenuImage()
  isMenuModalOpen.value = true
}

const closeMenuModal = () => {
  isMenuModalOpen.value = false
  selectedMenu.value = null
  clearMenuImage()
}

const handleImageChange = (event) => {
  const newFiles = Array.from(event.target.files || [])
  if (!newFiles.length) return
  const existing = new Map(
    formImages.value.map((file) => [`${file.name}-${file.size}-${file.lastModified}`, file])
  )
  newFiles.forEach((file) => {
    const key = `${file.name}-${file.size}-${file.lastModified}`
    if (!existing.has(key)) {
      existing.set(key, file)
    }
  })
  formImages.value = Array.from(existing.values())
  event.target.value = ''
}

const removeImage = (index) => {
  formImages.value = formImages.value.filter((_, idx) => idx !== index)
}

const handleRestaurantImageChange = (event) => {
  const newFiles = Array.from(event.target.files || [])
  if (!newFiles.length) return
  const existing = new Map(
    restaurantImages.value.map((file) => [`${file.name}-${file.size}-${file.lastModified}`, file])
  )
  newFiles.forEach((file) => {
    const key = `${file.name}-${file.size}-${file.lastModified}`
    if (!existing.has(key)) {
      existing.set(key, file)
    }
  })
  restaurantImages.value = Array.from(existing.values())
  event.target.value = ''
}

const removeRestaurantImage = (index) => {
  restaurantImages.value = restaurantImages.value.filter((_, idx) => idx !== index)
}

const handleMenuImageChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  menuImage.value = file
  menuImagePreview.value = {
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file),
  }
  event.target.value = ''
}

const clearMenuImage = () => {
  if (menuImagePreview.value?.url) {
    URL.revokeObjectURL(menuImagePreview.value.url)
  }
  menuImage.value = null
  menuImagePreview.value = null
}

const revokePreviews = () => {
  imagePreviews.value.forEach((preview) => {
    if (preview.url) {
      URL.revokeObjectURL(preview.url)
    }
  })
}

const revokeRestaurantPreviews = () => {
  restaurantImagePreviews.value.forEach((preview) => {
    if (preview.url) {
      URL.revokeObjectURL(preview.url)
    }
  })
}

watch(
  formImages,
  (files) => {
    revokePreviews()
    imagePreviews.value = files.map((file) => ({
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
    }))
  },
  { deep: true }
)

watch(
  restaurantImages,
  (files) => {
    revokeRestaurantPreviews()
    restaurantImagePreviews.value = files.map((file) => ({
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
    }))
  },
  { deep: true }
)

onBeforeUnmount(() => {
  revokePreviews()
  revokeRestaurantPreviews()
  clearMenuImage()
})

const updateRoom = async () => {
  if (!selectedRoom.value) return
  isSaving.value = true
  try {
    const payload = new FormData()
    payload.append('room_name_uz', form.value.room_name_uz)
    payload.append('room_name_ru', form.value.room_name_ru)
    payload.append('room_name_en', form.value.room_name_en)
    payload.append('room_description_uz', form.value.room_description_uz)
    payload.append('room_description_ru', form.value.room_description_ru)
    payload.append('room_description_en', form.value.room_description_en)
    payload.append('price', String(form.value.price))
    payload.append('room_type', form.value.room_type)
    formImages.value.forEach((file) => payload.append('room_images', file))

    const res = await fetch(
      `${API_BASE_URL}/hotel-rooms/${selectedRoom.value.id}`,
      {
        method: 'PUT',
        headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
        body: payload,
      }
    )

    if (!res.ok) {
      throw new Error(t('admin.errors.roomUpdate'))
    }

    setStatus('success', t('admin.messages.roomUpdated'))
    await fetchRooms()
    closeModal()
  } catch (error) {
    setStatus('error', error?.message || t('admin.errors.roomUpdate'))
  } finally {
    isSaving.value = false
  }
}

const createRoom = async () => {
  isSaving.value = true
  try {
    const payload = new FormData()
    payload.append('room_name_uz', form.value.room_name_uz)
    payload.append('room_name_ru', form.value.room_name_ru)
    payload.append('room_name_en', form.value.room_name_en)
    payload.append('room_description_uz', form.value.room_description_uz)
    payload.append('room_description_ru', form.value.room_description_ru)
    payload.append('room_description_en', form.value.room_description_en)
    payload.append('price', String(form.value.price))
    payload.append('room_type', form.value.room_type)
    formImages.value.forEach((file) => payload.append('room_images', file))

    const res = await fetch(`${API_BASE_URL}/hotel-rooms`, {
      method: 'POST',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
      body: payload,
    })

    if (!res.ok) {
      throw new Error(t('admin.errors.roomCreate'))
    }

    setStatus('success', t('admin.messages.roomCreated'))
    await fetchRooms()
    closeModal()
  } catch (error) {
    setStatus('error', error?.message || t('admin.errors.roomCreate'))
  } finally {
    isSaving.value = false
  }
}

const submitModal = () => {
  if (modalMode.value === 'create') {
    return createRoom()
  }
  return updateRoom()
}

const updateRestaurant = async () => {
  if (!selectedRestaurant.value) return
  isSavingRestaurant.value = true
  clearRestaurantStatus()
  try {
    const payload = new FormData()
    payload.append('name_uz', restaurantForm.value.name_uz)
    payload.append('name_ru', restaurantForm.value.name_ru)
    payload.append('name_en', restaurantForm.value.name_en)
    payload.append('description_uz', restaurantForm.value.description_uz)
    payload.append('description_ru', restaurantForm.value.description_ru)
    payload.append('description_en', restaurantForm.value.description_en)
    restaurantImages.value.forEach((file) => payload.append('images', file))

    const res = await fetch(
      `${API_BASE_URL}/restaurants/${selectedRestaurant.value.id}`,
      {
        method: 'PUT',
        headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
        body: payload,
      }
    )

    if (!res.ok) {
      throw new Error(t('admin.errors.restaurantUpdate'))
    }

    setRestaurantStatus('success', t('admin.messages.restaurantUpdated'))
    await fetchRestaurants()
    closeRestaurantModal()
  } catch (error) {
    setRestaurantStatus('error', error?.message || t('admin.errors.restaurantUpdate'))
  } finally {
    isSavingRestaurant.value = false
  }
}

const createRestaurant = async () => {
  isSavingRestaurant.value = true
  clearRestaurantStatus()
  try {
    const payload = new FormData()
    payload.append('name_uz', restaurantForm.value.name_uz)
    payload.append('name_ru', restaurantForm.value.name_ru)
    payload.append('name_en', restaurantForm.value.name_en)
    payload.append('description_uz', restaurantForm.value.description_uz)
    payload.append('description_ru', restaurantForm.value.description_ru)
    payload.append('description_en', restaurantForm.value.description_en)
    restaurantImages.value.forEach((file) => payload.append('images', file))

    const res = await fetch(`${API_BASE_URL}/restaurants`, {
      method: 'POST',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
      body: payload,
    })

    if (!res.ok) {
      throw new Error(t('admin.errors.restaurantCreate'))
    }

    setRestaurantStatus('success', t('admin.messages.restaurantCreated'))
    await fetchRestaurants()
    closeRestaurantModal()
  } catch (error) {
    setRestaurantStatus('error', error?.message || t('admin.errors.restaurantCreate'))
  } finally {
    isSavingRestaurant.value = false
  }
}

const submitRestaurantModal = () => {
  if (restaurantModalMode.value === 'create') {
    return createRestaurant()
  }
  return updateRestaurant()
}

const deleteRestaurant = async (restaurantId) => {
  if (!restaurantId) return
  if (!window.confirm(t('admin.confirm.deleteRestaurant'))) return
  isDeletingRestaurant.value = true
  clearRestaurantStatus()
  try {
    const res = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}`, {
      method: 'DELETE',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
    })
    if (!res.ok) {
      throw new Error(t('admin.errors.restaurantDelete'))
    }
    setRestaurantStatus('success', t('admin.messages.restaurantDeleted'))
    restaurants.value = restaurants.value.filter((item) => item.id !== restaurantId)
  } catch (error) {
    setRestaurantStatus('error', error?.message || t('admin.errors.restaurantDelete'))
  } finally {
    isDeletingRestaurant.value = false
  }
}

const updateMenu = async () => {
  if (!selectedMenu.value) return
  isSavingMenu.value = true
  clearMenuStatus()
  try {
    const payload = new FormData()
    if (menuForm.value.restaurant_id) {
      payload.append('restaurant_id', String(menuForm.value.restaurant_id))
    }
    payload.append('name_uz', menuForm.value.name_uz)
    payload.append('name_ru', menuForm.value.name_ru)
    payload.append('name_en', menuForm.value.name_en)
    if (menuImage.value) {
      payload.append('image', menuImage.value)
    }

    const res = await fetch(
      `${API_BASE_URL}/restaurant-menus/${selectedMenu.value.id}`,
      {
        method: 'PUT',
        headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
        body: payload,
      }
    )

    if (!res.ok) {
      throw new Error(t('admin.errors.menuUpdate'))
    }

    setMenuStatus('success', t('admin.messages.menuUpdated'))
    await fetchMenus()
    closeMenuModal()
  } catch (error) {
    setMenuStatus('error', error?.message || t('admin.errors.menuUpdate'))
  } finally {
    isSavingMenu.value = false
  }
}

const createMenu = async () => {
  isSavingMenu.value = true
  clearMenuStatus()
  try {
    if (!menuImage.value) {
      throw new Error(t('admin.errors.menuImageRequired'))
    }
    const payload = new FormData()
    payload.append('restaurant_id', String(menuForm.value.restaurant_id))
    payload.append('name_uz', menuForm.value.name_uz)
    payload.append('name_ru', menuForm.value.name_ru)
    payload.append('name_en', menuForm.value.name_en)
    payload.append('image', menuImage.value)

    const res = await fetch(`${API_BASE_URL}/restaurant-menus`, {
      method: 'POST',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
      body: payload,
    })

    if (!res.ok) {
      throw new Error(t('admin.errors.menuCreate'))
    }

    setMenuStatus('success', t('admin.messages.menuCreated'))
    await fetchMenus()
    closeMenuModal()
  } catch (error) {
    setMenuStatus('error', error?.message || t('admin.errors.menuCreate'))
  } finally {
    isSavingMenu.value = false
  }
}

const submitMenuModal = () => {
  if (menuModalMode.value === 'create') {
    return createMenu()
  }
  return updateMenu()
}

const deleteMenu = async (menuId) => {
  if (!menuId) return
  if (!window.confirm(t('admin.confirm.deleteMenu'))) return
  isDeletingMenu.value = true
  clearMenuStatus()
  try {
    const res = await fetch(`${API_BASE_URL}/restaurant-menus/${menuId}`, {
      method: 'DELETE',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
    })
    if (!res.ok) {
      throw new Error(t('admin.errors.menuDelete'))
    }
    setMenuStatus('success', t('admin.messages.menuDeleted'))
    restaurantMenus.value = restaurantMenus.value.filter((item) => item.id !== menuId)
  } catch (error) {
    setMenuStatus('error', error?.message || t('admin.errors.menuDelete'))
  } finally {
    isDeletingMenu.value = false
  }
}

const deleteRoom = async (roomId) => {
  if (!roomId) return
  if (!window.confirm(t('admin.confirm.deleteRoom'))) return
  isDeleting.value = true
  try {
    const res = await fetch(`${API_BASE_URL}/hotel-rooms/${roomId}`, {
      method: 'DELETE',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
    })
    if (!res.ok) {
      throw new Error(t('admin.errors.roomDelete'))
    }
    setStatus('success', t('admin.messages.roomDeleted'))
    rooms.value = rooms.value.filter((room) => room.id !== roomId)
  } catch (error) {
    setStatus('error', error?.message || t('admin.errors.roomDelete'))
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  if (token.value) {
    fetchRooms()
    fetchRestaurants()
    fetchMenus()
  }
})
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 pb-20">
    <section class="mt-10 grid gap-6">
      <div
        v-if="!isAuthenticated"
        class="rounded-3xl border border-clay-100/90 bg-white/80 p-6 shadow-sm shadow-clay-950/5"
      >
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
          {{ t('admin.label') }}
        </p>
        <h1 class="mt-2 font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
          {{ t('admin.loginTitle') }}
        </h1>
        <p class="mt-2 text-sm text-clay-800">
          {{ t('admin.loginDescription') }}
        </p>

        <form class="mt-6 space-y-4" @submit.prevent="login">
          <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
            <span>{{ t('admin.username') }}</span>
            <input
              v-model="username"
              type="text"
              autocomplete="username"
              class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              required
            />
          </label>
          <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
            <span>{{ t('admin.password') }}</span>
            <input
              v-model="password"
              type="password"
              autocomplete="current-password"
              class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              required
            />
          </label>
          <button
            class="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            :disabled="isLoggingIn"
          >
            {{ isLoggingIn ? t('admin.loggingIn') : t('admin.loginButton') }}
          </button>
        </form>

        <p
          v-if="status.message"
          class="mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold"
          :class="
            status.tone === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          "
        >
          {{ status.message }}
        </p>
      </div>

      <div
        v-if="isAuthenticated"
        class="rounded-3xl border border-clay-100/90 bg-white/80 p-6 shadow-sm shadow-clay-950/5"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
              {{ t('admin.sections.roomsLabel') }}
            </p>
            <h2 class="mt-2 text-2xl font-semibold text-clay-950">
              {{ t('admin.sections.roomsTitle') }}
            </h2>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-clay-950/15 transition hover:-translate-y-0.5 hover:shadow-lg"
              @click="openCreateModal"
            >
              {{ t('common.create') }}
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-xs font-semibold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
              @click="fetchRooms"
            >
              {{ t('common.refresh') }}
            </button>
            <button
              type="button"
              class="rounded-full border border-clay-200/80 px-4 py-2 text-xs font-semibold text-clay-800 transition hover:bg-clay-500/10"
              @click="logout"
            >
              {{ t('common.logout') }}
            </button>
          </div>
        </div>

        <p
          v-if="status.message"
          class="mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold"
          :class="
            status.tone === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          "
        >
          {{ status.message }}
        </p>

        <div class="mt-5">
          <p v-if="isLoadingRooms" class="text-sm text-clay-700">{{ t('common.loading') }}</p>
          <p v-else-if="roomsError" class="text-sm text-red-600">
            {{ roomsError }}
          </p>
          <div v-else class="grid gap-4">
            <article
              v-for="room in rooms"
              :key="room.id"
              class="rounded-2xl border border-clay-100/90 bg-gradient-to-br from-sand-50 to-sand-100 p-4 shadow-sm shadow-clay-950/5 transition hover:-translate-y-0.5 hover:shadow-lg"
              @click="openModal(room)"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 class="text-lg font-semibold text-clay-950">
                    {{ room.room_name_uz }}
                  </h3>
                  <p class="text-xs text-clay-700">{{ room.room_type }} • ${{ room.price }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <span class="rounded-full bg-clay-500/12 px-3 py-1 text-xs font-semibold text-clay-700">
                    {{ t('admin.labels.id') }}: {{ room.id }}
                  </span>
                  <button
                    type="button"
                    class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-red-50"
                    :disabled="isDeleting"
                    @click.stop="deleteRoom(room.id)"
                  >
                    {{ t('common.delete') }}
                  </button>
                </div>
              </div>
              <p class="mt-2 text-sm text-clay-800">{{ room.room_description_uz }}</p>
              <div v-if="room.room_images?.length" class="mt-3 flex flex-wrap gap-2">
                <img
                  v-for="image in room.room_images"
                  :key="image"
                  :src="withBaseUrl(image)"
                  :alt="t('admin.alt.roomImage')"
                  class="h-16 w-24 rounded-xl object-cover shadow-sm"
                />
              </div>
            </article>
            <p v-if="rooms.length === 0" class="text-sm text-clay-700">
              {{ t('admin.empty.rooms') }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="isAuthenticated"
        class="rounded-3xl border border-clay-100/90 bg-white/80 p-6 shadow-sm shadow-clay-950/5"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
              {{ t('admin.sections.restaurantsLabel') }}
            </p>
            <h2 class="mt-2 text-2xl font-semibold text-clay-950">
              {{ t('admin.sections.restaurantsTitle') }}
            </h2>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-clay-950/15 transition hover:-translate-y-0.5 hover:shadow-lg"
              @click="openCreateRestaurantModal"
            >
              {{ t('common.create') }}
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-xs font-semibold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
              @click="fetchRestaurants"
            >
              {{ t('common.refresh') }}
            </button>
          </div>
        </div>

        <p
          v-if="restaurantStatus.message"
          class="mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold"
          :class="
            restaurantStatus.tone === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          "
        >
          {{ restaurantStatus.message }}
        </p>

        <div class="mt-5">
          <p v-if="isLoadingRestaurants" class="text-sm text-clay-700">{{ t('common.loading') }}</p>
          <p v-else-if="restaurantsError" class="text-sm text-red-600">
            {{ restaurantsError }}
          </p>
          <div v-else class="grid gap-4">
            <article
              v-for="restaurant in restaurants"
              :key="restaurant.id"
              class="rounded-2xl border border-clay-100/90 bg-gradient-to-br from-sand-50 to-sand-100 p-4 shadow-sm shadow-clay-950/5 transition hover:-translate-y-0.5 hover:shadow-lg"
              @click="openRestaurantModal(restaurant)"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 class="text-lg font-semibold text-clay-950">
                    {{ restaurant.name_uz }}
                  </h3>
                  <p class="text-xs text-clay-700">
                    {{ t('admin.labels.id') }}: {{ restaurant.id }}
                  </p>
                </div>
                <button
                  type="button"
                  class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-red-50"
                  :disabled="isDeletingRestaurant"
                  @click.stop="deleteRestaurant(restaurant.id)"
                >
                  {{ t('common.delete') }}
                </button>
              </div>
              <p class="mt-2 text-sm text-clay-800">{{ restaurant.description_uz }}</p>
              <div v-if="restaurant.images?.length" class="mt-3 flex flex-wrap gap-2">
                <img
                  v-for="image in restaurant.images"
                  :key="image"
                  :src="withBaseUrl(image)"
                  :alt="t('admin.alt.restaurantImage')"
                  class="h-16 w-24 rounded-xl object-cover"
                />
              </div>
            </article>
            <p v-if="restaurants.length === 0" class="text-sm text-clay-700">
              {{ t('admin.empty.restaurants') }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="isAuthenticated"
        class="rounded-3xl border border-clay-100/90 bg-white/80 p-6 shadow-sm shadow-clay-950/5"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
              {{ t('admin.sections.menusLabel') }}
            </p>
            <h2 class="mt-2 text-2xl font-semibold text-clay-950">
              {{ t('admin.sections.menusTitle') }}
            </h2>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-clay-950/15 transition hover:-translate-y-0.5 hover:shadow-lg"
              @click="openCreateMenuModal"
            >
              {{ t('common.create') }}
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-xs font-semibold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
              @click="fetchMenus"
            >
              {{ t('common.refresh') }}
            </button>
          </div>
        </div>

        <p
          v-if="menuStatus.message"
          class="mt-4 rounded-2xl border px-4 py-3 text-sm font-semibold"
          :class="
            menuStatus.tone === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          "
        >
          {{ menuStatus.message }}
        </p>

        <div class="mt-5">
          <p v-if="isLoadingMenus" class="text-sm text-clay-700">{{ t('common.loading') }}</p>
          <p v-else-if="menusError" class="text-sm text-red-600">
            {{ menusError }}
          </p>
          <div v-else class="grid gap-4">
            <article
              v-for="menu in restaurantMenus"
              :key="menu.id"
              class="rounded-2xl border border-clay-100/90 bg-gradient-to-br from-sand-50 to-sand-100 p-4 shadow-sm shadow-clay-950/5 transition hover:-translate-y-0.5 hover:shadow-lg"
              @click="openMenuModal(menu)"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 class="text-lg font-semibold text-clay-950">
                    {{ menu.name_uz }}
                  </h3>
                  <p class="text-xs text-clay-700">
                    {{ t('admin.labels.restaurantId') }}: {{ menu.restaurant_id }}
                  </p>
                </div>
                <button
                  type="button"
                  class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-red-50"
                  :disabled="isDeletingMenu"
                  @click.stop="deleteMenu(menu.id)"
                >
                  {{ t('common.delete') }}
                </button>
              </div>
              <div v-if="menu.image" class="mt-3">
                <img
                  :src="withBaseUrl(menu.image)"
                  :alt="t('admin.alt.menuImage')"
                  class="h-20 w-28 rounded-xl object-cover"
                />
              </div>
            </article>
            <p v-if="restaurantMenus.length === 0" class="text-sm text-clay-700">
              {{ t('admin.empty.menus') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div
    v-if="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
    @click="closeModal"
  >
    <div
      class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl"
      @click.stop
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
            {{ modalMode === 'create' ? t('admin.modals.createRoom') : t('admin.modals.updateRoom') }}
          </p>
          <h3 class="mt-2 text-2xl font-semibold text-clay-950">
            {{ modalMode === 'create' ? t('admin.modals.newRoom') : selectedRoom?.room_name_uz }}
          </h3>
        </div>
        <button
          type="button"
          class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-clay-500/10"
          @click="closeModal"
        >
          {{ t('common.close') }}
        </button>
      </div>

      <form class="mt-6 grid gap-4" @submit.prevent="submitModal">
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.roomNameUz') }}</span>
          <input
            v-model="form.room_name_uz"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.roomNameRu') }}</span>
          <input
            v-model="form.room_name_ru"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.roomNameEn') }}</span>
          <input
            v-model="form.room_name_en"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.descriptionUz') }}</span>
          <textarea
            v-model="form.room_description_uz"
            rows="3"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          ></textarea>
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.descriptionRu') }}</span>
          <textarea
            v-model="form.room_description_ru"
            rows="3"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          ></textarea>
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.descriptionEn') }}</span>
          <textarea
            v-model="form.room_description_en"
            rows="3"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          ></textarea>
        </label>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
            <span>{{ t('admin.form.price') }}</span>
            <input
              v-model="form.price"
              type="number"
              step="0.01"
              min="0"
              class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              required
            />
          </label>
          <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
            <span>{{ t('admin.form.roomType') }}</span>
            <select
              v-model="form.room_type"
              class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              required
            >
              <option value="" disabled>{{ t('admin.form.roomTypePlaceholder') }}</option>
              <option value="standard">{{ t('admin.roomTypes.standard') }}</option>
              <option value="lux">{{ t('admin.roomTypes.lux') }}</option>
              <option value="deluxe">{{ t('admin.roomTypes.deluxe') }}</option>
              <option value="suite">{{ t('admin.roomTypes.suite') }}</option>
            </select>
          </label>
        </div>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.roomImagesOptional') }}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-700"
            @change="handleImageChange"
          />
        </label>
        <div v-if="imagePreviews.length" class="grid gap-3 sm:grid-cols-2">
          <div
            v-for="(preview, index) in imagePreviews"
            :key="preview.url"
            class="flex items-center gap-3 rounded-2xl border border-clay-100/90 bg-sand-50 p-3"
          >
            <img
              :src="preview.url"
              :alt="preview.name"
              class="h-16 w-24 rounded-xl object-cover"
            />
            <div class="flex-1">
              <p class="text-sm font-semibold text-clay-900">{{ preview.name }}</p>
              <p class="text-xs text-clay-600">
                {{ Math.ceil(preview.size / 1024) }} KB
              </p>
            </div>
            <button
              type="button"
              class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-red-50"
              @click="removeImage(index)"
            >
              {{ t('common.cancel') }}
            </button>
          </div>
        </div>
        <button
          class="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          :disabled="isSaving"
        >
          {{
            isSaving
              ? t('common.saving')
              : modalMode === 'create'
                ? t('common.create')
                : t('common.update')
          }}
        </button>
      </form>
    </div>
  </div>

  <div
    v-if="isRestaurantModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
    @click="closeRestaurantModal"
  >
    <div
      class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl"
      @click.stop
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
            {{
              restaurantModalMode === 'create'
                ? t('admin.modals.createRestaurant')
                : t('admin.modals.updateRestaurant')
            }}
          </p>
          <h3 class="mt-2 text-2xl font-semibold text-clay-950">
            {{
              restaurantModalMode === 'create'
                ? t('admin.modals.newRestaurant')
                : selectedRestaurant?.name_uz
            }}
          </h3>
        </div>
        <button
          type="button"
          class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-clay-500/10"
          @click="closeRestaurantModal"
        >
          {{ t('common.close') }}
        </button>
      </div>

      <form class="mt-6 grid gap-4" @submit.prevent="submitRestaurantModal">
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.nameUz') }}</span>
          <input
            v-model="restaurantForm.name_uz"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.nameRu') }}</span>
          <input
            v-model="restaurantForm.name_ru"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.nameEn') }}</span>
          <input
            v-model="restaurantForm.name_en"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.descriptionUz') }}</span>
          <textarea
            v-model="restaurantForm.description_uz"
            rows="3"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          ></textarea>
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.descriptionRu') }}</span>
          <textarea
            v-model="restaurantForm.description_ru"
            rows="3"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          ></textarea>
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.descriptionEn') }}</span>
          <textarea
            v-model="restaurantForm.description_en"
            rows="3"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          ></textarea>
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.imagesOptional') }}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-700"
            @change="handleRestaurantImageChange"
          />
        </label>
        <div v-if="restaurantImagePreviews.length" class="grid gap-3 sm:grid-cols-2">
          <div
            v-for="(preview, index) in restaurantImagePreviews"
            :key="preview.url"
            class="flex items-center gap-3 rounded-2xl border border-clay-100/90 bg-sand-50 p-3"
          >
            <img
              :src="preview.url"
              :alt="preview.name"
              class="h-16 w-24 rounded-xl object-cover"
            />
            <div class="flex-1">
              <p class="text-sm font-semibold text-clay-900">{{ preview.name }}</p>
              <p class="text-xs text-clay-600">
                {{ Math.ceil(preview.size / 1024) }} KB
              </p>
            </div>
            <button
              type="button"
              class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-red-50"
              @click="removeRestaurantImage(index)"
            >
              {{ t('common.cancel') }}
            </button>
          </div>
        </div>
        <button
          class="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          :disabled="isSavingRestaurant"
        >
          {{
            isSavingRestaurant
              ? t('common.saving')
              : restaurantModalMode === 'create'
                ? t('common.create')
                : t('common.update')
          }}
        </button>
      </form>
    </div>
  </div>

  <div
    v-if="isMenuModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
    @click="closeMenuModal"
  >
    <div
      class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl"
      @click.stop
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
            {{ menuModalMode === 'create' ? t('admin.modals.createMenu') : t('admin.modals.updateMenu') }}
          </p>
          <h3 class="mt-2 text-2xl font-semibold text-clay-950">
            {{ menuModalMode === 'create' ? t('admin.modals.newMenu') : selectedMenu?.name_uz }}
          </h3>
        </div>
        <button
          type="button"
          class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-clay-500/10"
          @click="closeMenuModal"
        >
          {{ t('common.close') }}
        </button>
      </div>

      <form class="mt-6 grid gap-4" @submit.prevent="submitMenuModal">
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.restaurant') }}</span>
          <select
            v-model="menuForm.restaurant_id"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          >
            <option value="" disabled>{{ t('admin.form.selectRestaurant') }}</option>
            <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.id">
              {{ restaurant.name_uz }}
            </option>
          </select>
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.nameUz') }}</span>
          <input
            v-model="menuForm.name_uz"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.nameRu') }}</span>
          <input
            v-model="menuForm.name_ru"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>{{ t('admin.form.nameEn') }}</span>
          <input
            v-model="menuForm.name_en"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>
            {{
              t('admin.form.menuImage', {
                requirement: menuModalMode === 'create' ? t('admin.required') : t('admin.optional'),
              })
            }}
          </span>
          <input
            type="file"
            accept="image/*"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-700"
            @change="handleMenuImageChange"
          />
        </label>
        <div v-if="menuImagePreview" class="flex items-center gap-3 rounded-2xl border border-clay-100/90 bg-sand-50 p-3">
          <img
            :src="menuImagePreview.url"
            :alt="menuImagePreview.name"
            class="h-16 w-24 rounded-xl object-cover"
          />
          <div class="flex-1">
            <p class="text-sm font-semibold text-clay-900">{{ menuImagePreview.name }}</p>
            <p class="text-xs text-clay-600">
              {{ Math.ceil(menuImagePreview.size / 1024) }} KB
            </p>
          </div>
          <button
            type="button"
            class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-red-50"
            @click="clearMenuImage"
          >
            {{ t('common.cancel') }}
          </button>
        </div>
        <div v-else-if="menuModalMode === 'update' && selectedMenu?.image" class="rounded-2xl border border-clay-100/90 bg-sand-50 p-3">
          <p class="text-xs text-clay-600">{{ t('admin.labels.currentImage') }}</p>
          <img
            :src="withBaseUrl(selectedMenu.image)"
            :alt="t('admin.alt.menuImage')"
            class="mt-2 h-20 w-28 rounded-xl object-cover"
          />
        </div>
        <button
          class="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          :disabled="isSavingMenu"
        >
          {{
            isSavingMenu
              ? t('common.saving')
              : menuModalMode === 'create'
                ? t('common.create')
                : t('common.update')
          }}
        </button>
      </form>
    </div>
  </div>
</template>
