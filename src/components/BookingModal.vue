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

const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN
const TELEGRAM_CHAT_ID = import.meta.env.VITE_API_CHAT_ID

const booking = ref({
  checkIn: '',
  checkOut: '',
  rooms: [{ roomId: '', guests: 2, viewOption: 'no' }],
  name: '',
  phone: '',
  email: '',
})

const status = ref({
  tone: '',
  key: '',
  params: {},
})

const availabilityNotice = ref({
  tone: '',
  key: '',
  params: {},
})

const rooms = ref([])
const isLoadingRooms = ref(false)
const roomsError = ref('')
const blockedRoomIds = ref([])
const roomAvailabilityById = ref({})

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

const toDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const parseDate = (value) => {
  if (!value) return null
  const parsed = new Date(`${value}T00:00:00`)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const todayKey = toDateKey(new Date())
const calendarMonthsCount = 2

const weekDayLabels = computed(() => {
  const formatter = new Intl.DateTimeFormat(locale.value || 'en', { weekday: 'short' })
  const monday = new Date(2023, 0, 2)
  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index))
  )
})

const calendarRange = computed(() => {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  const end = new Date(today.getFullYear(), today.getMonth() + calendarMonthsCount, 0)
  return {
    start: toDateKey(start),
    end: toDateKey(end),
  }
})

const buildCalendarMonths = (startDate, monthsCount) => {
  const monthFormatter = new Intl.DateTimeFormat(locale.value || 'en', {
    month: 'long',
    year: 'numeric',
  })
  const months = []
  for (let index = 0; index < monthsCount; index += 1) {
    const monthStart = new Date(startDate.getFullYear(), startDate.getMonth() + index, 1)
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0)
    const days = []
    const firstWeekday = (monthStart.getDay() + 6) % 7
    for (let filler = 0; filler < firstWeekday; filler += 1) {
      days.push({ key: `empty-${monthStart.getMonth()}-${filler}`, dateKey: '', label: '' })
    }
    for (let day = 1; day <= monthEnd.getDate(); day += 1) {
      const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day)
      const dateKey = toDateKey(date)
      days.push({
        key: dateKey,
        dateKey,
        label: day,
        isToday: dateKey === todayKey,
      })
    }
    months.push({
      key: `${monthStart.getFullYear()}-${monthStart.getMonth()}`,
      label: monthFormatter.format(monthStart),
      days,
    })
  }
  return months
}

const calendarMonths = computed(() =>
  buildCalendarMonths(parseDate(calendarRange.value.start), calendarMonthsCount)
)

const getStayNights = () => {
  const start = parseDate(booking.value.checkIn)
  const end = parseDate(booking.value.checkOut)
  if (!start || !end || end <= start) return 0
  const diffMs = end.getTime() - start.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}

