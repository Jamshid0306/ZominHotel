<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import {
  API_BASE_URL,
  withBaseUrl,
  getCookie,
  setCookie,
  deleteCookie,
} from '../api'

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

const fetchRooms = async () => {
  isLoadingRooms.value = true
  roomsError.value = ''
  try {
    const res = await fetch(`${API_BASE_URL}/hotel-rooms`, {
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
    })
    if (!res.ok) {
      throw new Error('Xonalarni yuklashda xatolik yuz berdi.')
    }
    rooms.value = await res.json()
  } catch (error) {
    roomsError.value = error?.message || 'Xonalarni yuklashda xatolik yuz berdi.'
  } finally {
    isLoadingRooms.value = false
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
        throw new Error("Login yoki parol notog'ri.")
      }
      if (res.status === 500) {
        throw new Error("Admin ma'lumotlari sozlanmagan.")
      }
      throw new Error('Login muvaffaqiyatsiz.')
    }

    const data = await res.json()
    token.value = data.access_token
    setCookie('zafaron_access', data.access_token, 60)
    setStatus('success', 'Login muvaffaqiyatli bajarildi.')
    await fetchRooms()
  } catch (error) {
    setStatus('error', error?.message || 'Login muvaffaqiyatsiz.')
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
  setStatus('success', 'Siz tizimdan chiqdingiz.')
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

const revokePreviews = () => {
  imagePreviews.value.forEach((preview) => {
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

onBeforeUnmount(() => {
  revokePreviews()
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
      throw new Error("Xona yangilashda xatolik yuz berdi.")
    }

    setStatus('success', 'Xona muvaffaqiyatli yangilandi.')
    await fetchRooms()
    closeModal()
  } catch (error) {
    setStatus('error', error?.message || 'Xona yangilashda xatolik yuz berdi.')
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
      throw new Error('Xona yaratishda xatolik yuz berdi.')
    }

    setStatus('success', 'Xona muvaffaqiyatli yaratildi.')
    await fetchRooms()
    closeModal()
  } catch (error) {
    setStatus('error', error?.message || 'Xona yaratishda xatolik yuz berdi.')
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

const deleteRoom = async (roomId) => {
  if (!roomId) return
  if (!window.confirm('Xonani o‘chirishni tasdiqlaysizmi?')) return
  isDeleting.value = true
  try {
    const res = await fetch(`${API_BASE_URL}/hotel-rooms/${roomId}`, {
      method: 'DELETE',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : undefined,
    })
    if (!res.ok) {
      throw new Error("Xonani o'chirishda xatolik yuz berdi.")
    }
    setStatus('success', "Xona o'chirildi.")
    rooms.value = rooms.value.filter((room) => room.id !== roomId)
  } catch (error) {
    setStatus('error', error?.message || "Xonani o'chirishda xatolik yuz berdi.")
  } finally {
    isDeleting.value = false
  }
}

onMounted(() => {
  if (token.value) {
    fetchRooms()
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
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">Admin</p>
        <h1 class="mt-2 font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
          Admin Login
        </h1>
        <p class="mt-2 text-sm text-clay-800">
          Login qiling, token cookie ichida 60 minutga saqlanadi.
        </p>

        <form class="mt-6 space-y-4" @submit.prevent="login">
          <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
            <span>Username</span>
            <input
              v-model="username"
              type="text"
              autocomplete="username"
              class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              required
            />
          </label>
          <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
            <span>Password</span>
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
            {{ isLoggingIn ? 'Kutilmoqda...' : 'Login' }}
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
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">Hotel Rooms</p>
            <h2 class="mt-2 text-2xl font-semibold text-clay-950">Xonalar ro'yxati</h2>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-clay-950/15 transition hover:-translate-y-0.5 hover:shadow-lg"
              @click="openCreateModal"
            >
              Create
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-xs font-semibold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
              @click="fetchRooms"
            >
              Yangilash
            </button>
            <button
              type="button"
              class="rounded-full border border-clay-200/80 px-4 py-2 text-xs font-semibold text-clay-800 transition hover:bg-clay-500/10"
              @click="logout"
            >
              Logout
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
          <p v-if="isLoadingRooms" class="text-sm text-clay-700">Yuklanmoqda...</p>
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
                    ID: {{ room.id }}
                  </span>
                  <button
                    type="button"
                    class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-red-50"
                    :disabled="isDeleting"
                    @click.stop="deleteRoom(room.id)"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p class="mt-2 text-sm text-clay-800">{{ room.room_description_uz }}</p>
              <div v-if="room.room_images?.length" class="mt-3 flex flex-wrap gap-2">
                <img
                  v-for="image in room.room_images"
                  :key="image"
                  :src="withBaseUrl(image)"
                  alt="Room image"
                  class="h-16 w-24 rounded-xl object-cover shadow-sm"
                />
              </div>
            </article>
            <p v-if="rooms.length === 0" class="text-sm text-clay-700">
              Hozircha xonalar yo'q.
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
            {{ modalMode === 'create' ? 'Create Room' : 'Update Room' }}
          </p>
          <h3 class="mt-2 text-2xl font-semibold text-clay-950">
            {{ modalMode === 'create' ? 'New Room' : selectedRoom?.room_name_uz }}
          </h3>
        </div>
        <button
          type="button"
          class="rounded-full border border-clay-200/80 px-3 py-1 text-xs font-semibold text-clay-800 transition hover:bg-clay-500/10"
          @click="closeModal"
        >
          Close
        </button>
      </div>

      <form class="mt-6 grid gap-4" @submit.prevent="submitModal">
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>Room name (UZ)</span>
          <input
            v-model="form.room_name_uz"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>Room name (RU)</span>
          <input
            v-model="form.room_name_ru"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>Room name (EN)</span>
          <input
            v-model="form.room_name_en"
            type="text"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          />
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>Description (UZ)</span>
          <textarea
            v-model="form.room_description_uz"
            rows="3"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          ></textarea>
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>Description (RU)</span>
          <textarea
            v-model="form.room_description_ru"
            rows="3"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          ></textarea>
        </label>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>Description (EN)</span>
          <textarea
            v-model="form.room_description_en"
            rows="3"
            class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
            required
          ></textarea>
        </label>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
            <span>Price</span>
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
            <span>Room type</span>
            <select
              v-model="form.room_type"
              class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              required
            >
              <option value="" disabled>Select type</option>
              <option value="standard">Standard</option>
              <option value="lux">Lux</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </label>
        </div>
        <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
          <span>Room images (optional)</span>
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
              Otmena
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
              ? 'Saqlanmoqda...'
              : modalMode === 'create'
                ? 'Create'
                : 'Update'
          }}
        </button>
      </form>
    </div>
  </div>
</template>
