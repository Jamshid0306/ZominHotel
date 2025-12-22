<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { rooms as allRooms } from '../data/rooms'

const booking = ref({
  checkIn: '',
  checkOut: '',
  guests: 2,
  name: '',
  email: '',
})

const status = ref({
  tone: '',
  message: '',
})

const featuredRooms = computed(() => allRooms.slice(0, 3))

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80',
    title: 'Lobby lounge',
    caption: 'Yorqin lobby, tabiiy yoruglik va iliq jigarrang detallar.',
  },
  {
    src: 'https://images.unsplash.com/photo-1505691938895-8b56bcf29f9a?auto=format&fit=crop&w=1800&q=80',
    title: 'Design suite',
    caption: 'Minimalist dekorda zamonaviy mebel va jim tunash.',
  },
  {
    src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=80',
    title: 'Terrasali xona',
    caption: 'Shahar manzarasi, yumshoq tekstura va ochiq balkon.',
  },
  {
    src: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210af?auto=format&fit=crop&w=1800&q=80',
    title: 'Suite lounge',
    caption: 'Keng yashash zonasi, iliq yoruglik va tabiiy materiallar.',
  },
]

const activeSlide = ref(0)
const slideTimer = ref(null)

const nextSlide = () => {
  activeSlide.value = (activeSlide.value + 1) % heroImages.length
}

const prevSlide = () => {
  activeSlide.value = (activeSlide.value - 1 + heroImages.length) % heroImages.length
}

const goToSlide = (index) => {
  activeSlide.value = index
}

const stopAutoplay = () => {
  if (slideTimer.value) {
    clearInterval(slideTimer.value)
    slideTimer.value = null
  }
}

const startAutoplay = () => {
  stopAutoplay()
  slideTimer.value = setInterval(nextSlide, 5200)
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
})

const amenities = [
  {
    title: 'Sokinlik va qulaylik',
    detail:
      'Minimalistik interyer, yumshoq yoruglik va tabiiy materiallar sizni tinchlantiradi.',
  },
  {
    title: 'Xizmatlar seleksiyasi',
    detail:
      '24/7 konsyerj, shaxsiy transfer, hushtakday toza xonalar va ertalabgi kofe xizmati.',
  },
  {
    title: 'Shahar markazida',
    detail:
      'Mehmonxona markazga yaqin, mashhur restoran va galereyalarga qisqa yurish masofasida.',
  },
]

const rituals = [
  {
    title: 'Ritual Coffee Bar',
    detail: 'Single-origin pour over va maxsus desertlar bilan tongni boshlang.',
  },
  {
    title: 'Wellness Terrace',
    detail: 'Quyosh chiqishida yoga, kechqurun esa yengil stretching.',
  },
  {
    title: 'Private Dining',
    detail: 'Shef tanlagan menyu, xona yoki lounge hududida xizmat.',
  },
]

const clearStatus = () => {
  status.value = { tone: '', message: '' }
}