const pricingSummary = computed(() => {
  const start = parseDate(booking.value.checkIn)
  const end = parseDate(booking.value.checkOut)
  const hasAllRoomSelections = booking.value.rooms.every((entry) => entry.roomId)
  if (!hasAllRoomSelections || !selectedRooms.value.length || !start || !end || end <= start) {
    return null
  }

  const weekendDays = new Set([0, 6])
  let weekdayNights = 0
  let weekendNights = 0
  const cursor = new Date(start)
  while (cursor < end) {
    const day = cursor.getDay()
    if (weekendDays.has(day)) {
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
  const roomBreakdown = booking.value.rooms.map((entry) => {
    const room = rooms.value.find((item) => String(item.id) === String(entry.roomId))
    if (!room) return null
    const weekdayRoomPrice = Number(room.price_weekday || 0)
    const weekendRoomPrice = Number(room.price_weekend || 0)
    const roomViewFee = entry.viewOption === 'yes' ? 50000 : 0
    const roomTotal =
      weekdayNights * weekdayRoomPrice + weekendNights * weekendRoomPrice + roomViewFee
    return {
      id: room.id,
      name: getRoomName(room),
      weekdayRoomPrice,
      weekendRoomPrice,
      roomViewFee,
      roomTotal,
    }
  }).filter(Boolean)
  const viewFee = booking.value.rooms.reduce(
    (sum, entry) => sum + (entry.viewOption === 'yes' ? 50000 : 0),
    0
  )
  const total = weekdayNights * weekdayPrice + weekendNights * weekendPrice + viewFee

  return {
    roomCount,
    weekdayNights,
    weekendNights,
    weekdayPrice,
    weekendPrice,
    roomBreakdown,
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
  booking.value.rooms.push({ roomId: '', guests: 2, viewOption: 'no' })
}

const removeRoomSelection = (index) => {
  if (booking.value.rooms.length <= 1) return
  booking.value.rooms.splice(index, 1)
}

const clearStatus = () => {
  status.value = { tone: '', key: '', params: {} }
}

const clearAvailabilityNotice = () => {
  availabilityNotice.value = { tone: '', key: '', params: {} }
}

const isRoomBlocked = (roomId) =>
  blockedRoomIds.value.some((blockedId) => String(blockedId) === String(roomId))

const isPastDate = (dateKey) => dateKey < todayKey

const setRoomAvailabilityState = (roomId, updates) => {
  const current = roomAvailabilityById.value[roomId] || {}
  roomAvailabilityById.value = {
    ...roomAvailabilityById.value,
    [roomId]: { ...current, ...updates },
  }
}

const buildBlockedLookup = (blocks) => {
  const lookup = {}
  blocks.forEach((block) => {
    const start = parseDate(block.start_date)
    const end = parseDate(block.end_date)
    if (!start || !end) return
    const cursor = new Date(start)
    while (cursor <= end) {
      lookup[toDateKey(cursor)] = true
      cursor.setDate(cursor.getDate() + 1)
    }
  })
  return lookup
}

const fetchRoomAvailability = async (roomId) => {
  if (!roomId) return
  const rangeKey = `${calendarRange.value.start}_${calendarRange.value.end}`
  const cached = roomAvailabilityById.value[roomId]
  if (cached?.rangeKey === rangeKey && cached?.blockedLookup) return

  setRoomAvailabilityState(roomId, { isLoading: true, error: '', rangeKey })
  try {
    const query = new URLSearchParams({
      room_id: String(roomId),
      start_date: calendarRange.value.start,
      end_date: calendarRange.value.end,
    })
    const res = await fetch(`${API_BASE_URL}/room-blocks?${query}`)
    if (!res.ok) {
      throw new Error(t('booking.errors.availabilityLoadFailed'))
    }
    const blocks = await res.json()
    setRoomAvailabilityState(roomId, {
      isLoading: false,
      error: '',
      blockedLookup: buildBlockedLookup(Array.isArray(blocks) ? blocks : []),
      rangeKey,
    })
  } catch (error) {
    setRoomAvailabilityState(roomId, {
      isLoading: false,
      error: error?.message || t('booking.errors.availabilityLoadFailed'),
      blockedLookup: {},
      rangeKey,
    })
  }
}

const isRoomCalendarLoading = (roomId) =>
  Boolean(roomAvailabilityById.value[roomId]?.isLoading)

const roomCalendarError = (roomId) => roomAvailabilityById.value[roomId]?.error

const isRoomDateBlocked = (roomId, dateKey) =>
  Boolean(roomAvailabilityById.value[roomId]?.blockedLookup?.[dateKey])

const rangeHasBlockedDates = (roomId, startKey, endKey) => {
  if (!roomAvailabilityById.value[roomId]?.blockedLookup) return false
  const start = parseDate(startKey)
  const end = parseDate(endKey)
  if (!start || !end) return false
  const cursor = new Date(start)
  while (cursor <= end) {
    const key = toDateKey(cursor)
    if (isRoomDateBlocked(roomId, key)) return true
    cursor.setDate(cursor.getDate() + 1)
  }
  return false
}

const isDateInSelectedRange = (dateKey) => {
  const start = parseDate(booking.value.checkIn)
  const end = parseDate(booking.value.checkOut)
  const current = parseDate(dateKey)
  if (!start || !end || !current) return false
  return current >= start && current <= end
}

const isSelectedDate = (dateKey) =>
  dateKey === booking.value.checkIn || dateKey === booking.value.checkOut

const getCalendarDayClasses = (roomId, day) => {
  if (!day.dateKey) {
    return 'invisible'
  }
  if (isPastDate(day.dateKey)) {
    return 'bg-slate-100 text-slate-400 cursor-not-allowed'
  }
  if (isRoomDateBlocked(roomId, day.dateKey)) {
    return 'bg-rose-100 text-rose-700 cursor-not-allowed'
  }
  if (isSelectedDate(day.dateKey)) {
    return 'bg-clay-900 text-white'
  }
  if (isDateInSelectedRange(day.dateKey)) {
    return 'bg-clay-900 text-white'
  }
  return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer'
}

const selectCalendarDate = (roomId, dateKey) => {
  clearAvailabilityNotice()
  clearStatus()
  if (!dateKey || !roomId) return
  if (isPastDate(dateKey) || isRoomDateBlocked(roomId, dateKey)) return

  const currentStart = booking.value.checkIn
  const currentEnd = booking.value.checkOut

  if (!currentStart || currentEnd) {
    booking.value.checkIn = dateKey
    booking.value.checkOut = ''
    return
  }

  if (dateKey === currentStart) {
    booking.value.checkOut = ''
    return
  }

  const [startKey, endKey] = dateKey < currentStart
    ? [dateKey, currentStart]
    : [currentStart, dateKey]

  if (rangeHasBlockedDates(roomId, startKey, endKey)) {
    availabilityNotice.value = {
      tone: 'error',
      key: 'booking.status.roomUnavailable',
      params: {},
    }
    return
  }

  booking.value.checkIn = startKey
  booking.value.checkOut = endKey
}

const buildBookingMessage = () => {
  const nights = getStayNights()
  const lines = [t('booking.message.title')]
  lines.push(t('booking.message.name', { value: booking.value.name || '-' }))
  lines.push(t('booking.message.phone', { value: booking.value.phone || '-' }))
  lines.push(t('booking.message.email', { value: booking.value.email || '-' }))
  lines.push(t('booking.message.checkIn', { value: booking.value.checkIn || '-' }))
  lines.push(t('booking.message.checkOut', { value: booking.value.checkOut || '-' }))
  lines.push(t('booking.message.nights', { value: nights || '-' }))

  const roomLines = booking.value.rooms.map((entry) => {
    const room = rooms.value.find((item) => String(item.id) === String(entry.roomId))
    const roomName = room ? getRoomName(room) : t('booking.message.roomUnknown')
    const guests = Number(entry.guests || 0)
    const stayLabel = nights
      ? t('booking.message.stayLabel', { nights })
      : t('booking.message.stayUnknown')
    const viewLabel =
      entry.viewOption === 'yes'
        ? t('booking.message.viewYes')
        : t('booking.message.viewNo')
    return t('booking.message.roomLine', {
      roomName,
      guests,
      stay: stayLabel,
      view: viewLabel,
    })
  })
  lines.push(t('booking.message.roomsTitle'))
  lines.push(...roomLines)

  if (pricingSummary.value) {
    lines.push(t('booking.message.total', { total: formatPrice(pricingSummary.value.total) }))
  }

  return lines.join('\n')
}

const sendBookingToTelegram = async (message) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error(t('booking.errors.telegramConfigMissing'))
  }

  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    }),
  })

  if (!res.ok) {
    throw new Error(t('booking.errors.telegramSendFailed'))
  }
}

