<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { API_BASE_URL } from '../api'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const { t, tm, locale } = useI18n()

const booking = ref({
  checkIn: '',
  checkOut: '',
  rooms: [{ roomId: '', guests: 2 }],
  viewOption: 'no',
  name: '',
  phone: '',
  email: '',
})

const status = ref({
  tone: '',
  key: '',
  params: {},
})

const rooms = ref([])
const isLoadingRooms = ref(false)
const roomsError = ref('')

const guestOptions = computed(() => {
  const options = tm('booking.guestOptions')
  if (!Array.isArray(options)) return []
  return options.filter((option) => [1, 2].includes(Number(option?.value)))
})

const getRoomName = (room) => {
  if (!room) return ''
  if (locale.value === 'ru') return room.room_name_ru
  if (locale.value === 'en') return room.room_name_en
  return room.room_name_uz
}

const currencyLabel = computed(() => (locale.value === 'uz' ? "so'm" : 'sum'))

const formatPrice = (value) => {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return '-'
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
  return `${formatted} ${currencyLabel.value}`
}

const selectedRooms = computed(() =>
  booking.value.rooms
    .map((entry) =>
      rooms.value.find((room) => String(room.id) === String(entry.roomId)) || null
    )
    .filter(Boolean)
)

const parseDate = (value) => {
  if (!value) return null
  const parsed = new Date(`${value}T00:00:00`)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const pricingSummary = computed(() => {
  const start = parseDate(booking.value.checkIn)
  const end = parseDate(booking.value.checkOut)
  const hasAllRoomSelections = booking.value.rooms.every((entry) => entry.roomId)
  if (!hasAllRoomSelections || !selectedRooms.value.length || !start || !end || end <= start) {
    return null
  }

  let weekdayNights = 0
  let weekendNights = 0
  const cursor = new Date(start)
  while (cursor < end) {
    const day = cursor.getDay()
    if (day === 0 || day === 6) {
      weekendNights += 1
    } else {
      weekdayNights += 1
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  const roomCount = selectedRooms.value.length
  const weekdayPrice = selectedRooms.value.reduce(
    (sum, room) => sum + Number(room.price_weekday || 0),
    0
  )
  const weekendPrice = selectedRooms.value.reduce(
    (sum, room) => sum + Number(room.price_weekend || 0),
    0
  )
  const viewFee = booking.value.viewOption === 'yes' ? 50000 : 0
  const total = weekdayNights * weekdayPrice + weekendNights * weekendPrice + viewFee

  return {
    roomCount,
    weekdayNights,
    weekendNights,
    weekdayPrice,
    weekendPrice,
    viewFee,
    total,
  }
})

const fetchRooms = async () => {
  isLoadingRooms.value = true
  roomsError.value = ''
  try {
    const res = await fetch(`${API_BASE_URL}/hotel-rooms`)
    if (!res.ok) {
      throw new Error(t('roomsPage.loadError'))
    }
    rooms.value = await res.json()
  } catch (error) {
    roomsError.value = error?.message || t('roomsPage.loadError')
  } finally {
    isLoadingRooms.value = false
  }
}

const addRoomSelection = () => {
  booking.value.rooms.push({ roomId: '', guests: 2 })
}

const removeRoomSelection = (index) => {
  if (booking.value.rooms.length <= 1) return
  booking.value.rooms.splice(index, 1)
}

const clearStatus = () => {
  status.value = { tone: '', key: '', params: {} }
}

const close = () => {
  emit('close')
}

const submitBooking = () => {
  clearStatus()
  const { checkIn, checkOut, name, phone } = booking.value
  const hasRoomSelections = booking.value.rooms.every((entry) => entry.roomId)
  if (!checkIn || !checkOut || !name || !phone || !hasRoomSelections) {
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
    params: {
      guests: booking.value.rooms.reduce((sum, entry) => sum + Number(entry.guests || 0), 0),
    },
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

onMounted(() => {
  fetchRooms()
})

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

            <div class="sm:col-span-2 space-y-3">
              <div class="flex items-center justify-between">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-clay-500">
                  {{ t('booking.room') }}
                </p>
                <button
                  type="button"
                  class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-clay-200/80 bg-white text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:text-clay-950"
                  @click="addRoomSelection"
                  :aria-label="t('booking.rooms.add')"
                >
                  <span class="text-lg leading-none">+</span>
                </button>
              </div>
              <div
                v-for="(entry, index) in booking.rooms"
                :key="index"
                class="grid items-end gap-3 sm:grid-cols-2"
              >
                <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
                  <span>{{ t('booking.guests') }}</span>
                  <select
                    class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                    v-model.number="entry.guests"
                    @change="clearStatus"
                  >
                    <option
                      v-for="option in guestOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </label>

                <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
                  <span>{{ t('booking.room') }}</span>
                  <select
                    class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                    v-model="entry.roomId"
                    @change="clearStatus"
                    required
                  >
                    <option value="" disabled>
                      {{ t('booking.roomPlaceholder') }}
                    </option>
                    <option v-if="isLoadingRooms" disabled>
                      {{ t('common.loading') }}
                    </option>
                    <option v-else-if="roomsError" disabled>
                      {{ roomsError }}
                    </option>
                    <option v-for="room in rooms" :key="room.id" :value="room.id">
                      {{ getRoomName(room) }} — {{ t('booking.pricing.weekdayPrice') }}:
                      {{ formatPrice(room.price_weekday) }} •
                      {{ t('booking.pricing.weekendPrice') }}:
                      {{ formatPrice(room.price_weekend) }}
                    </option>
                  </select>
                </label>
                <div
                  v-if="booking.rooms.length > 1"
                  class="sm:col-span-2 flex justify-end"
                >
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-full border border-clay-200/80 px-4 py-2 text-xs font-semibold text-clay-700 transition hover:-translate-y-0.5 hover:border-clay-300 hover:text-clay-900"
                    @click="removeRoomSelection(index)"
                    :aria-label="t('booking.rooms.remove')"
                  >
                    <span class="text-base leading-none">–</span>
                    {{ t('booking.rooms.remove') }}
                  </button>
                </div>
              </div>
            </div>
            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('booking.viewOption.label') }}</span>
              <select
                class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                v-model="booking.viewOption"
                @change="clearStatus"
              >
                <option value="no">{{ t('booking.viewOption.no') }}</option>
                <option value="yes">{{ t('booking.viewOption.yes') }}</option>
              </select>
            </label>



            <div
              v-if="pricingSummary"
              class="sm:col-span-2 rounded-2xl border border-clay-200/70 bg-white/90 px-4 py-4 text-sm text-clay-800"
            >
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xs font-semibold uppercase tracking-[0.2em] text-clay-500">
                  {{ t('booking.pricing.title') }}
                </span>
                <span class="text-xs font-semibold text-clay-600">
                  {{ t('booking.pricing.nights', {
                    count: pricingSummary.weekdayNights + pricingSummary.weekendNights,
                  }) }}
                </span>
              </div>
              <div class="mt-3 space-y-2">
                <div class="flex items-center justify-between">
                  <span>{{ t('booking.pricing.weekdayPrice') }}</span>
                  <span class="font-semibold text-clay-950">
                    {{ formatPrice(pricingSummary.weekdayPrice) }}
                  </span>
                </div>
                <div class="flex items-center justify-between text-xs text-clay-600">
                  <span>{{ t('booking.pricing.weekdayNights') }}</span>
                  <span>{{ pricingSummary.weekdayNights }}</span>
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <span>{{ t('booking.pricing.weekendPrice') }}</span>
                  <span class="font-semibold text-clay-950">
                    {{ formatPrice(pricingSummary.weekendPrice) }}
                  </span>
                </div>
                <div class="flex items-center justify-between text-xs text-clay-600">
                  <span>{{ t('booking.pricing.weekendNights') }}</span>
                  <span>{{ pricingSummary.weekendNights }}</span>
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <span>{{ t('booking.viewOption.feeLabel') }}</span>
                  <span class="font-semibold text-clay-950">
                    {{ formatPrice(pricingSummary.viewFee) }}
                  </span>
                </div>
                <div class="mt-3 flex items-center justify-between border-t border-clay-200/70 pt-3">
                  <span class="text-sm font-semibold text-clay-900">
                    {{ t('booking.pricing.total') }}
                  </span>
                  <span class="text-base font-bold text-clay-950">
                    {{ formatPrice(pricingSummary.total) }}
                  </span>
                </div>
              </div>
            </div>

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