const submitBooking = () => {
  clearStatus()
  const { checkIn, checkOut, guests, name, email } = booking.value
  if (!checkIn || !checkOut || !name || !email) {
    status.value = { tone: 'error', message: 'Barcha maydonlarni toʻldiring.' }
    return
  }

  const start = new Date(checkIn)
  const end = new Date(checkOut)

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    status.value = { tone: 'error', message: 'Sana formatini tekshiring.' }
    return
  }

  if (end <= start) {
    status.value = {
      tone: 'error',
      message: 'Ketish sanasi kirish sanasidan keyin boʻlishi kerak.',
    }
    return
  }

  status.value = {
    tone: 'success',
    message: `Bron qabul qilindi. ${guests} mehmon uchun tasdiq xabarini tezda yuboramiz.`,
  }
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 pb-20">
    <section
      class="relative isolate mt-6 w-screen -ml-[50vw] -mr-[50vw] left-1/2 right-1/2 overflow-hidden rounded-none bg-sand-50"
    >
      <div class="relative h-[680px] sm:h-[760px]">
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/45"></div>
        <div class="absolute inset-0">
          <div
            v-for="(image, index) in heroImages"
            :key="image.src"
            class="absolute inset-0 bg-cover bg-center transition duration-700 ease-out"
            :class="activeSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
            :style="{ backgroundImage: `url(${image.src})` }"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/20"></div>
          </div>
        </div>

        <div class="absolute inset-0 z-10">
          <div class="mx-auto flex h-full max-w-6xl flex-col justify-end px-4 py-10 sm:py-14">
            <div
              class="grid gap-4 lg:grid-cols-[1.15fr_0.9fr] rounded-3xl border border-white/10 bg-white/15 p-4 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
            >
              <div class="space-y-4 rounded-2xl bg-white/80 p-6 shadow-lg shadow-black/10">
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">
                  Boutique stay — zamonaviy, sokin va iliq
                </p>
                <h1 class="font-display text-4xl font-semibold leading-tight text-clay-950 sm:text-5xl">
                  Zafaron Premium Hotel — minimalistik dizayn va jigarrang ohanglar uygʻunligi.
                </h1>
                <p class="max-w-2xl text-lg text-clay-800">
                  Shahar markazidagi hushyor, sokin makonda qulay tunash. Zafaron Premium Hotel — barchasi
                  tabiat ranglari, yumshoq yoruglik va eʼtibor bilan.
                </p>
                <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div
                    class="rounded-2xl border border-clay-100/80 bg-sand-50/90 px-4 py-3 shadow-sm shadow-clay-950/5"
                  >
                    <span class="block text-2xl font-bold text-clay-900">24/7</span>
                    <span class="text-sm text-clay-700">Konsyerj</span>
                  </div>
                  <div
                    class="rounded-2xl border border-clay-100/80 bg-sand-50/90 px-4 py-3 shadow-sm shadow-clay-950/5"
                  >
                    <span class="block text-2xl font-bold text-clay-900">6</span>
                    <span class="text-sm text-clay-700">Turdagi xona</span>
                  </div>
                  <div
                    class="rounded-2xl border border-clay-100/80 bg-sand-50/90 px-4 py-3 shadow-sm shadow-clay-950/5"
                  >
                    <span class="block text-2xl font-bold text-clay-900">4.9</span>
                    <span class="text-sm text-clay-700">Mehmonlar bahosi</span>
                  </div>
                </div>
                <div class="flex flex-wrap items-center gap-3">
                  <a
                    class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                    href="#booking"
                    >Bron qilish</a
                  >
                  <a
                    class="inline-flex items-center justify-center rounded-full border border-clay-200/80 bg-white/60 px-5 py-3 text-sm font-bold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/90"
                    href="#rooms"
                    >Xonalarni ko‘rish</a
                  >
                </div>
              </div>

              <div
                id="booking"
                class="rounded-2xl border border-white/40 bg-white/80 p-6 shadow-lg shadow-black/10 backdrop-blur"
              >
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-clay-700">Onlayn bron</p>
                    <h3 class="mt-1 text-xl font-semibold text-clay-950">Xonani tanlab, sanalarni belgilang</h3>
                  </div>
                  <span class="rounded-full bg-clay-500/15 px-3 py-1 text-[11px] font-semibold text-clay-700">
                    3 qoladigan xona
                  </span>
                </div>

                <form class="mt-5 grid gap-3 md:grid-cols-2" @submit.prevent="submitBooking">
                  <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
                    <span>Kirish sanasi</span>
                    <input
                      type="date"
                      class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                      v-model="booking.checkIn"
                      @input="clearStatus"
                      required
                    />
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
                    <span>Ketish sanasi</span>
                    <input
                      type="date"
                      class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                      v-model="booking.checkOut"
                      @input="clearStatus"
                      required
                    />
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
                    <span>Mehmonlar</span>
                    <select
                      class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                      v-model="booking.guests"
                      @change="clearStatus"
                    >
                      <option value="1">1 mehmon</option>
                      <option value="2">2 mehmon</option>
                      <option value="3">3 mehmon</option>
                      <option value="4">4 mehmon</option>
                    </select>
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
                    <span>Ism va familiya</span>
                    <input
                      type="text"
                      placeholder="Ali Karimov"
                      class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 placeholder:text-clay-700/70 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                      v-model="booking.name"
                      @input="clearStatus"
                      required
                    />
                  </label>

                  <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800 md:col-span-2">
                    <span>Elektron pochta</span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      class="w-full rounded-xl border border-clay-200/80 bg-white/90 px-3 py-3 text-sm font-semibold text-clay-900 placeholder:text-clay-700/70 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
                      v-model="booking.email"
                      @input="clearStatus"
                      required
                    />
                  </label>

                  <button
                    class="mt-2 w-full rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl md:col-span-2"
                    type="submit"
                  >
                    Bronni yuborish
                  </button>

                  <p
                    v-if="status.message"
                    :class="[
                      'md:col-span-2 rounded-2xl border px-4 py-3 text-sm font-semibold',
                      status.tone === 'success'
                        ? 'border-green-200 bg-green-50 text-green-700'
                        : 'border-red-200 bg-red-50 text-red-700',
                    ]"
                  >
                    {{ status.message }}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-clay-800 shadow-md shadow-clay-950/10">
          <span class="h-2 w-2 rounded-full bg-clay-500"></span>
          Photo tour
        </div>
        <div class="absolute left-4 bottom-4 z-20 space-y-2 text-white drop-shadow">
          <p class="text-sm font-semibold">Zafaron Premium Hotel</p>
          <p class="text-xl font-semibold">{{ heroImages[activeSlide].title }}</p>
          <p class="text-sm max-w-md text-white/90">{{ heroImages[activeSlide].caption }}</p>
        </div>
        <div class="absolute right-4 top-4 z-20 flex flex-col gap-2 sm:flex-row">
          <button
            @click="prevSlide(); startAutoplay()"
            class="rounded-full bg-white/85 p-2 text-clay-900 shadow-md shadow-clay-950/10 transition hover:-translate-y-0.5 hover:bg-white"
            aria-label="Oldingi surat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextSlide(); startAutoplay()"
            class="rounded-full bg-white/85 p-2 text-clay-900 shadow-md shadow-clay-950/10 transition hover:-translate-y-0.5 hover:bg-white"
            aria-label="Keyingi surat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div class="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-xs font-semibold text-clay-900 shadow-md shadow-clay-950/10">
          <button
            v-for="(image, index) in heroImages"
            :key="image.title"
            @click="goToSlide(index); startAutoplay()"
            class="h-2.5 w-2.5 rounded-full transition"
            :class="activeSlide === index ? 'bg-clay-500 w-5' : 'bg-clay-200/80'"
            :aria-label="`Surat ${index + 1}`"
          ></button>
        </div>
      </div>
    </section>

    <section class="mt-14 space-y-6" id="amenities">
      <div class="max-w-3xl space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">Xizmatlar</p>
        <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
          Tabiiy ohanglarda sokin tajriba
        </h2>
        <p class="text-base text-clay-800">
          Har bir detalda issiq jigarrang ranglar, hidi, yoruglik va ovozga eʼtibor. Siz dam oling,
          qolganini biz qilamiz.
        </p>
      </div>
      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="item in amenities"
          :key="item.title"
          class="rounded-2xl border border-clay-100/90 bg-white/80 p-6 shadow-sm shadow-clay-950/5 ring-1 ring-transparent transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-clay-100"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-clay-500/25 to-clay-300/40 text-clay-800"
          >
            <span class="text-xl leading-none">•</span>
          </div>
          <h3 class="mt-4 text-lg font-semibold text-clay-950">{{ item.title }}</h3>
          <p class="mt-2 text-sm text-clay-800">{{ item.detail }}</p>
        </article>
      </div>
    </section>

    <section class="mt-14 space-y-6" id="rooms">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">Xonalar</p>
          <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
            Zafaron Premium Hotel xonalari
          </h2>
          <p class="text-base text-clay-800">
            Mahalliy dizayn, hunarmand dekor va odobli servis. Sizga mos bo‘lgan xonani tanlang.
          </p>
        </div>
        <RouterLink
          to="/rooms"
          class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-sm font-bold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
        >
          Hammasini ko‘rish
        </RouterLink>
      </div>
      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="room in featuredRooms"
          :key="room.id"
          class="group rounded-2xl border border-clay-100/90 bg-gradient-to-br from-sand-50 to-sand-100 p-6 shadow-sm shadow-clay-950/5 transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="flex items-center justify-between">
            <span class="rounded-full bg-clay-500/12 px-3 py-1 text-xs font-semibold text-clay-700">
              {{ room.size }}
            </span>
            <span class="text-base font-bold text-clay-950">{{ room.price }}</span>
          </div>
          <h3 class="mt-4 text-lg font-semibold text-clay-950">{{ room.name }}</h3>
          <p class="mt-1 text-sm text-clay-800">{{ room.vibe }}</p>
          <ul class="mt-3 space-y-2 text-sm text-clay-800">
            <li v-for="perk in room.perks" :key="perk" class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 rounded-full bg-clay-500/70"></span>
              <span>{{ perk }}</span>
            </li>
          </ul>
          <div class="mt-4">
            <a
              class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-4 py-2 text-sm font-semibold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
              href="#booking"
            >
              Bronni boshlash
            </a>
          </div>
        </article>
      </div>
    </section>

    <section class="mt-14 space-y-6" id="contact">
      <div
        class="grid gap-6 rounded-3xl border border-clay-100/90 bg-white/80 p-8 shadow-[0_14px_50px_rgba(31,18,12,0.12)] lg:grid-cols-2"
      >
        <div class="space-y-4">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">Kunlik marosimlar</p>
          <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
            Mehmonlarimizni sokin marosimlar kutadi
          </h2>
          <p class="text-base text-clay-800">
            Tongdan kechgacha siz uchun muloyim xizmatlar: kofe marosimi, wellness, shaxsiy ovqatlanish
            va ko‘proq.
          </p>
          <div class="flex flex-wrap items-center gap-3 text-sm font-semibold text-clay-800">
            <span>Telefon:</span>
            <a class="rounded-full bg-clay-500/12 px-3 py-1 hover:bg-clay-500/18" href="tel:+998998001010"
              >+998 99 800 10 10</a
            >
            <span class="text-clay-700">•</span>
            <span>Email:</span>
            <a
              class="rounded-full bg-clay-500/12 px-3 py-1 hover:bg-clay-500/18"
              href="mailto:stay@zafaronpremium.com"
              >stay@zafaronpremium.com</a
            >
          </div>
        </div>
        <div class="grid gap-3">
          <div
            v-for="ritual in rituals"
            :key="ritual.title"
            class="rounded-2xl border border-clay-100/90 bg-sand-50/70 p-5 shadow-sm shadow-clay-950/5"
          >
            <h4 class="text-base font-semibold text-clay-950">{{ ritual.title }}</h4>
            <p class="mt-1 text-sm text-clay-800">{{ ritual.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-14">
      <div
        class="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-clay-100/90 bg-gradient-to-br from-clay-500/15 via-sand-100 to-sand-50 p-8 shadow-[0_14px_50px_rgba(31,18,12,0.1)]"
      >
        <div class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-700">Sizni kutamiz</p>
          <h2 class="font-display text-3xl font-semibold text-clay-950 sm:text-4xl">
            Zafaron Premium Hotel — bronni hoziroq belgilang
          </h2>
          <p class="max-w-2xl text-base text-clay-800">
            Tinch fazo, yumshoq xizmat va zamonaviy dizayn — Zafaron Premium Hotel shahar shovqinidan
            uzoqda yangi manzil.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <a
            class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            href="#booking"
            >Bron qilish</a
          >
          <a
            class="inline-flex items-center justify-center rounded-full border border-clay-200/80 px-5 py-3 text-sm font-bold text-clay-800 transition hover:-translate-y-0.5 hover:border-clay-300 hover:bg-white/70"
            href="mailto:stay@zafaronpremium.com"
            >Savol berish</a
          >
        </div>
      </div>
    </section>
  </main>
</template>