const close = () => {
  emit('close')
}

const fetchBlockedRooms = async () => {
  const start = parseDate(booking.value.checkIn)
  const end = parseDate(booking.value.checkOut)
  if (!start || !end || end <= start) {
    blockedRoomIds.value = []
    return
  }

  try {
    const query = new URLSearchParams({
      start_date: booking.value.checkIn,
      end_date: booking.value.checkOut,
    })
    const res = await fetch(`${API_BASE_URL}/room-blocks/availability?${query}`)
    if (!res.ok) {
      throw new Error(t('booking.errors.availabilityLoadFailed'))
    }
    const data = await res.json()
    blockedRoomIds.value = Array.isArray(data.blocked_room_ids) ? data.blocked_room_ids : []
    const hasBlockedSelection = booking.value.rooms.some(
      (entry) => entry.roomId && isRoomBlocked(entry.roomId)
    )
    if (hasBlockedSelection) {
      availabilityNotice.value = {
        tone: 'error',
        key: 'booking.status.roomUnavailable',
        params: {},
      }
      booking.value.rooms.forEach((entry) => {
        if (entry.roomId && isRoomBlocked(entry.roomId)) {
          entry.roomId = ''
        }
      })
    }
  } catch (error) {
    blockedRoomIds.value = []
  }
}

