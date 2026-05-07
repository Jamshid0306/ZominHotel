<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])
const { t } = useI18n()

const close = () => {
  emit('close')
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
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="t('booking.successModal.title')"
      >
        <div
          class="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          @click="close"
        ></div>
        <div
          class="relative z-10 w-full max-w-md rounded-xl border border-white/40 bg-white/95 p-6 text-center shadow-[0_28px_80px_rgba(8,6,4,0.35)] sm:p-8"
        >
          <button
            type="button"
            class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-clay-200/80 text-clay-700 transition hover:bg-clay-500/10"
            @click="close"
            :aria-label="t('common.close')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            class="success-ring mx-auto mt-2 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="success-check h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.4"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h3 class="mt-5 text-2xl font-semibold text-clay-950 sm:text-3xl">
            {{ t('booking.successModal.title') }}
          </h3>
          <p class="mt-3 text-sm text-clay-700 sm:text-base">
            {{ t('booking.successModal.description') }}
          </p>

          <button
            type="button"
            class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-clay-300/80 bg-white px-4 py-3 text-sm font-semibold text-clay-900 transition hover:-translate-y-0.5 hover:border-clay-400 hover:bg-clay-50"
            @click="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {{ t('booking.successModal.back') }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.success-ring {
  animation: ring-pop 380ms ease-out both;
}

.success-check {
  animation: check-pop 420ms ease-out 80ms both;
}

@keyframes ring-pop {
  0% {
    opacity: 0;
    transform: scale(0.65);
  }

  70% {
    opacity: 1;
    transform: scale(1.08);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes check-pop {
  0% {
    opacity: 0;
    transform: scale(0.35);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
