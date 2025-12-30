import { createI18n } from 'vue-i18n'

import amenityQuiet from './assets/images/slide-images/4.jpg'
import amenityService from './assets/images/slide-images/8.jpg'
import amenityMountain from './assets/images/slide-images/12.jpg'
import amenityPool from './assets/images/slide-images/18.jpg'
import amenityRestaurant from './assets/images/slide-images/21.jpg'

export const supportedLocales = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
]

const messages = {
  uz: {
    brand: "Za'faron Premium Hotel",
    nav: {
      rooms: 'Xonalar',
      amenities: 'Xizmatlar',
      contact: 'Aloqa',
      all: 'Hammasi',
      language: 'Til',
    },
    actions: {
      book: 'Bron qilish',
      viewRooms: 'Xonalarni ko‘rish',
      viewAll: 'Hammasini ko‘rish',
      startBooking: 'Bronni boshlash',
      ask: 'Savol berish',
      home: 'Asosiy sahifa',
    },
    common: {
      phoneLabel: 'Telefon:',
      emailLabel: 'Email:',
      logoAlt: 'Logo',
      loading: 'Yuklanmoqda...',
    },
    location: {
      label: 'Manzil:',
      address: "Chimgon, Bo'stonliq tumani",
    },
    footer: {
      description:
        "Minimalistik dizayn, jigarrang ohanglar va sokin tunash uchun qulay manzil. Chimgon tog'lari bag'rida, shovqindan yiroq.",
      navTitle: 'Navigatsiya',
      bookingTitle: 'Bron',
      questionsLabel: 'Savollar uchun:',
      rights: "© {year} Za'faron Premium Hotel. Barcha huquqlar himoyalangan.",
      tagline: 'Boutique stay & crafted comfort',
    },
    hero: {
      tagline: 'Boutique stay — zamonaviy, sokin va iliq',
      title:
        "Za'faron Premium Hotel — minimalistik dizayn va jigarrang ohanglar uygʻunligi.",
      description:
        "Chimgon tog'laridagi hushyor, sokin makonda qulay tunash. Za'faron Premium Hotel — barchasi tabiat ranglari, yumshoq yoruglik va eʼtibor bilan.",
      stats: {
        concierge: 'Konsyerj',
        roomTypes: 'Turdagi xona',
        rating: 'Mehmonlar bahosi',
      },
      badge: 'Photo tour',
      slider: {
        prev: 'Oldingi surat',
        next: 'Keyingi surat',
        image: 'Surat {index}',
      },
    },
    booking: {
      label: 'Onlayn bron',
      title: 'Xonani tanlab, sanalarni belgilang',
      availability: '{count} qoladigan xona',
      checkIn: 'Kirish sanasi',
      checkOut: 'Ketish sanasi',
      guests: 'Mehmonlar',
      guestOptions: [
        { value: 1, label: '1 mehmon' },
        { value: 2, label: '2 mehmon' },
        { value: 3, label: '3 mehmon' },
        { value: 4, label: '4 mehmon' },
      ],
      name: 'Ism va familiya',
      namePlaceholder: 'Ali Karimov',
      phone: 'Telefon raqami',
      phonePlaceholder: '+998 70 228 99 99',
      room: 'Xona',
      roomPlaceholder: 'Xonani tanlang',
      email: 'Elektron pochta',
      emailPlaceholder: 'example',
      submit: 'Bronni yuborish',
      status: {
        required: 'Barcha maydonlarni toʻldiring.',
        invalidDate: 'Sana formatini tekshiring.',
        dateOrder: 'Ketish sanasi kirish sanasidan keyin boʻlishi kerak.',
        success:
          'Bron qabul qilindi. {guests} mehmon uchun tasdiq xabarini tezda yuboramiz.',
      },
    },
    heroImages: [
      {
        title: 'Lobby lounge',
        caption: 'Yorqin lobby, tabiiy yoruglik va iliq jigarrang detallar.',
      },
      {
        title: 'Design suite',
        caption: 'Minimalist dekorda zamonaviy mebel va jim tunash.',
      },
      {
        title: 'Terrasali xona',
        caption: "Tog' manzarasi, yumshoq tekstura va ochiq balkon.",
      },
      {
        title: 'Suite lounge',
        caption: 'Keng yashash zonasi, iliq yoruglik va tabiiy materiallar.',
      },
    ],
    amenitiesSection: {
      label: 'Xizmatlar',
      title: 'Tabiiy ohanglarda sokin tajriba',
      description:
        'Har bir detalda issiq jigarrang ranglar, hidi, yoruglik va ovozga eʼtibor. Siz dam oling, qolganini biz qilamiz.',
    },
    restaurantSection: {
      label: 'Restoran',
      title: 'Zafaron oshxonasi — nafis taʼm va iliq muhit',
      description:
        'Mahalliy mahsulotlar, shef taʼlimi va sokin muhitda tayyorlangan taomlar. Har bir taomda ohang va did uygʻunligi.',
      menuLabel: 'Menyu',
      menuCount: 'taom',
    },
    amenities: [
      {
        title: 'Sokinlik va qulaylik',
        detail:
          'Minimalistik interyer, yumshoq yoruglik va tabiiy materiallar sizni tinchlantiradi. Keng krovatlar, sokin ranglar va nozik aromalar har kuni chuqur dam olishga yordam beradi.',
        image: amenityQuiet,
        imageAlt: "Sokin interyer va yumshoq yorug'lik",
      },
      {
        title: 'Xizmatlar seleksiyasi',
        detail:
          '24/7 konsyerj, shaxsiy transfer, hushtakday toza xonalar va ertalabgi kofe xizmati. Har bir so‘rov tezkor va samimiy xizmat bilan hal qilinadi.',
        image: amenityService,
        imageAlt: 'Konsyerj xizmati',
      },
      {
        title: "Chimgon tog'larida",
        detail:
          "Mehmonxona Chimgon tog'lari bag'rida, sayr yo'llari va tabiatga yaqin. Atrofda toza havo, qarag'ay hidi va tonggi sokinlik sizni kutadi.",
        image: amenityMountain,
        imageAlt: "Tog' manzarasi",
      },
      {
        title: 'Panoramali basseyn',
        detail:
          "Isitiladigan basseyn, tog' manzarasi va yumshoq yoritish bilan tongdan kechgacha hordiq. Yengil musiqa, sochiqlar va dam olish zonasi bilan to‘liq relax.",
        image: amenityPool,
        imageAlt: 'Panoramali basseyn',
      },
      {
        title: 'Gurme restoran',
        detail:
          "Shef menyusi, mahalliy mahsulotlar va sham yorug'ida iliq kechki ovqat. Har bir taom ta’mi muvozanatli, servis esa sokin va nafis.",
        image: amenityRestaurant,
        imageAlt: 'Restoran interyeri',
      },
    ],
    roomsSection: {
      label: 'Xonalar',
      title: "Za'faron Premium Hotel xonalari",
      description:
        'Mahalliy dizayn, hunarmand dekor va odobli servis. Sizga mos bo‘lgan xonani tanlang.',
      viewAll: 'Hammasini ko‘rish',
    },
    rooms: {
      list: [
        {
          id: 'courtyard-king',
          name: 'Courtyard King',
          price: '$180 / tun',
          size: '34 m²',
          vibe: 'Yozuv stoli va jimjit hovliga qaragan keng xona.',
          perks: ['Rainfall dushi', 'Qalin pardalar', 'Ortapedik king-size krovat'],
        },
        {
          id: 'zafaron-suite',
          name: "Za'faron Suite",
          price: '$260 / tun',
          size: '52 m²',
          vibe: 'Keng yashash zonasi va katta panorama oynalar.',
          perks: ['Shaxsiy lounge', 'Kundalik tozalash', 'Shaxsiy minibar'],
        },
        {
          id: 'garden-loft',
          name: 'Garden Loft',
          price: '$320 / tun',
          size: '64 m²',
          vibe: 'Ikki darajali loft, balkon va yashil panorama.',
          perks: ['Balkon', 'Kutubxona burchagi', 'Kecha aromaterapiya'],
        },
        {
          id: 'city-twin',
          name: 'Mountain Twin',
          price: '$210 / tun',
          size: '38 m²',
          vibe: "Hamroh bilan sayohatga mos, tog' manzarali ikkita alohida krovat.",
          perks: ["Twin krovatlar", "Tog' manzarasi", 'Ertalabgi kofe xizmati'],
        },
        {
          id: 'executive-corner',
          name: 'Executive Corner',
          price: '$280 / tun',
          size: '48 m²',
          vibe: 'Burchak xonasi, keng oynalar va jim ish maydoni.',
          perks: ['Burchak panorama', 'Ish stoli', 'Tezkor Wi-Fi'],
        },
        {
          id: 'spa-residence',
          name: 'Spa Residence',
          price: '$410 / tun',
          size: '72 m²',
          vibe: 'Shaxsiy sauna va keng yashash zonasi bilan premium tajriba.',
          perks: ['Shaxsiy sauna', 'Kecha spa set', 'VIP transfer'],
        },
      ],
    },
    ritualsSection: {
      label: 'Kunlik marosimlar',
      title: 'Mehmonlarimizni sokin marosimlar kutadi',
      description:
        'Tongdan kechgacha siz uchun muloyim xizmatlar: kofe marosimi, wellness, shaxsiy ovqatlanish va ko‘proq.',
    },
    rituals: [
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
    ],
    servicesPage: {
      label: 'Xizmatlar',
      title: "Za'faron Premium Hotel — barcha xizmatlar",
      description:
        'Kun davomida muloyim xizmatlar: tonggi kofe, wellness, shaxsiy ovqatlanish va ko‘proq.',
      summaryTitle: '{count} xizmat',
      summarySubtitle: 'Sokin ritmlar va eʼtiborli servis.',
    },
    restaurantsPage: {
      label: 'Restoranlar',
      title: "Za'faron Premium Hotel — barcha restoranlar",
      description:
        'Har bir restoran o‘ziga xos taʼm va kayfiyatga ega. Taomlarimizni sekin, did bilan kashf eting.',
      empty: "Hozircha restoranlar yo'q.",
      loadError: 'Restoranlarni yuklashda xatolik yuz berdi.',
      menuLoadError: 'Menyularni yuklashda xatolik yuz berdi.',
      menuEmpty: 'Menyular mavjud emas.',
    },
    cta: {
      label: 'Sizni kutamiz',
      title: "Za'faron Premium Hotel — bronni hoziroq belgilang",
      description:
        'Tinch fazo, yumshoq xizmat va zamonaviy dizayn — Zafaron Premium Hotel shahar shovqinidan uzoqda yangi manzil.',
      book: 'Bron qilish',
      ask: 'Savol berish',
    },
    roomsPage: {
      label: 'Xonalar',
      title: "Za'faron Premium Hotel — barcha xonalar",
      description:
        'Har bir xona tabiat ranglari va zamonaviy minimalizm uygʻunligida. Quyi shovqinsiz tunash, yuqori servis va sokin interyer uchun sevimli variantingizni tanlang.',
      book: 'Bron qilish',
      home: 'Asosiy sahifa',
      summaryTitle: '6 xil xona',
      summarySubtitle: 'Premium, sokin va zamonaviy qulaylik.',
      startBooking: 'Bronni boshlash',
    },
  },
  ru: {
    brand: "Za'faron Premium Hotel",
    nav: {
      rooms: 'Номера',
      amenities: 'Услуги',
      contact: 'Контакты',
      all: 'Все',
      language: 'Язык',
    },
    actions: {
      book: 'Забронировать',
      viewRooms: 'Посмотреть номера',
      viewAll: 'Смотреть все',
      startBooking: 'Начать бронь',
      ask: 'Задать вопрос',
      home: 'Главная',
    },
    common: {
      phoneLabel: 'Телефон:',
      emailLabel: 'Email:',
      logoAlt: 'Логотип',
      loading: 'Загрузка...',
    },
    location: {
      label: 'Адрес:',
      address: 'Чимган, Бостанлыкский район',
    },
    footer: {
      description:
        'Минималистичный дизайн, тёплые коричневые тона и спокойное место для отдыха. В горах Чимгана, вдали от шума.',
      navTitle: 'Навигация',
      bookingTitle: 'Бронирование',
      questionsLabel: 'Для вопросов:',
      rights: "© {year} Za'faron Premium Hotel. Все права защищены.",
      tagline: 'Бутик-отель и заботливый комфорт',
    },
    hero: {
      tagline: 'Бутик-отель — современный, спокойный и тёплый',
      title:
        "Za'faron Premium Hotel — гармония минималистичного дизайна и тёплых коричневых тонов.",
      description:
        "Уютное проживание в спокойном уголке гор Чимгана. Za'faron Premium Hotel — про природные оттенки, мягкий свет и заботу.",
      stats: {
        concierge: 'Консьерж',
        roomTypes: 'Типов номеров',
        rating: 'Оценка гостей',
      },
      badge: 'Фото-тур',
      slider: {
        prev: 'Предыдущее фото',
        next: 'Следующее фото',
        image: 'Фото {index}',
      },
    },
    booking: {
      label: 'Онлайн-бронь',
      title: 'Выберите номер и даты',
      availability: 'Осталось {count} номеров',
      checkIn: 'Дата заезда',
      checkOut: 'Дата выезда',
      guests: 'Гости',
      guestOptions: [
        { value: 1, label: '1 гость' },
        { value: 2, label: '2 гостя' },
        { value: 3, label: '3 гостя' },
        { value: 4, label: '4 гостя' },
      ],
      name: 'Имя и фамилия',
      namePlaceholder: 'Али Каримов',
      phone: 'Номер телефона',
      phonePlaceholder: '+998 70 228 99 99',
      room: 'Номер',
      roomPlaceholder: 'Выберите номер',
      email: 'Эл. почта',
      emailPlaceholder: 'example',
      submit: 'Отправить бронь',
      status: {
        required: 'Заполните все поля.',
        invalidDate: 'Проверьте формат даты.',
        dateOrder: 'Дата выезда должна быть позже даты заезда.',
        success: 'Бронь принята. Скоро отправим подтверждение для {guests} гостей.',
      },
    },
    heroImages: [
      {
        title: 'Lobby lounge',
        caption: 'Светлый лобби, естественный свет и тёплые коричневые детали.',
      },
      {
        title: 'Design suite',
        caption: 'Современная мебель в минималистичном декоре и тихий отдых.',
      },
      {
        title: 'Terrace room',
        caption: 'Вид на горы, мягкие текстуры и открытый балкон.',
      },
      {
        title: 'Suite lounge',
        caption: 'Просторная гостиная зона, тёплый свет и натуральные материалы.',
      },
    ],
    amenitiesSection: {
      label: 'Услуги',
      title: 'Спокойный опыт в природных оттенках',
      description:
        'В каждой детали тёплые коричневые тона, аромат, свет и звук. Отдыхайте, остальное сделаем мы.',
    },
    restaurantSection: {
      label: 'Ресторан',
      title: 'Кухня Zafaron — изысканный вкус и тёплая атмосфера',
      description:
        'Локальные продукты, работа шефа и спокойная атмосфера. В каждом блюде — баланс вкуса и стиля.',
      menuLabel: 'Меню',
      menuCount: 'блюд',
    },
    amenities: [
      {
        title: 'Тишина и уют',
        detail:
          'Минималистичный интерьер, мягкий свет и натуральные материалы помогают расслабиться. Просторные кровати, спокойная палитра и деликатные ароматы создают идеальный отдых.',
        image: amenityQuiet,
        imageAlt: 'Тёплый интерьер и мягкий свет',
      },
      {
        title: 'Подборка сервисов',
        detail:
          'Консьерж 24/7, личный трансфер, безупречно чистые номера и утренний кофе. Любой запрос решается быстро, вежливо и с вниманием к деталям.',
        image: amenityService,
        imageAlt: 'Консьерж сервис',
      },
      {
        title: 'В горах Чимгана',
        detail:
          'Отель в горах Чимгана, рядом прогулочные тропы и природа. Свежий воздух, аромат хвои и утреннее спокойствие наполняют каждый день.',
        image: amenityMountain,
        imageAlt: 'Горный пейзаж',
      },
      {
        title: 'Панорамный бассейн',
        detail:
          'Подогреваемый бассейн с видом на горы и мягкой подсветкой с утра до вечера. Лёгкая музыка, полотенца и зона отдыха включены.',
        image: amenityPool,
        imageAlt: 'Панорамный бассейн',
      },
      {
        title: 'Ресторан с авторской кухней',
        detail:
          'Авторское меню, локальные продукты и уютные ужины при свечах. Каждое блюдо выверено, подача — аккуратная, сервис — ненавязчивый.',
        image: amenityRestaurant,
        imageAlt: 'Интерьер ресторана',
      },
    ],
    roomsSection: {
      label: 'Номера',
      title: "Номера Za'faron Premium Hotel",
      description: 'Локальный дизайн, ремесленный декор и вежливый сервис. Выберите номер, который подходит вам.',
      viewAll: 'Смотреть все',
    },
    rooms: {
      list: [
        {
          id: 'courtyard-king',
          name: 'Courtyard King',
          price: '$180 / ночь',
          size: '34 м²',
          vibe: 'Просторный номер с видом на тихий двор и рабочим столом.',
          perks: ['Душ Rainfall', 'Плотные шторы', 'Ортопедическая кровать king-size'],
        },
        {
          id: 'zafaron-suite',
          name: "Za'faron Suite",
          price: '$260 / ночь',
          size: '52 м²',
          vibe: 'Просторная гостиная зона и большие панорамные окна.',
          perks: ['Личный лаундж', 'Ежедневная уборка', 'Личный мини-бар'],
        },
        {
          id: 'garden-loft',
          name: 'Garden Loft',
          price: '$320 / ночь',
          size: '64 м²',
          vibe: 'Двухуровневый лофт, балкон и зелёная панорама.',
          perks: ['Балкон', 'Уголок библиотеки', 'Ночная ароматерапия'],
        },
        {
          id: 'city-twin',
          name: 'Mountain Twin',
          price: '$210 / ночь',
          size: '38 м²',
          vibe: 'Две отдельные кровати с видом на горы — идеально для поездки вдвоём.',
          perks: ['Кровати twin', 'Вид на горы', 'Утренний кофе'],
        },
        {
          id: 'executive-corner',
          name: 'Executive Corner',
          price: '$280 / ночь',
          size: '48 м²',
          vibe: 'Угловой номер с широкими окнами и тихой рабочей зоной.',
          perks: ['Угловая панорама', 'Рабочий стол', 'Быстрый Wi-Fi'],
        },
        {
          id: 'spa-residence',
          name: 'Spa Residence',
          price: '$410 / ночь',
          size: '72 м²',
          vibe: 'Премиальный отдых с личной сауной и просторной гостиной.',
          perks: ['Личная сауна', 'Ночной spa-set', 'VIP-трансфер'],
        },
      ],
    },
    ritualsSection: {
      label: 'Ежедневные ритуалы',
      title: 'Гостей ждут спокойные ритуалы',
      description:
        'С утра до вечера для вас мягкие сервисы: кофейный ритуал, wellness, приватные ужины и многое другое.',
    },
    rituals: [
      {
        title: 'Ritual Coffee Bar',
        detail: 'Начните утро с single-origin pour over и авторских десертов.',
      },
      {
        title: 'Wellness Terrace',
        detail: 'Йога на рассвете, вечером — лёгкий стретчинг.',
      },
      {
        title: 'Private Dining',
        detail: 'Меню от шефа, обслуживание в номере или в зоне лаунжа.',
      },
    ],
    servicesPage: {
      label: 'Услуги',
      title: "Za'faron Premium Hotel — все услуги",
      description:
        'В течение дня мы предлагаем мягкие сервисы: утренний кофе, wellness, приватные ужины и другое.',
      summaryTitle: '{count} услуг',
      summarySubtitle: 'Спокойные ритуалы и заботливый сервис.',
    },
    restaurantsPage: {
      label: 'Рестораны',
      title: "Za'faron Premium Hotel — все рестораны",
      description:
        'У каждого ресторана свой вкус и настроение. Откройте нашу кухню в спокойном ритме.',
      empty: 'Пока ресторанов нет.',
      loadError: 'Ошибка при загрузке ресторанов.',
      menuLoadError: 'Ошибка при загрузке меню.',
      menuEmpty: 'Меню пока недоступно.',
    },
    cta: {
      label: 'Ждём вас',
      title: "Za'faron Premium Hotel — забронируйте прямо сейчас",
      description:
        'Тихое пространство, мягкий сервис и современный дизайн — новый адрес вдали от городского шума.',
      book: 'Забронировать',
      ask: 'Задать вопрос',
    },
    roomsPage: {
      label: 'Номера',
      title: "Za'faron Premium Hotel — все номера",
      description:
        'Каждый номер — сочетание природных оттенков и современного минимализма. Выберите свой вариант для спокойного отдыха, высокого сервиса и тихого интерьера.',
      book: 'Забронировать',
      home: 'Главная',
      summaryTitle: '6 типов номеров',
      summarySubtitle: 'Премиальные, спокойные и современные удобства.',
      startBooking: 'Начать бронь',
    },
  },
  en: {
    brand: "Za'faron Premium Hotel",
    nav: {
      rooms: 'Rooms',
      amenities: 'Amenities',
      contact: 'Contact',
      all: 'All',
      language: 'Language',
    },
    actions: {
      book: 'Book now',
      viewRooms: 'View rooms',
      viewAll: 'View all',
      startBooking: 'Start booking',
      ask: 'Ask a question',
      home: 'Home',
    },
    common: {
      phoneLabel: 'Phone:',
      emailLabel: 'Email:',
      logoAlt: 'Logo',
      loading: 'Loading...',
    },
    location: {
      label: 'Location:',
      address: 'Chimgan, Bostanlik district',
    },
    footer: {
      description:
        'Minimalist design, warm brown tones, and a calm place to stay. In the Chimgan mountains, away from the noise.',
      navTitle: 'Navigation',
      bookingTitle: 'Booking',
      questionsLabel: 'For questions:',
      rights: "© {year} Za'faron Premium Hotel. All rights reserved.",
      tagline: 'Boutique stay & crafted comfort',
    },
    hero: {
      tagline: 'Boutique stay — modern, calm, and warm',
      title: "Za'faron Premium Hotel — a harmony of minimalist design and warm brown tones.",
      description:
        "Comfortable stays in a calm corner of the Chimgan mountains. Za'faron Premium Hotel is all about natural colors, soft light, and care.",
      stats: {
        concierge: 'Concierge',
        roomTypes: 'Room types',
        rating: 'Guest rating',
      },
      badge: 'Photo tour',
      slider: {
        prev: 'Previous photo',
        next: 'Next photo',
        image: 'Photo {index}',
      },
    },
    booking: {
      label: 'Online booking',
      title: 'Choose a room and dates',
      availability: '{count} rooms left',
      checkIn: 'Check-in date',
      checkOut: 'Check-out date',
      guests: 'Guests',
      guestOptions: [
        { value: 1, label: '1 guest' },
        { value: 2, label: '2 guests' },
        { value: 3, label: '3 guests' },
        { value: 4, label: '4 guests' },
      ],
      name: 'Full name',
      namePlaceholder: 'Ali Karimov',
      phone: 'Phone number',
      phonePlaceholder: '+998 70 228 99 99',
      room: 'Room',
      roomPlaceholder: 'Select a room',
      email: 'Email',
      emailPlaceholder: 'example',
      submit: 'Submit booking',
      status: {
        required: 'Please fill out all fields.',
        invalidDate: 'Check the date format.',
        dateOrder: 'Check-out must be after check-in.',
        success: "Booking received. We'll send confirmation for {guests} guests shortly.",
      },
    },
    heroImages: [
      {
        title: 'Lobby lounge',
        caption: 'Bright lobby, natural light, and warm brown details.',
      },
      {
        title: 'Design suite',
        caption: 'Modern furniture in a minimalist decor for a quiet stay.',
      },
      {
        title: 'Terrace room',
        caption: 'Mountain views, soft textures, and an open balcony.',
      },
      {
        title: 'Suite lounge',
        caption: 'Spacious living area, warm light, and natural materials.',
      },
    ],
    amenitiesSection: {
      label: 'Amenities',
      title: 'A calm experience in natural tones',
      description:
        'Warm brown colors, scent, light, and sound in every detail. You relax, we handle the rest.',
    },
    restaurantSection: {
      label: 'Restaurant',
      title: 'Zafaron cuisine — refined flavors and warm atmosphere',
      description:
        'Local ingredients, chef craft, and a calm setting. Each dish is a balance of taste and mood.',
      menuLabel: 'Menu',
      menuCount: 'dishes',
    },
    amenities: [
      {
        title: 'Quiet comfort',
        detail:
          'Minimalist interiors, soft light, and natural materials help you unwind. Spacious beds, calm palettes, and delicate aromas support deeper rest.',
        image: amenityQuiet,
        imageAlt: 'Warm interior and soft light',
      },
      {
        title: 'Curated services',
        detail:
          '24/7 concierge, private transfer, spotless rooms, and morning coffee service. Every request is handled swiftly, warmly, and with care.',
        image: amenityService,
        imageAlt: 'Concierge service',
      },
      {
        title: 'In the Chimgan mountains',
        detail:
          'The hotel sits in the Chimgan mountains, close to trails and nature. Fresh air, pine notes, and quiet mornings surround your stay.',
        image: amenityMountain,
        imageAlt: 'Mountain landscape',
      },
      {
        title: 'Panoramic pool',
        detail:
          'Heated pool with mountain views and soft lighting from morning to evening. Gentle music, towels, and a calm lounge zone are ready for you.',
        image: amenityPool,
        imageAlt: 'Panoramic pool',
      },
      {
        title: "Chef's restaurant",
        detail:
          'Chef-led menu, local ingredients, and candlelit dinners in a calm setting. Each dish is balanced, beautifully plated, and served with quiet elegance.',
        image: amenityRestaurant,
        imageAlt: 'Restaurant interior',
      },
    ],
    roomsSection: {
      label: 'Rooms',
      title: "Za'faron Premium Hotel rooms",
      description: 'Local design, artisan decor, and gracious service. Choose a room that suits you.',
      viewAll: 'View all',
    },
    rooms: {
      list: [
        {
          id: 'courtyard-king',
          name: 'Courtyard King',
          price: '$180 / night',
          size: '34 m²',
          vibe: 'Spacious room with a writing desk and a quiet courtyard view.',
          perks: ['Rainfall shower', 'Blackout curtains', 'Orthopedic king-size bed'],
        },
        {
          id: 'zafaron-suite',
          name: "Za'faron Suite",
          price: '$260 / night',
          size: '52 m²',
          vibe: 'Large living area with big panoramic windows.',
          perks: ['Private lounge', 'Daily housekeeping', 'Private minibar'],
        },
        {
          id: 'garden-loft',
          name: 'Garden Loft',
          price: '$320 / night',
          size: '64 m²',
          vibe: 'Two-level loft with a balcony and green panorama.',
          perks: ['Balcony', 'Library nook', 'Night aromatherapy'],
        },
        {
          id: 'city-twin',
          name: 'Mountain Twin',
          price: '$210 / night',
          size: '38 m²',
          vibe: 'Two separate beds with a mountain view, ideal for traveling together.',
          perks: ['Twin beds', 'Mountain view', 'Morning coffee service'],
        },
        {
          id: 'executive-corner',
          name: 'Executive Corner',
          price: '$280 / night',
          size: '48 m²',
          vibe: 'Corner room with wide windows and a quiet work area.',
          perks: ['Corner panorama', 'Work desk', 'Fast Wi-Fi'],
        },
        {
          id: 'spa-residence',
          name: 'Spa Residence',
          price: '$410 / night',
          size: '72 m²',
          vibe: 'Premium stay with a private sauna and spacious living area.',
          perks: ['Private sauna', 'Night spa set', 'VIP transfer'],
        },
      ],
    },
    ritualsSection: {
      label: 'Daily rituals',
      title: 'Calm rituals await our guests',
      description:
        'From morning to evening we offer gentle services: coffee ritual, wellness, private dining, and more.',
    },
    rituals: [
      {
        title: 'Ritual Coffee Bar',
        detail: 'Start your morning with single-origin pour-over and signature desserts.',
      },
      {
        title: 'Wellness Terrace',
        detail: 'Yoga at sunrise, light stretching in the evening.',
      },
      {
        title: 'Private Dining',
        detail: 'Chef-selected menu served in-room or in the lounge area.',
      },
    ],
    servicesPage: {
      label: 'Services',
      title: "Za'faron Premium Hotel — all services",
      description:
        'Throughout the day we offer gentle services: morning coffee, wellness, private dining, and more.',
      summaryTitle: '{count} services',
      summarySubtitle: 'Calm rituals with thoughtful care.',
    },
    restaurantsPage: {
      label: 'Restaurants',
      title: "Za'faron Premium Hotel — all restaurants",
      description:
        'Each restaurant has its own mood and flavor. Discover our cuisine in a calm, elegant rhythm.',
      empty: 'No restaurants yet.',
      loadError: 'Failed to load restaurants.',
      menuLoadError: 'Failed to load menus.',
      menuEmpty: 'No menu items yet.',
    },
    cta: {
      label: 'We are waiting for you',
      title: "Za'faron Premium Hotel — book your stay now",
      description:
        'A quiet space, gentle service, and modern design — a new address in the Chimgan mountains.',
      book: 'Book now',
      ask: 'Ask a question',
    },
    roomsPage: {
      label: 'Rooms',
      title: "Za'faron Premium Hotel — all rooms",
      description:
        'Each room blends natural tones and modern minimalism. Choose your favorite for a quiet stay, high service, and calm interior.',
      book: 'Book now',
      home: 'Home',
      summaryTitle: '6 room types',
      summarySubtitle: 'Premium, calm, and modern comfort.',
      startBooking: 'Start booking',
    },
  },
}

const supportedLocaleCodes = supportedLocales.map((locale) => locale.code)

const getStartingLocale = () => {
  if (typeof window === 'undefined') {
    return 'uz'
  }

  const storedLocale = window.localStorage.getItem('locale')
  if (supportedLocaleCodes.includes(storedLocale)) {
    return storedLocale
  }

  const browserLocale = window.navigator?.language?.split('-')[0]
  if (supportedLocaleCodes.includes(browserLocale)) {
    return browserLocale
  }

  return 'uz'
}

export const i18n = createI18n({
  legacy: false,
  locale: getStartingLocale(),
  fallbackLocale: 'uz',
  globalInjection: true,
  messages,
})