const handleRoomChange = (entry) => {
  clearStatus()
  clearAvailabilityNotice()
  if (entry.roomId && isRoomBlocked(entry.roomId)) {
    availabilityNotice.value = {
      tone: 'error',
      key: 'booking.status.roomUnavailable',
      params: {},
    }
    entry.roomId = ''
  }
  if (entry.roomId) {
    fetchRoomAvailability(entry.roomId)
  }
}

const submitBooking = async () => {
  clearStatus()
  clearAvailabilityNotice()
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

  if (blockedRoomIds.value.length) {
    const hasBlockedRoom = booking.value.rooms.some(
      (entry) => entry.roomId && isRoomBlocked(entry.roomId)
    )
    if (hasBlockedRoom) {
      availabilityNotice.value = {
        tone: 'error',
        key: 'booking.status.roomUnavailable',
        params: {},
      }
      return
    }
  }

  try {
    const message = buildBookingMessage()
    await sendBookingToTelegram(message)
    status.value = {
      tone: 'success',
      key: 'booking.status.success',
      params: {
        guests: booking.value.rooms.reduce((sum, entry) => sum + Number(entry.guests || 0), 0),
      },
    }
  } catch (error) {
    status.value = {
      tone: 'error',
      key: 'booking.status.sendFailed',
      params: {},
    }
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
      fetchBlockedRooms()
      booking.value.rooms.forEach((entry) => {
        if (entry.roomId) {
          fetchRoomAvailability(entry.roomId)
        }
      })
    } else {
      document.removeEventListener('keydown', onKeydown)
      setBodyLock(false)
    }
  }
)

watch(
  () => [booking.value.checkIn, booking.value.checkOut],
  () => {
    clearAvailabilityNotice()
    fetchBlockedRooms()
  }
)

watch(
  () => [calendarRange.value.start, calendarRange.value.end, booking.value.rooms.map((entry) => entry.roomId)],
  () => {
    if (!props.open) return
    booking.value.rooms.forEach((entry) => {
      if (entry.roomId) {
        fetchRoomAvailability(entry.roomId)
      }
    })
  }
)

