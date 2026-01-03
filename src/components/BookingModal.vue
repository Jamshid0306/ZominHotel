<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const { t, tm } = useI18n()

const booking = ref({
  checkIn: '',
  checkOut: '',
  guests: 2,
  roomId: '',
  name: '',
  phone: '',
  email: '',
})

const status = ref({
  tone: '',
  key: '',
  params: {},
})

const rooms = computed(() => {
  const items = tm('rooms.list')
  return Array.isArray(items) ? items : []
})

const guestOptions = computed(() => {
  const options = tm('booking.guestOptions')
  return Array.isArray(options) ? options : []
})

const clearStatus = () => {
  status.value = { tone: '', key: '', params: {} }
}

const close = () => {
  emit('close')
}

const submitBooking = () => {
  clearStatus()
  const { checkIn, checkOut, guests, name, email, phone, roomId } = booking.value
  if (!checkIn || !checkOut || !name || !email || !phone || !roomId) {
    status.value = {
      tone: 'error',
      key: 'booking.status.required',
      params: {},
    }
    return
  }

  const start = new Date(checkIn)
  const end = new Date(checkOut)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    status.value = {
      tone: 'error',
      key: 'booking.status.invalidDate',
      params: {},
    }
    return
  }

  if (end <= start) {
    status.value = {
      tone: 'error',
      key: 'booking.status.dateOrder',
      params: {},
    }
    return
  }

  status.value = {
    tone: 'success',
    key: 'booking.status.success',
    params: { guests },
  }
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    close()
  }
}

const setBodyLock = (locked) => {
  document.body.style.overflow = locked ? 'hidden' : ''
}

watch(
  () => props.open,
  (open) => {
    if (open) {
      document.addEventListener('keydown', onKeydown)
      setBodyLock(true)
    } else {
      document.removeEventListener('keydown', onKeydown)
      setBodyLock(false)
    }
  }
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  setBodyLock(false)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="t('booking.title')"
      >
        <div
          class="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          @click="close"
        ></div>
        <div
          class="relative z-10 w-full max-w-3xl rounded-3xl border border-white/30 bg-white/95 p-6 shadow-[0_28px_80px_rgba(8,6,4,0.35)] sm:p-8"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-clay-600">
                {{ t('booking.label') }}
              </p>
              <h3 class="mt-2 text-2xl font-semibold text-clay-950 sm:text-3xl">
                {{ t('booking.title') }}
              </h3>
            </div>
            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-clay-200/80 text-clay-700 transition hover:bg-clay-500/10"
              @click="close"
              :aria-label="t('common.close')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form class="mt-6 grid gap-4 sm:grid-cols-2" @submit.prevent="submitBooking">
            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('booking.checkIn') }}</span>
              <input
                type="date"
                class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                v-model="booking.checkIn"
                @input="clearStatus"
                required
              />
            </label>

            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('booking.checkOut') }}</span>
              <input
                type="date"
                class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                v-model="booking.checkOut"
                @input="clearStatus"
                required
              />
            </label>

            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('booking.guests') }}</span>
              <select
                class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                v-model.number="booking.guests"
                @change="clearStatus"
              >
                <option v-for="option in guestOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('booking.room') }}</span>
              <select
                class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                v-model="booking.roomId"
                @change="clearStatus"
                required
              >
                <option value="" disabled>
                  {{ t('booking.roomPlaceholder') }}
                </option>
                <option v-for="room in rooms" :key="room.id" :value="room.id">
                  {{ room.name }} — {{ room.price }}
                </option>
              </select>
            </label>

            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('booking.name') }}</span>
              <input
                type="text"
                :placeholder="t('booking.namePlaceholder')"
                class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 placeholder:text-clay-700/70 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                v-model="booking.name"
                @input="clearStatus"
                required
              />
            </label>
            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('booking.phone') }}</span>
              <input
                type="tel"
                inputmode="tel"
                autocomplete="tel"
                :placeholder="t('booking.phonePlaceholder')"
                class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 placeholder:text-clay-700/70 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                v-model="booking.phone"
                @input="clearStatus"
                required
              />
            </label>

            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800 sm:col-span-2">
              <span>{{ t('booking.email') }}</span>
              <input
                type="email"
                :placeholder="t('booking.emailPlaceholder')"
                class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 placeholder:text-clay-700/70 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                v-model="booking.email"
                @input="clearStatus"
                required
              />
            </label>

            <button
              class="mt-2 w-full rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl sm:col-span-2"
              type="submit"
            >
              {{ t('booking.submit') }}
            </button>

            <p
              v-if="status.key"
              :class="[
                'sm:col-span-2 rounded-2xl border px-4 py-3 text-sm font-semibold',
                status.tone === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700',
              ]"
            >
              {{ t(status.key, status.params) }}
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