onMounted(() => {
  fetchRooms()
  fetchBlockedRooms()
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
          class="relative z-10 w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/30 bg-white/95 p-6 shadow-[0_28px_80px_rgba(8,6,4,0.35)] sm:max-h-[calc(100vh-4rem)] sm:p-8 max-h-[calc(100vh-2rem)]"
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
                    @change="handleRoomChange(entry)"
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
                      {{ isRoomBlocked(room.id) ? ` • ${t('booking.roomUnavailable')}` : '' }}
                    </option>
                  </select>
                </label>
                <div class="sm:col-span-2 rounded-2xl border border-clay-200/70 bg-white/90 px-4 py-4 text-sm text-clay-800">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xs font-semibold uppercase tracking-[0.2em] text-clay-500">
                      {{ t('booking.calendar.title') }}
                    </span>
                    <div class="flex items-center gap-3 text-[11px] font-semibold text-clay-600">
                      <span class="inline-flex items-center gap-1">
                        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                        {{ t('booking.calendar.open') }}
                      </span>
                      <span class="inline-flex items-center gap-1">
                        <span class="h-2 w-2 rounded-full bg-rose-500"></span>
                        {{ t('booking.calendar.closed') }}
                      </span>
                    </div>
                  </div>
                  <p v-if="!entry.roomId" class="mt-2 text-xs text-clay-600">
                    {{ t('booking.calendar.hint') }}
                  </p>
                  <p v-else-if="isRoomCalendarLoading(entry.roomId)" class="mt-2 text-xs text-clay-600">
                    {{ t('booking.calendar.loading') }}
                  </p>
                  <p v-else-if="roomCalendarError(entry.roomId)" class="mt-2 text-xs text-rose-600">
                    {{ t('booking.calendar.error') }}
                  </p>
                  <div v-else class="mt-3 grid gap-4 sm:grid-cols-2">
                    <div
                      v-for="month in calendarMonths"
                      :key="month.key"
                      class="rounded-xl border border-clay-200/70 bg-white/80 px-3 py-3"
                    >
                      <div class="flex items-center justify-between text-xs font-semibold text-clay-700">
                        <span>{{ month.label }}</span>
                        <span class="text-[10px] uppercase tracking-[0.2em] text-clay-500">
                          {{ t('booking.calendar.availability') }}
                        </span>
                      </div>
                      <div class="mt-2 grid grid-cols-7 gap-1 text-[10px] font-semibold uppercase text-clay-500">
                        <span v-for="(label, labelIndex) in weekDayLabels" :key="labelIndex" class="text-center">
                          {{ label }}
                        </span>
                      </div>
                      <div class="mt-2 grid grid-cols-7 gap-1">
                        <div
                          v-for="day in month.days"
                          :key="day.key"
                          class="flex items-center justify-center"
                        >
                          <span
                            class="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-semibold transition"
                            :class="[
                              getCalendarDayClasses(entry.roomId, day),
                              day.isToday ? 'ring-1 ring-clay-300' : '',
                            ]"
                            @click="selectCalendarDate(entry.roomId, day.dateKey)"
                          >
                            {{ day.label }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800 sm:col-span-2">
                  <span>{{ t('booking.viewOption.label') }}</span>
                  <select
                    class="w-full rounded-xl border border-clay-200/80 bg-white/95 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                    v-model="entry.viewOption"
                    @change="clearStatus"
                  >
                    <option value="no">{{ t('booking.viewOption.no') }}</option>
                    <option value="yes">{{ t('booking.viewOption.yes') }}</option>
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
                <div
                  v-if="pricingSummary.roomBreakdown.length"
                  class="mt-3 rounded-xl border border-clay-200/70 bg-white/80 px-3 py-3"
                >
                  <p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-clay-500">
                    {{ t('booking.room') }}
                  </p>
                  <div class="mt-2 space-y-2 text-sm text-clay-800">
                    <div
                      v-for="(room, index) in pricingSummary.roomBreakdown"
                      :key="`${room.id}-${index}`"
                      class="flex flex-wrap items-center justify-between gap-2"
                    >
                      <div class="min-w-[160px]">
                        <p class="font-semibold text-clay-900">{{ room.name }}</p>
                        <p class="text-xs text-clay-600">
                          {{ t('booking.pricing.weekdayNights') }}: {{ pricingSummary.weekdayNights }}
                          • {{ t('booking.pricing.weekendNights') }}: {{ pricingSummary.weekendNights }}
                        </p>
                      </div>
                      <div class="text-right">
                        <p class="text-xs text-clay-600">
                          {{ t('booking.pricing.weekdayPrice') }}:
                          {{ formatPrice(room.weekdayRoomPrice) }}
                        </p>
                        <p class="text-xs text-clay-600">
                          {{ t('booking.pricing.weekendPrice') }}:
                          {{ formatPrice(room.weekendRoomPrice) }}
                        </p>
                        <p class="text-xs text-clay-600">
                          {{ t('booking.viewOption.feeLabel') }}:
                          {{ formatPrice(room.roomViewFee) }}
                        </p>
                        <p class="mt-1 font-semibold text-clay-950">
                          {{ formatPrice(room.roomTotal) }}
                        </p>
                      </div>
                    </div>
                  </div>
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
                type="text"
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
            <p
              v-if="availabilityNotice.key"
              :class="[
                'sm:col-span-2 rounded-2xl border px-4 py-3 text-sm font-semibold',
                availabilityNotice.tone === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700',
              ]"
            >
              {{ t(availabilityNotice.key, availabilityNotice.params) }}
            </p>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
