import { createI18n } from 'vue-i18n'

import amenityService from './assets/images/slide-images/8.jpg'
import spa1 from './assets/images/services/spa1.jpg'
import spa2 from './assets/images/services/spa2.jpg'
import spa3 from './assets/images/services/spa3.jpg'
import spa4 from './assets/images/services/spa4.jpg'
import spa5 from './assets/images/services/spa5.jpg'
import servicePlayground from './assets/images/services/playground.jpg'
import gymOne from './assets/images/services/zal1.jpg'
import gymTwo from './assets/images/services/zal2.jpg'
import serviceRestaurantOne from './assets/images/services/restaurant1.jpg'
import serviceRestaurantTwo from './assets/images/services/restaurant2.jpg'
import serviceRestaurantThree from './assets/images/services/restaurant3.jpg'
import restaurantAlaCarteOne from './assets/images/services/alcarte.jpg'
import restaurantAlaCarteTwo from './assets/images/services/alcarte2.jpg'
import chay from './assets/images/product-images/chay.jpg'
import med from './assets/images/product-images/med.jpeg'
import navat from './assets/images/product-images/navat.jpg'
import shafran from './assets/images/product-images/shafran.jpg'
import sol from './assets/images/product-images/sol.webp'

export const supportedLocales = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
]

const messages = {
  uz: {
    creat: 'EDev tomonidan yaratilgan',
    brand: "Za'faron Premium Hotel",
    nav: {
      home: 'Bosh sahifa',
      rooms: 'Xonalar',
      restaurants: 'Restoranlar',
      services: 'Xizmatlar',
      contacts: 'Kontaktlar',
      amenities: 'Xizmatlar',
      contact: 'Aloqa',
      all: 'Hammasi',
      language: 'Til',
    },
    actions: {
      book: 'Bron qilish',
      viewRooms: 'Xonalarni ko‘rish',
      viewAll: 'Hammasini ko‘rish',
      viewRestaurants: 'Restoranlarni ko‘rish',
      startBooking: 'Bronni boshlash',
      ask: 'Savol berish',
      home: 'Asosiy sahifa',
    },
    common: {
      phoneLabel: 'Telefon:',
      emailLabel: 'Email:',
      logoAlt: 'Logo',
      loading: 'Yuklanmoqda...',
      menu: 'Menyu',
      close: 'Yopish',
      toggleMenu: 'Menyuni ochish',
      create: 'Yaratish',
      update: 'Yangilash',
      delete: "O'chirish",
      refresh: 'Yangilash',
      logout: 'Chiqish',
      login: 'Kirish',
      saving: 'Saqlanmoqda...',
      cancel: 'Bekor qilish',
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
      rooms: {
        add: 'Yana xona qo‘shish',
        remove: 'Xonani olib tashlash',
      },
      viewOption: {
        label: "Tog' tomonga qaragan deraza",
        yes: 'Ha',
        no: "Yo'q",
        feeLabel: "Tog' manzarasi qo'shimchasi",
      },
      pricing: {
        title: 'Narxlar',
        nights: '{count} tun',
        weekdayPrice: 'Hafta kunlari narxi',
        weekendPrice: 'Dam olish kunlari narxi',
        weekdayNights: 'Hafta tunlari',
        weekendNights: 'Dam olish tunlari',
        total: 'Jami',
      },
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
      roomUnavailable: 'Band',
      calendar: {
        title: 'Xona bandlik taqvimi',
        availability: 'Bandlik',
        open: 'Ochiq',
        closed: 'Band',
        hint: "Kalendarni ko'rish uchun xonani tanlang.",
        loading: 'Bandlik yuklanmoqda...',
        error: 'Bandlikni yuklab bo‘lmadi.',
      },
      email: 'Elektron pochta',
      emailPlaceholder: 'example',
      submit: 'Bronni yuborish',
      status: {
        required: 'Barcha maydonlarni toʻldiring.',
        invalidDate: 'Sana formatini tekshiring.',
        dateOrder: 'Ketish sanasi kirish sanasidan keyin boʻlishi kerak.',
        roomUnavailable: 'Bu kun bu xona band.',
        sendFailed: 'Bronni yuborib boʻlmadi. Iltimos, qayta urinib koʻring.',
        success:
          'Bron qabul qilindi. {guests} mehmon uchun tasdiq xabarini tezda yuboramiz.',
      },
      successModal: {
        title: 'Sizning broningiz yuborildi',
        description: "Tez orada siz bilan bog'lanamiz.",
        back: 'Ortga',
      },
      errors: {
        availabilityLoadFailed: 'Bandlikni yuklab bo‘lmadi.',
        telegramConfigMissing: 'Telegram sozlamalari topilmadi.',
        telegramSendFailed: 'Telegramga yuborib bo‘lmadi.',
      },
      message: {
        title: 'Yangi bron so‘rovi',
        name: 'Ism: {value}',
        phone: 'Telefon: {value}',
        email: 'Email: {value}',
        checkIn: 'Kirish: {value}',
        checkOut: 'Ketish: {value}',
        nights: 'Tunlar: {value}',
        roomsTitle: 'Xonalar:',
        roomUnknown: 'Noma’lum xona',
        stayLabel: '{nights} tun',
        stayUnknown: 'tun noma’lum',
        viewYes: 'Ha',
        viewNo: "Yo'q",
        roomLine: '- {roomName} • {guests} mehmon • {stay} • Manzara: {view}',
        total: 'Jami: {total}',
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
    tourSection: {
      label: '360 tur',
      title: "Mehmonxonani 360 formatda ko'ring",
      description:
        'Virtual sayr orqali lobby, xonalar va manzarani oldindan his qiling.',
      action: '360 turni ochish',
      note: 'Katta ekranda yanada qulay.',
      iframeTitle: "Za'faron Premium Hotel 360 tour",
    },
    mapSection: {
      contactsLabel: 'Kontaktlar',
      title: "Biz bilan bog'laning",
      formLabel: 'Izoh qoldirish',
      formNote:
        'Mehmonxonadan ketayotgan mehmonlar uchun individual taklif: portal yoki saytda fikr-mulohaza bildirish.',
      form: {
        nameLabel: 'Ism',
        namePlaceholder: 'Ismingiz',
        phoneLabel: 'Telefon raqam',
        phonePlaceholder: '+998 90 000 00 00',
        noteLabel: 'Izoh',
        notePlaceholder: 'Izohingizni yozing',
        submit: 'Yuborish',
      },
    },
    aboutNetwork: {
      label: 'Kompaniya haqida',
      title: 'Anʼanalar va mukammallik uchrashgan makon',
      description:
        'BMB Zaʼfaron restoran va mehmonxonalar tarmogʻi milliy, yevropa va turk anʼanalarini uygʻunlashtirgan nafis oshxona hamda benuqson servisni taklif etadi. Toshkent va Jizzaxdagi filiallarimiz mahalliy va xorijiy mehmonlar uchun xalqaro standartlarga mos sharoit yaratadi.',
      hotelLabel: 'Mehmonxona haqida',
      hotelTitle: 'Premium darajadagi qulaylik va xavfsiz dam olish',
      hotelDescription:
        'Zaʼfaron Premium Hotel — yuqori sifatli xizmat, zamonaviy infratuzilma va qulay muhitni o‘zida mujassam etgan premium toifadagi mehmonxona. Mehmonlar uchun qulay, xavfsiz va unutilmas dam olish imkoniyatlarini taqdim etadi. Mehmonxona oilaviy hordiq, biznes safarlari, sog‘lomlashtirish va maroqli dam olish uchun ideal tanlov hisoblanadi.',
      hotelCapacity: 'Mehmonxona bir vaqtning o‘zida 202 nafargacha mehmonni qabul qiladi.',
      gallery: [
        { alt: 'Keng lobbi hududi' },
        { alt: 'Nafis taomlar taqdimi' },
        { alt: 'Tadbirlar muhiti' },
        { alt: 'Qulay xonalar' },
      ],
      hotelBlocks: [
        {
          title: 'Xonalar fondi',
          items: [
            'Jami 106 ta zamonaviy va to‘liq jihozlangan xona.',
            '1 ta maxsus nogironlar uchun moslashtirilgan xona.',
            '55 ta Standart Twin — alohida yotoqlar bilan.',
            '49 ta Standart Double — keng va qulay joylashuv.',
            '9 ta Lyuks xona — yuqori darajadagi qulaylik va hashamat.',
            'Qulay yotoqlar, shaxsiy hammom, iqlim nazorati, TV, seyf, Wi-Fi va kundalik tozalash xizmati.',
          ],
        },
        {
          title: 'Ovqatlanish va gastronomiya',
          items: [
            '2 ta zamonaviy restoran, umumiy sig‘imi 250 kishi.',
            'Buffet restorani — nonushta va taomlar uchun boy tanlov.',
            'A la carte — milliy va xalqaro oshxona buyurtma asosida.',
            'Lobby bar 24/7 — ichimliklar, yengil gazaklar va dam olish muhiti.',
          ],
        },
        {
          title: 'SPA & Wellness',
          items: [
            'Yozgi va qishki mavsum basseynlari.',
            'Turk hammomi (Hamam).',
            'Sauna va bug‘ xonalari.',
            'Professional massaj xonalari.',
          ],
        },
        {
          title: 'Dam olish va qulayliklar',
          items: [
            'Bolalar uchun maxsus o‘yingoh.',
            'Zamonaviy sport zali (Fitness Center).',
            'Reception xizmati 24/7 — doimiy yordam va maslahat.',
            'Zaʼfaron brendi mahsulotlarini xarid qilish imkoniyati.',
            'Yuqori darajadagi xizmat va mehmondo‘st muhit.',
          ],
        },
        {
          title: 'Bizning ustunliklarimiz',
          items: [
            'Premium xizmat sifati.',
            'Zamonaviy va qulay infratuzilma.',
            'Oilaviy va biznes mehmonlar uchun mos muhit.',
            'Sog‘lomlashtirish va hordiq uchun SPA & Wellness zonasi.',
            'Professional va e’tiborli xodimlar jamoasi.',
          ],
        },
      ],
      advantages: {
        label: 'Afzalliklar',
        title: 'Xalqaro standartlarga mos sifat',
        badge: 'Yiliga 30 000+ mehmon',
        items: [
          {
            title: 'Yuqori servis darajasi',
            text:
              'BMB Zaʼfaron tarmogʻi mehmonlarga qulaylik va komfort beruvchi xalqaro standartlarga mos xizmatni taʼminlaydi.',
          },
          {
            title: 'Taʼmlar xilma-xilligi',
            text:
              'Milliy, yevropa, turk taomlari va noyob zaʼfaron retseptlari eng talabchan mehmonlar didini ham qondiradi.',
          },
          {
            title: 'Mehmonlar eʼtirofi',
            text:
              'Har yili 30 000 dan ortiq mamnun mijozlar mukammallikka bo‘lgan intilishimizni tasdiqlaydi.',
          },
        ],
      },
      hospitality: {
        label: 'Mehmondoʼstlik va nafis oshxona uygʼunligi',
        items: [
          {
            title: 'Mehmonxona xizmatlari',
            text: 'Mahalliy va xorijiy mehmonlarni qulay sharoitda joylashtirish.',
          },
          {
            title: 'Restoran servisi',
            text: 'Tajribali shef-oshpazlar tayyorlagan nafis taomlar taqdimi.',
          },
          {
            title: 'Tadbirlar tashkiloti',
            text: 'Banketlar, konferensiyalar va bayramlarni har qanday darajada o‘tkazish.',
          },
          {
            title: 'Turistik xizmatlar',
            text: 'Sayohatchilar uchun betakror sharoitlar yaratish.',
          },
        ],
      },
      services: {
        label: 'Xizmatlar',
        title: 'Qulayligingiz uchun kompleks yechimlar',
        items: [
          {
            title: 'Mehmonxona joylashuvi',
            text: 'Keng xonalar, 24/7 xizmat va yuqori darajadagi servis.',
          },
          {
            title: 'Restoran menyusi',
            text: 'Anʼanaviy va zamonaviy oshxonaning noyob uygʻunligi.',
          },
          {
            title: 'Tadbirlar tashkiloti',
            text: 'Ishbilarmon va shaxsiy uchrashuvlar uchun professional yordam.',
          },
        ],
      },
      partnership: {
        label: 'Hamkorlik',
        title: 'Oʼzaro muvaffaqiyat uchun ishonchli hamkorlik',
        items: [
          {
            title: 'Sohadagi tajriba',
            text:
              'Mehmonxona va restoran biznesidagi ko‘p yillik tajriba professionalizmimizni tasdiqlaydi.',
          },
          {
            title: 'Sifat kafolati',
            text: 'Har bir xizmatda jahon standartlari.',
          },
          {
            title: 'Qo‘llab-quvvatlash va rivojlanish',
            text: 'Hamkorlikdagi o‘sish va aloqalarni mustahkamlashga intilamiz.',
          },
        ],
      },
    },
    amenities: [
      {
        title: 'A la carte restoran',
        detail:
          'Shef tanlagan taomlar, mahalliy va yevropa oshxonasining nafis uyg‘unligi bilan taqdim etiladi. Har bir taom buyurtma asosida yangi tayyorlanib, taʼm va ko‘rinish muvozanatini saqlaydi. Yumshoq yorug‘lik, jimgina musiqa va samimiy servis kechani unutilmas qiladi. Sharob kartasi va desertlar esa taʼm yakunini mukammal qiladi.',
        image: restaurantAlaCarteOne,
        imageAlt: 'A la carte restoran muhit',
        images: [
          { src: restaurantAlaCarteOne, alt: 'A la carte taomlar' },
          { src: restaurantAlaCarteTwo, alt: 'Nafis taqdimot' },
        ],
      },
      {
        title: 'Spa zonalari',
        detail:
          'Basseynlarda tongdan kechgacha suzish va tog‘ manzarasida dam olish mumkin. Turk hammomi va sauna tanani yengillashtirib, hushyorlik beradi. Professional massajlar esa mushaklarni bo‘shashtirib, ichki sokinlikni tiklaydi. Har bir hududda tozalik, iliq harorat va eʼtiborli servis kutadi.',
        image: amenityService,
        imageAlt: 'Spa zonalari',
        images: [
          { src: spa1, alt: 'Panoramali basseyn' },
          { src: spa2, alt: 'Turk hammomi' },
          { src: spa3, alt: 'Massaj xonasi' },
          { src: spa4, alt: 'Massaj xonasi' },
          { src: spa5, alt: 'Massaj xonasi' },
        ],
      },
      {
        title: "Bolalar o'yingohi",
        detail:
          "Bolalar uchun maxsus o'yingoh xavfsiz va qulay muhitda tashkil etilgan. Rang-barang o'yinchoqlar, yumshoq qoplamalar va qulay zonalar kichkintoylarga quvonch bag'ishlaydi. Ota-onalar esa yaqin hududda bemalol dam olishlari mumkin. Har kuni tozalash va nazorat orqali sokin, toza muhit ta'minlanadi.",
        image: servicePlayground,
        imageAlt: "Bolalar o'yingohi",
      },
      {
        title: 'Fitnes zona',
        detail:
          'Zamonaviy trenajorlar, erkin vaznlar va kardio uskunalari bilan jihozlangan sport zali. Tonggi energiya yoki kechki mashg‘ulot uchun qulay muhit yaratilgan. Mutanosib yoritish, shamollatish va toza havo mashg‘ulotni yanada yoqimli qiladi. Ixtiyoriy sport dasturlari bilan sog‘lom ritmni ushlab turing.',
        image: gymOne,
        imageAlt: 'Fitnes zona',
        images: [
          { src: gymOne, alt: 'Fitnes trenajorlari' },
          { src: gymTwo, alt: 'Sport zali' },
        ],
      },
      {
        title: "Za'faron Restaurant",
        detail:
          "Za'faron Restaurant — milliy va yevropa taomlari uyg‘unligini taklif etuvchi nafis maskan. Nonushta va kechki ovqat paytida keng menyu, yangi mahsulotlar va muvozanatli taʼm sizni kutadi. Yorug‘, keng interyer va sokin musiqa muhiti dam olishni yanada yoqimli qiladi. Har bir xizmatda eʼtiborli servis va nozik taqdimot ustuvor.",
        image: serviceRestaurantOne,
        imageAlt: "Za'faron Restaurant interyeri",
        images: [
          { src: serviceRestaurantOne, alt: "Za'faron Restaurant" },
          { src: serviceRestaurantTwo, alt: 'Restaurant taomlari' },
          { src: serviceRestaurantThree, alt: 'Restaurant muhit' },
        ],
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
          price_weekday: 180,
          price_weekend: 180,
          size: '34 m²',
          vibe: 'Yozuv stoli va jimjit hovliga qaragan keng xona.',
          perks: ['Rainfall dushi', 'Qalin pardalar', 'Ortapedik king-size krovat'],
        },
        {
          id: 'zafaron-suite',
          name: "Za'faron Suite",
          price_weekday: 260,
          price_weekend: 260,
          size: '52 m²',
          vibe: 'Keng yashash zonasi va katta panorama oynalar.',
          perks: ['Shaxsiy lounge', 'Kundalik tozalash', 'Shaxsiy minibar'],
        },
        {
          id: 'garden-loft',
          name: 'Garden Loft',
          price_weekday: 320,
          price_weekend: 320,
          size: '64 m²',
          vibe: 'Ikki darajali loft, balkon va yashil panorama.',
          perks: ['Balkon', 'Kutubxona burchagi', 'Kecha aromaterapiya'],
        },
        {
          id: 'city-twin',
          name: 'Mountain Twin',
          price_weekday: 210,
          price_weekend: 210,
          size: '38 m²',
          vibe: "Hamroh bilan sayohatga mos, tog' manzarali ikkita alohida krovat.",
          perks: ["Twin krovatlar", "Tog' manzarasi", 'Ertalabgi kofe xizmati'],
        },
        {
          id: 'executive-corner',
          name: 'Executive Corner',
          price_weekday: 280,
          price_weekend: 280,
          size: '48 m²',
          vibe: 'Burchak xonasi, keng oynalar va jim ish maydoni.',
          perks: ['Burchak panorama', 'Ish stoli', 'Tezkor Wi-Fi'],
        },
        {
          id: 'spa-residence',
          name: 'Spa Residence',
          price_weekday: 410,
          price_weekend: 410,
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
    productsSection: {
      label: 'Bizning mahsulotlar',
      title: "Za'faron mahsulotlari",
      description:
        'Mehmonxonamiz doʻkonida siz uchun tayyorlangan tabiiy va nafis mahsulotlar.',
      nameLabel: 'Mahsulot nomi',
      items: [
        {
          nameUz: "Zafaronli asal",
          nameRu: 'Мёд с шафраном',
          nameEn: 'Honey with saffron',
          image: med,
          imageAlt: "Zafaronli asal",
        },
        {
          nameUz: "Za’faronli novvot",
          nameRu: 'Навват с шафраном',
          nameEn: 'Navvat with saffron',
          image: navat,
          imageAlt: "Za’faronli novvot",
        },
        {
          nameUz: "Zafaronli tuz",
          nameRu: 'Соль с шафраном',
          nameEn: 'Salt with saffron',
          image: sol,
          imageAlt: "Zafaronli tuz",
        },
        {
          nameUz: "Za’faron choyi (qora va ko’k)",
          nameRu: 'Чай Зафарон (чёрный и зелёный)',
          nameEn: 'Zafaron tea (black and green)',
          image: chay,
          imageAlt: "Za’faron choyi (qora va ko’k)",
        },
        {
          nameUz: "Za’faron",
          nameRu: 'Шафран',
          nameEn: 'Saffron',
          image: shafran,
          imageAlt: "Za’faron",
        }
      ],
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
      loadError: 'Xonalarni yuklashda xatolik yuz berdi.',
      book: 'Bron qilish',
      home: 'Asosiy sahifa',
      summaryTitle: '{count} xil xona',
      summarySubtitle: 'Premium, sokin va zamonaviy qulaylik.',
      startBooking: 'Bronni boshlash',
    },
    admin: {
      label: 'Admin',
      loginTitle: 'Admin kirish',
      loginDescription: 'Login qiling, token cookie ichida 60 minutga saqlanadi.',
      username: 'Login',
      password: 'Parol',
      loginButton: 'Kirish',
      loggingIn: 'Kutilmoqda...',
      sections: {
        roomsLabel: 'Xonalar',
        roomsTitle: "Xonalar ro'yxati",
        blocksLabel: 'Band kunlar',
        blocksTitle: "Xonalar bandligi",
        restaurantsLabel: 'Restoranlar',
        restaurantsTitle: "Restoranlar ro'yxati",
        menusLabel: 'Restoran menyulari',
        menusTitle: 'Restoran menyulari',
      },
      labels: {
        id: 'ID',
        restaurantId: 'Restoran ID',
        currentImage: 'Joriy rasm',
      },
      alt: {
        roomImage: 'Xona rasmi',
        restaurantImage: 'Restoran rasmi',
        menuImage: 'Menyu rasmi',
      },
      form: {
        roomNameUz: 'Xona nomi (UZ)',
        roomNameRu: 'Xona nomi (RU)',
        roomNameEn: 'Xona nomi (EN)',
        descriptionUz: 'Tavsif (UZ)',
        descriptionRu: 'Tavsif (RU)',
        descriptionEn: 'Tavsif (EN)',
        priceWeekday: 'Weekday Price',
        priceWeekend: 'Weekend Price',
        roomType: 'Xona turi',
        roomTypePlaceholder: 'Turini tanlang',
        roomImagesOptional: 'Xona rasmlari (ixtiyoriy)',
        blockRoom: 'Xona',
        blockRoomPlaceholder: 'Xonani tanlang',
        blockRoomFallback: 'Xona #{id}',
        blockStart: 'Boshlanish sanasi',
        blockEnd: 'Tugash sanasi',
        nameUz: 'Nomi (UZ)',
        nameRu: 'Nomi (RU)',
        nameEn: 'Nomi (EN)',
        imagesOptional: 'Rasmlar (ixtiyoriy)',
        restaurant: 'Restoran',
        selectRestaurant: 'Restoranni tanlang',
        menuImage: 'Rasm ({requirement})',
      },
      roomTypes: {
        double: 'Double',
        suite: 'Suite',
        lux: 'Lux',
      },
      modals: {
        createRoom: 'Xona yaratish',
        updateRoom: 'Xonani yangilash',
        newRoom: 'Yangi xona',
        createRestaurant: 'Restoran yaratish',
        updateRestaurant: 'Restoranni yangilash',
        newRestaurant: 'Yangi restoran',
        createMenu: 'Menyu yaratish',
        updateMenu: 'Menyuni yangilash',
        newMenu: 'Yangi menyu',
      },
      required: 'majburiy',
      optional: 'ixtiyoriy',
      actions: {
        blockRoom: 'Band qilish',
      },
      errors: {
        roomsLoad: 'Xonalarni yuklashda xatolik yuz berdi.',
        restaurantsLoad: 'Restoranlarni yuklashda xatolik yuz berdi.',
        menusLoad: 'Restoran menyularini yuklashda xatolik yuz berdi.',
        invalidCredentials: "Login yoki parol noto'g'ri.",
        adminNotConfigured: "Admin ma'lumotlari sozlanmagan.",
        loginFailed: 'Login muvaffaqiyatsiz.',
        roomUpdate: 'Xonani yangilashda xatolik yuz berdi.',
        roomCreate: 'Xona yaratishda xatolik yuz berdi.',
        roomDelete: "Xonani o'chirishda xatolik yuz berdi.",
        blocksLoad: 'Band kunlarni yuklashda xatolik yuz berdi.',
        blockCreate: 'Bandlik qo‘shishda xatolik yuz berdi.',
        blockDelete: 'Bandlikni o‘chirishda xatolik yuz berdi.',
        blockRequired: 'Barcha maydonlarni to‘ldiring.',
        blockDateOrder: 'Tugash sanasi boshlanish sanasidan keyin bo‘lishi kerak.',
        invalidPrices: 'Please enter valid prices.',
        restaurantUpdate: 'Restoranni yangilashda xatolik yuz berdi.',
        restaurantCreate: 'Restoran yaratishda xatolik yuz berdi.',
        restaurantDelete: "Restoranni o'chirishda xatolik yuz berdi.",
        menuUpdate: 'Menyuni yangilashda xatolik yuz berdi.',
        menuCreate: 'Menyu yaratishda xatolik yuz berdi.',
        menuDelete: "Menyuni o'chirishda xatolik yuz berdi.",
        menuImageRequired: 'Menyu uchun rasm tanlang.',
      },
      messages: {
        loginSuccess: 'Login muvaffaqiyatli bajarildi.',
        logoutSuccess: 'Siz tizimdan chiqdingiz.',
        roomUpdated: 'Xona muvaffaqiyatli yangilandi.',
        roomCreated: 'Xona muvaffaqiyatli yaratildi.',
        roomDeleted: "Xona o'chirildi.",
        blockCreated: 'Bandlik qo‘shildi.',
        blockDeleted: 'Bandlik o‘chirildi.',
        restaurantUpdated: 'Restoran muvaffaqiyatli yangilandi.',
        restaurantCreated: 'Restoran muvaffaqiyatli yaratildi.',
        restaurantDeleted: "Restoran o'chirildi.",
        menuUpdated: 'Menyu muvaffaqiyatli yangilandi.',
        menuCreated: 'Menyu muvaffaqiyatli yaratildi.',
        menuDeleted: "Menyu o'chirildi.",
      },
      confirm: {
        deleteRoom: 'Xonani o‘chirishni tasdiqlaysizmi?',
        deleteBlock: 'Bandlikni o‘chirishni tasdiqlaysizmi?',
        deleteRestaurant: 'Restoranni o‘chirishni tasdiqlaysizmi?',
        deleteMenu: 'Menyuni o‘chirishni tasdiqlaysizmi?',
      },
      empty: {
        rooms: "Hozircha xonalar yo'q.",
        restaurants: "Hozircha restoranlar yo'q.",
        menus: "Hozircha menyular yo'q.",
        blocks: "Hozircha bandlik yo'q.",
      },
    },
  },
  ru: {
    creat: 'Создано EDev',
    brand: "Za'faron Premium Hotel",
    nav: {
      home: 'Главная',
      rooms: 'Номера',
      restaurants: 'Рестораны',
      services: 'Услуги',
      contacts: 'Контакты',
      amenities: 'Услуги',
      contact: 'Контакты',
      all: 'Все',
      language: 'Язык',
    },
    actions: {
      book: 'Забронировать',
      viewRooms: 'Посмотреть номера',
      viewAll: 'Смотреть все',
      viewRestaurants: 'Посмотреть рестораны',
      startBooking: 'Начать бронь',
      ask: 'Задать вопрос',
      home: 'Главная',
    },
    common: {
      phoneLabel: 'Телефон:',
      emailLabel: 'Email:',
      logoAlt: 'Логотип',
      loading: 'Загрузка...',
      menu: 'Меню',
      close: 'Закрыть',
      toggleMenu: 'Открыть меню',
      create: 'Создать',
      update: 'Обновить',
      delete: 'Удалить',
      refresh: 'Обновить',
      logout: 'Выйти',
      login: 'Войти',
      saving: 'Сохранение...',
      cancel: 'Отмена',
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
      rooms: {
        add: 'Добавить номер',
        remove: 'Удалить номер',
      },
      viewOption: {
        label: 'Окно с видом на горы',
        yes: 'Да',
        no: 'Нет',
        feeLabel: 'Доплата за вид',
      },
      pricing: {
        title: 'Стоимость',
        nights: '{count} ночей',
        weekdayPrice: 'Цена в будни',
        weekendPrice: 'Цена в выходные',
        weekdayNights: 'Будние ночи',
        weekendNights: 'Выходные ночи',
        total: 'Итого',
      },
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
      roomUnavailable: 'Занято',
      calendar: {
        title: 'Календарь занятости',
        availability: 'Занятость',
        open: 'Свободно',
        closed: 'Занято',
        hint: 'Выберите номер, чтобы увидеть занятость.',
        loading: 'Загрузка занятости...',
        error: 'Не удалось загрузить занятость.',
      },
      email: 'Эл. почта',
      emailPlaceholder: 'example',
      submit: 'Отправить бронь',
      status: {
        required: 'Заполните все поля.',
        invalidDate: 'Проверьте формат даты.',
        dateOrder: 'Дата выезда должна быть позже даты заезда.',
        roomUnavailable: 'Эти даты заняты для выбранного номера.',
        sendFailed: 'Не удалось отправить бронь. Пожалуйста, попробуйте снова.',
        success: 'Бронь принята. Скоро отправим подтверждение для {guests} гостей.',
      },
      successModal: {
        title: 'Ваша бронь отправлена',
        description: 'Мы скоро свяжемся с вами.',
        back: 'Назад',
      },
      errors: {
        availabilityLoadFailed: 'Не удалось загрузить занятость.',
        telegramConfigMissing: 'Настройки Telegram отсутствуют.',
        telegramSendFailed: 'Не удалось отправить в Telegram.',
      },
      message: {
        title: 'Новая заявка на бронь',
        name: 'Имя: {value}',
        phone: 'Телефон: {value}',
        email: 'Email: {value}',
        checkIn: 'Заезд: {value}',
        checkOut: 'Выезд: {value}',
        nights: 'Ночей: {value}',
        roomsTitle: 'Номера:',
        roomUnknown: 'Неизвестный номер',
        stayLabel: '{nights} ночей',
        stayUnknown: 'ночей неизвестно',
        viewYes: 'Да',
        viewNo: 'Нет',
        roomLine: '- {roomName} • {guests} гостей • {stay} • Вид: {view}',
        total: 'Итого: {total}',
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
    tourSection: {
      label: '360 тур',
      title: 'Посмотрите отель в формате 360',
      description: 'Виртуальная прогулка по лобби, номерам и видам.',
      action: 'Открыть 360 тур',
      note: 'Лучше смотреть на большом экране.',
      iframeTitle: "Za'faron Premium Hotel 360 тур",
    },
    mapSection: {
      contactsLabel: 'Контакты',
      title: 'Свяжитесь с нами',
      formLabel: 'Оставить комментарий',
      formNote:
        'Индивидуальное приглашение для гостей при выезде, чтобы оставить отзыв на портале или сайте.',
      form: {
        nameLabel: 'Имя',
        namePlaceholder: 'Ваше имя',
        phoneLabel: 'Номер телефона',
        phonePlaceholder: '+998 90 000 00 00',
        noteLabel: 'Комментарий',
        notePlaceholder: 'Напишите ваш комментарий',
        submit: 'Отправить',
      },
    },
    aboutNetwork: {
      label: 'О компании',
      title: 'Пространство, где традиции встречаются с совершенством',
      description:
        'Сеть ресторанов и отелей BMB Za’faron предлагает безупречный сервис и изысканную кухню, сочетающую национальные, европейские и турецкие традиции. Наши филиалы в Ташкенте и Джизаке создают уникальные условия для местных и иностранных гостей, отвечая высоким международным стандартам.',
      hotelLabel: 'О гостинице',
      hotelTitle: 'Премиальный комфорт и безопасный отдых',
      hotelDescription:
        'Za’faron Premium Hotel — отель премиум‑класса с высоким уровнем сервиса, современной инфраструктурой и комфортной атмосферой. Мы создаем условия для удобного, безопасного и незабываемого отдыха. Идеальный выбор для семейных поездок, деловых визитов, оздоровления и отдыха.',
      hotelCapacity: 'Отель способен одновременно принять до 202 гостей.',
      gallery: [
        { alt: 'Просторное лобби отеля' },
        { alt: 'Подача изысканных блюд' },
        { alt: 'Атмосфера мероприятий' },
        { alt: 'Комфортные номера' },
      ],
      hotelBlocks: [
        {
          title: 'Номерной фонд',
          items: [
            'Всего 106 современных и полностью оснащенных номеров.',
            '1 номер, адаптированный для гостей с инвалидностью.',
            '55 стандартных Twin — с раздельными кроватями.',
            '49 стандартных Double — просторные и удобные.',
            '9 номеров люкс — повышенный комфорт и роскошь.',
            'Удобные кровати, личный санузел, климат‑контроль, ТВ, сейф, Wi‑Fi и ежедневная уборка.',
          ],
        },
        {
          title: 'Питание и гастрономия',
          items: [
            '2 современных ресторана общей вместимостью 250 человек.',
            'Buffet ресторан — богатый выбор для завтраков и питания.',
            'A la carte — национальная и международная кухня на заказ.',
            'Lobby bar 24/7 — напитки, легкие закуски и зона отдыха.',
          ],
        },
        {
          title: 'SPA & Wellness',
          items: [
            'Бассейны для летнего и зимнего сезонов.',
            'Турецкий хамам.',
            'Сауна и парные.',
            'Профессиональные массажные кабинеты.',
          ],
        },
        {
          title: 'Отдых и удобства',
          items: [
            'Детская игровая зона.',
            'Современный фитнес‑центр.',
            'Reception 24/7 — помощь и консультации.',
            'Магазин фирменной продукции Za’faron.',
            'Высокий уровень сервиса и гостеприимная атмосфера.',
          ],
        },
        {
          title: 'Наши преимущества',
          items: [
            'Премиальное качество сервиса.',
            'Современная и удобная инфраструктура.',
            'Комфорт для семейных и бизнес‑гостей.',
            'SPA & Wellness зона для отдыха и оздоровления.',
            'Профессиональная и внимательная команда.',
          ],
        },
      ],
      advantages: {
        label: 'Преимущества',
        title: 'Качество, соответствующее международным стандартам',
        badge: '30 000+ гостей ежегодно',
        items: [
          {
            title: 'Высокий уровень сервиса',
            text:
              'Отели и рестораны сети BMB Za’faron соответствуют международным стандартам, обеспечивая комфорт и удобство для каждого гостя.',
          },
          {
            title: 'Разнообразие кулинарных шедевров',
            text:
              'Предлагаем национальные, европейские, турецкие блюда, а также уникальные шафрановые рецепты для самых взыскательных гурманов.',
          },
          {
            title: 'Признание гостей',
            text:
              'Более 30 000 довольных клиентов ежегодно подтверждают наше стремление к совершенству.',
          },
        ],
      },
      hospitality: {
        label: 'Гармония гостеприимства и изысканной кухни',
        items: [
          {
            title: 'Гостиничные услуги',
            text: 'Размещение местных и иностранных гостей в комфортных условиях.',
          },
          {
            title: 'Ресторанный сервис',
            text: 'Подача изысканных блюд, приготовленных опытными шеф-поварами.',
          },
          {
            title: 'Организация мероприятий',
            text: 'Проведение банкетов, конференций и праздников любого уровня.',
          },
          {
            title: 'Туристическое обслуживание',
            text: 'Создание уникальных условий для путешественников.',
          },
        ],
      },
      services: {
        label: 'Услуги',
        title: 'Комплексные решения для вашего комфорта',
        items: [
          {
            title: 'Размещение в отелях',
            text: 'Просторные номера, круглосуточное обслуживание на высшем уровне.',
          },
          {
            title: 'Ресторанное меню',
            text: 'Уникальное сочетание традиционной и современной кухни.',
          },
          {
            title: 'Организация мероприятий',
            text: 'Профессиональная поддержка в проведении деловых и личных встреч.',
          },
        ],
      },
      partnership: {
        label: 'Партнерство',
        title: 'Надёжное сотрудничество для взаимного успеха',
        items: [
          {
            title: 'Опыт в индустрии',
            text:
              'Годы работы в гостиничном и ресторанном бизнесе подтверждают наш профессионализм.',
          },
          {
            title: 'Гарантия качества',
            text: 'Стандарты мирового уровня в каждой услуге.',
          },
          {
            title: 'Поддержка и развитие',
            text: 'Мы стремимся к совместному росту и укреплению деловых связей.',
          },
        ],
      },
    },
    amenities: [
      {
        title: 'A la carte ресторан',
        detail:
          'Авторские блюда от шефа с тонким балансом локальной и европейской кухни. Каждое блюдо готовится под заказ и подаётся свежим, с аккуратной эстетикой вкуса. Мягкий свет, спокойная музыка и внимательный сервис создают камерное настроение. Винная карта и десерты дополняют вечер.',
        image: restaurantAlaCarteOne,
        imageAlt: 'Атмосфера a la carte ресторана',
        images: [
          { src: restaurantAlaCarteOne, alt: 'A la carte блюда' },
          { src: restaurantAlaCarteTwo, alt: 'Нежная подача' }
        ],
      },
      {
        title: 'Spa-зоны',
        detail:
          'Бассейны доступны весь день, чтобы расслабиться с видом на горы. Турецкий хаммам и сауна мягко прогревают и восстанавливают силы. Профессиональные массажи снимают напряжение и возвращают внутреннюю гармонию. В каждой зоне — чистота, комфортная температура и заботливый сервис.',
        image: amenityService,
        imageAlt: 'Spa-зоны',
        images: [
          { src: spa1, alt: 'Панорамный бассейн' },
          { src: spa2, alt: 'Панорамный бассейн' },
          { src: spa3, alt: 'Панорамный бассейн' },
          { src: spa4, alt: 'Панорамный бассейн' },
          { src: spa5, alt: 'Панорамный бассейн' },
        ],
      },
      {
        title: 'Детская игровая',
        detail:
          'Для детей оборудована уютная игровая зона с безопасным пространством. Яркие игрушки, мягкие покрытия и комфортные уголки дарят радость и активность. Родители могут отдыхать рядом, оставаясь на связи с детьми. Ежедневная уборка и контроль обеспечивают чистоту и спокойствие.',
        image: servicePlayground,
        imageAlt: 'Детская игровая',
      },
      {
        title: 'Фитнес-зона',
        detail:
          'Современный зал с тренажёрами, свободными весами и кардио‑оборудованием. Пространство подходит для утренней бодрости и вечерних тренировок. Мягкий свет, вентиляция и чистый воздух делают занятия комфортными. При желании можно выбрать подходящую программу для поддержания формы.',
        image: gymOne,
        imageAlt: 'Фитнес-зона',
        images: [
          { src: gymOne, alt: 'Фитнес тренажёры' },
          { src: gymTwo, alt: 'Спортивный зал' },
        ],
      },
      {
        title: "Za'faron Restaurant",
        detail:
          "Za'faron Restaurant — элегантное пространство с сочетанием национальной и европейской кухни. Завтраки и ужины подаются по расширенному меню из свежих ингредиентов с выверенным вкусом. Светлый интерьер и спокойная музыка создают уютную атмосферу. Внимательный сервис и изящная подача сопровождают каждый приём пищи.",
        image: serviceRestaurantOne,
        imageAlt: "Интерьер Za'faron Restaurant",
        images: [
          { src: serviceRestaurantOne, alt: "Za'faron Restaurant" },
          { src: serviceRestaurantTwo, alt: 'Блюда ресторана' },
          { src: serviceRestaurantThree, alt: 'Атмосфера ресторана' },
        ],
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
          price_weekday: 180,
          price_weekend: 180,
          size: '34 м²',
          vibe: 'Просторный номер с видом на тихий двор и рабочим столом.',
          perks: ['Душ Rainfall', 'Плотные шторы', 'Ортопедическая кровать king-size'],
        },
        {
          id: 'zafaron-suite',
          name: "Za'faron Suite",
          price_weekday: 260,
          price_weekend: 260,
          size: '52 м²',
          vibe: 'Просторная гостиная зона и большие панорамные окна.',
          perks: ['Личный лаундж', 'Ежедневная уборка', 'Личный мини-бар'],
        },
        {
          id: 'garden-loft',
          name: 'Garden Loft',
          price_weekday: 320,
          price_weekend: 320,
          size: '64 м²',
          vibe: 'Двухуровневый лофт, балкон и зелёная панорама.',
          perks: ['Балкон', 'Уголок библиотеки', 'Ночная ароматерапия'],
        },
        {
          id: 'city-twin',
          name: 'Mountain Twin',
          price_weekday: 210,
          price_weekend: 210,
          size: '38 м²',
          vibe: 'Две отдельные кровати с видом на горы — идеально для поездки вдвоём.',
          perks: ['Кровати twin', 'Вид на горы', 'Утренний кофе'],
        },
        {
          id: 'executive-corner',
          name: 'Executive Corner',
          price_weekday: 280,
          price_weekend: 280,
          size: '48 м²',
          vibe: 'Угловой номер с широкими окнами и тихой рабочей зоной.',
          perks: ['Угловая панорама', 'Рабочий стол', 'Быстрый Wi-Fi'],
        },
        {
          id: 'spa-residence',
          name: 'Spa Residence',
          price_weekday: 410,
          price_weekend: 410,
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
    productsSection: {
      label: 'Наши продукты',
      title: "Продукты Za'faron",
      description:
        'Натуральные и изысканные продукты, которые можно найти в нашем бутике.',
      nameLabel: 'Название продукта',
      items: [
        {
          nameUz: "Zafaronli asal",
          nameRu: 'Мёд с шафраном',
          nameEn: 'Honey with saffron',
          image: med,
          imageAlt: "Zafaronli asal",
        },
        {
          nameUz: "Za’faronli novvot",
          nameRu: 'Навват с шафраном',
          nameEn: 'Navvat with saffron',
          image: navat,
          imageAlt: "Za’faronli novvot",
        },
        {
          nameUz: "Zafaronli tuz",
          nameRu: 'Соль с шафраном',
          nameEn: 'Salt with saffron',
          image: sol,
          imageAlt: "Zafaronli tuz",
        },
        {
          nameUz: "Za’faron choyi (qora va ko’k)",
          nameRu: 'Чай Зафарон (чёрный и зелёный)',
          nameEn: 'Zafaron tea (black and green)',
          image: chay,
          imageAlt: "Za’faron choyi (qora va ko’k)",
        },
        {
          nameUz: "Za’faron",
          nameRu: 'Шафран',
          nameEn: 'Saffron',
          image: shafran,
          imageAlt: "Za’faron",
        }
      ],
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
      loadError: 'Ошибка при загрузке номеров.',
      book: 'Забронировать',
      home: 'Главная',
      summaryTitle: '{count} типов номеров',
      summarySubtitle: 'Премиальные, спокойные и современные удобства.',
      startBooking: 'Начать бронь',
    },
    admin: {
      label: 'Админ',
      loginTitle: 'Вход администратора',
      loginDescription: 'Войдите, токен хранится в cookie 60 минут.',
      username: 'Логин',
      password: 'Пароль',
      loginButton: 'Войти',
      loggingIn: 'Ожидание...',
      sections: {
        roomsLabel: 'Номера',
        roomsTitle: 'Список номеров',
        blocksLabel: 'Занятые даты',
        blocksTitle: 'Занятость номеров',
        restaurantsLabel: 'Рестораны',
        restaurantsTitle: 'Список ресторанов',
        menusLabel: 'Меню ресторанов',
        menusTitle: 'Меню ресторанов',
      },
      labels: {
        id: 'ID',
        restaurantId: 'ID ресторана',
        currentImage: 'Текущее изображение',
      },
      alt: {
        roomImage: 'Фото номера',
        restaurantImage: 'Фото ресторана',
        menuImage: 'Фото меню',
      },
      empty: {
        rooms: 'Пока номеров нет.',
        restaurants: 'Пока ресторанов нет.',
        menus: 'Пока меню нет.',
        blocks: 'Пока занятых дат нет.',
      },
      form: {
        roomNameUz: 'Название номера (UZ)',
        roomNameRu: 'Название номера (RU)',
        roomNameEn: 'Название номера (EN)',
        descriptionUz: 'Описание (UZ)',
        descriptionRu: 'Описание (RU)',
        descriptionEn: 'Описание (EN)',
        priceWeekday: 'Weekday Price',
        priceWeekend: 'Weekend Price',
        roomType: 'Тип номера',
        roomTypePlaceholder: 'Выберите тип',
        roomImagesOptional: 'Фото номера (необязательно)',
        blockRoom: 'Номер',
        blockRoomPlaceholder: 'Выберите номер',
        blockRoomFallback: 'Номер #{id}',
        blockStart: 'Дата начала',
        blockEnd: 'Дата окончания',
        nameUz: 'Название (UZ)',
        nameRu: 'Название (RU)',
        nameEn: 'Название (EN)',
        imagesOptional: 'Изображения (необязательно)',
        restaurant: 'Ресторан',
        selectRestaurant: 'Выберите ресторан',
        menuImage: 'Изображение ({requirement})',
      },
      roomTypes: {
        double: 'Double',
        suite: 'Suite',
        lux: 'Lux',
      },
      modals: {
        createRoom: 'Создать номер',
        updateRoom: 'Обновить номер',
        newRoom: 'Новый номер',
        createRestaurant: 'Создать ресторан',
        updateRestaurant: 'Обновить ресторан',
        newRestaurant: 'Новый ресторан',
        createMenu: 'Создать меню',
        updateMenu: 'Обновить меню',
        newMenu: 'Новое меню',
      },
      required: 'обязательно',
      optional: 'необязательно',
      actions: {
        blockRoom: 'Забронировать',
      },
      errors: {
        roomsLoad: 'Ошибка при загрузке номеров.',
        restaurantsLoad: 'Ошибка при загрузке ресторанов.',
        menusLoad: 'Ошибка при загрузке меню.',
        invalidCredentials: 'Неверный логин или пароль.',
        adminNotConfigured: 'Данные администратора не настроены.',
        loginFailed: 'Не удалось войти.',
        roomUpdate: 'Ошибка при обновлении номера.',
        roomCreate: 'Ошибка при создании номера.',
        roomDelete: 'Ошибка при удалении номера.',
        blocksLoad: 'Ошибка при загрузке занятых дат.',
        blockCreate: 'Ошибка при добавлении занятости.',
        blockDelete: 'Ошибка при удалении занятости.',
        blockRequired: 'Заполните все поля.',
        blockDateOrder: 'Дата окончания должна быть позже даты начала.',
        invalidPrices: 'Please enter valid prices.',
        restaurantUpdate: 'Ошибка при обновлении ресторана.',
        restaurantCreate: 'Ошибка при создании ресторана.',
        restaurantDelete: 'Ошибка при удалении ресторана.',
        menuUpdate: 'Ошибка при обновлении меню.',
        menuCreate: 'Ошибка при создании меню.',
        menuDelete: 'Ошибка при удалении меню.',
        menuImageRequired: 'Выберите изображение для меню.',
      },
      messages: {
        loginSuccess: 'Вход выполнен успешно.',
        logoutSuccess: 'Вы вышли из системы.',
        roomUpdated: 'Номер успешно обновлен.',
        roomCreated: 'Номер успешно создан.',
        roomDeleted: 'Номер удален.',
        blockCreated: 'Занятость добавлена.',
        blockDeleted: 'Занятость удалена.',
        restaurantUpdated: 'Ресторан успешно обновлен.',
        restaurantCreated: 'Ресторан успешно создан.',
        restaurantDeleted: 'Ресторан удален.',
        menuUpdated: 'Меню успешно обновлено.',
        menuCreated: 'Меню успешно создано.',
        menuDeleted: 'Меню удалено.',
      },
      confirm: {
        deleteRoom: 'Подтвердите удаление номера?',
        deleteBlock: 'Подтвердите удаление занятости?',
        deleteRestaurant: 'Подтвердите удаление ресторана?',
        deleteMenu: 'Подтвердите удаление меню?',
      },
    },
  },
  en: {
    creat: 'Created by EDev',
    brand: "Za'faron Premium Hotel",
    nav: {
      home: 'Home',
      rooms: 'Rooms',
      restaurants: 'Restaurants',
      services: 'Services',
      contacts: 'Contacts',
      amenities: 'Amenities',
      contact: 'Contact',
      all: 'All',
      language: 'Language',
    },
    actions: {
      book: 'Book now',
      viewRooms: 'View rooms',
      viewAll: 'View all',
      viewRestaurants: 'View restaurants',
      startBooking: 'Start booking',
      ask: 'Ask a question',
      home: 'Home',
    },
    common: {
      phoneLabel: 'Phone:',
      emailLabel: 'Email:',
      logoAlt: 'Logo',
      loading: 'Loading...',
      menu: 'Menu',
      close: 'Close',
      toggleMenu: 'Toggle menu',
      create: 'Create',
      update: 'Update',
      delete: 'Delete',
      refresh: 'Refresh',
      logout: 'Log out',
      login: 'Log in',
      saving: 'Saving...',
      cancel: 'Cancel',
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
      rooms: {
        add: 'Add room',
        remove: 'Remove room',
      },
      viewOption: {
        label: 'Mountain view window',
        yes: 'Yes',
        no: 'No',
        feeLabel: 'View surcharge',
      },
      pricing: {
        title: 'Pricing',
        nights: '{count} nights',
        weekdayPrice: 'Weekday price',
        weekendPrice: 'Weekend price',
        weekdayNights: 'Weekday nights',
        weekendNights: 'Weekend nights',
        total: 'Total',
      },
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
      roomUnavailable: 'Unavailable',
      calendar: {
        title: 'Room availability calendar',
        availability: 'Availability',
        open: 'Open',
        closed: 'Booked',
        hint: 'Select a room to see availability.',
        loading: 'Loading availability...',
        error: 'Unable to load availability.',
      },
      email: 'Email',
      emailPlaceholder: 'example',
      submit: 'Submit booking',
      status: {
        required: 'Please fill out all fields.',
        invalidDate: 'Check the date format.',
        dateOrder: 'Check-out must be after check-in.',
        roomUnavailable: 'These dates are unavailable for this room.',
        sendFailed: 'Unable to send the booking. Please try again.',
        success: "Booking received. We'll send confirmation for {guests} guests shortly.",
      },
      successModal: {
        title: 'Your booking has been sent',
        description: "We'll contact you shortly.",
        back: 'Back',
      },
      errors: {
        availabilityLoadFailed: 'Unable to load availability.',
        telegramConfigMissing: 'Telegram configuration missing.',
        telegramSendFailed: 'Telegram send failed.',
      },
      message: {
        title: 'New booking request',
        name: 'Name: {value}',
        phone: 'Phone: {value}',
        email: 'Email: {value}',
        checkIn: 'Check-in: {value}',
        checkOut: 'Check-out: {value}',
        nights: 'Nights: {value}',
        roomsTitle: 'Rooms:',
        roomUnknown: 'Unknown room',
        stayLabel: '{nights} nights',
        stayUnknown: 'nights unknown',
        viewYes: 'Yes',
        viewNo: 'No',
        roomLine: '- {roomName} • {guests} guests • {stay} • View: {view}',
        total: 'Total: {total}',
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
    tourSection: {
      label: '360 tour',
      title: 'Explore the hotel in 360',
      description: 'Take a virtual walk through the lobby, rooms, and views.',
      action: 'Open 360 tour',
      note: 'Best viewed on a larger screen.',
      iframeTitle: "Za'faron Premium Hotel 360 tour",
    },
    mapSection: {
      contactsLabel: 'Contacts',
      title: 'Get in touch',
      formLabel: 'Leave a note',
      formNote:
        'A personalized invitation for departing guests to share feedback on the portal or website.',
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your name',
        phoneLabel: 'Phone number',
        phonePlaceholder: '+998 90 000 00 00',
        noteLabel: 'Message',
        notePlaceholder: 'Write your message',
        submit: 'Send',
      },
    },
    aboutNetwork: {
      label: 'About the company',
      title: 'A space where tradition meets excellence',
      description:
        "BMB Za’faron’s network of restaurants and hotels offers impeccable service and refined cuisine that blends national, European, and Turkish traditions. Our branches in Tashkent and Jizzakh create unique conditions for local and international guests, meeting high international standards.",
      hotelLabel: 'About the hotel',
      hotelTitle: 'Premium comfort with a safe, memorable stay',
      hotelDescription:
        "Za’faron Premium Hotel is a premium-class hotel with high-quality service, modern infrastructure, and a comfortable atmosphere. We provide convenient, safe, and unforgettable stays for guests. It is an ideal choice for family vacations, business trips, wellness, and leisure.",
      hotelCapacity: 'The hotel can accommodate up to 202 guests at a time.',
      gallery: [
        { alt: 'Spacious hotel lobby' },
        { alt: 'Refined dish presentation' },
        { alt: 'Event atmosphere' },
        { alt: 'Comfortable rooms' },
      ],
      hotelBlocks: [
        {
          title: 'Room inventory',
          items: [
            '106 modern, fully equipped rooms in total.',
            '1 accessible room for guests with disabilities.',
            '55 Standard Twin rooms with separate beds.',
            '49 Standard Double rooms with spacious layouts.',
            '9 Luxury rooms with elevated comfort and amenities.',
            'Comfortable beds, private bathroom, climate control, TV, safe, Wi-Fi, and daily housekeeping.',
          ],
        },
        {
          title: 'Dining and gastronomy',
          items: [
            'Two modern restaurants with a total capacity of 250 guests.',
            'Buffet restaurant with a rich breakfast and dining selection.',
            'A la carte restaurant featuring national and international cuisine.',
            'Lobby bar open 24/7 with drinks, light snacks, and a lounge atmosphere.',
          ],
        },
        {
          title: 'SPA & Wellness',
          items: [
            'Indoor and outdoor seasonal pools.',
            'Turkish hammam.',
            'Sauna and steam rooms.',
            'Professional massage rooms.',
          ],
        },
        {
          title: 'Leisure and amenities',
          items: [
            'Dedicated children’s play area.',
            'Modern fitness center.',
            'Reception service 24/7 for support and guidance.',
            "Opportunity to purchase Za’faron branded products.",
            'High service standards and a welcoming atmosphere.',
          ],
        },
        {
          title: 'Our advantages',
          items: [
            'Premium service quality.',
            'Modern, comfortable infrastructure.',
            'Ideal for family and business travelers.',
            'SPA & Wellness area for rest and recovery.',
            'Professional and attentive staff.',
          ],
        },
      ],
      advantages: {
        label: 'Advantages',
        title: 'Quality aligned with international standards',
        badge: '30,000+ guests yearly',
        items: [
          {
            title: 'High service standards',
            text:
              'BMB Za’faron hotels and restaurants meet international standards, ensuring comfort and convenience for every guest.',
          },
          {
            title: 'Diverse culinary masterpieces',
            text:
              'We offer national, European, and Turkish dishes, along with unique saffron recipes for discerning gourmets.',
          },
          {
            title: 'Guest recognition',
            text:
              'Over 30,000 satisfied guests each year affirm our commitment to excellence.',
          },
        ],
      },
      hospitality: {
        label: 'Harmony of hospitality and fine cuisine',
        items: [
          {
            title: 'Hotel services',
            text: 'Comfortable accommodation for local and international guests.',
          },
          {
            title: 'Restaurant service',
            text: 'Serving exquisite dishes prepared by experienced chefs.',
          },
          {
            title: 'Event management',
            text: 'Hosting banquets, conferences, and celebrations of any scale.',
          },
          {
            title: 'Tourist services',
            text: 'Creating unique experiences for travelers.',
          },
        ],
      },
      services: {
        label: 'Services',
        title: 'Comprehensive solutions for your comfort',
        items: [
          {
            title: 'Hotel accommodation',
            text: 'Spacious rooms and 24/7 service at the highest level.',
          },
          {
            title: 'Restaurant menu',
            text: 'A unique mix of traditional and modern cuisine.',
          },
          {
            title: 'Event organization',
            text: 'Professional support for business and personal gatherings.',
          },
        ],
      },
      partnership: {
        label: 'Partnership',
        title: 'Reliable cooperation for mutual success',
        items: [
          {
            title: 'Industry experience',
            text:
              'Years of work in the hotel and restaurant business confirm our professionalism.',
          },
          {
            title: 'Quality assurance',
            text: 'World-class standards in every service.',
          },
          {
            title: 'Support and growth',
            text: 'We strive for shared growth and stronger partnerships.',
          },
        ],
      },
    },
    amenities: [
      {
        title: 'A la carte restaurant',
        detail:
          'Chef-curated dishes blending local flavors with refined European classics. Each plate is prepared to order, served fresh with a balanced taste and elegant presentation. Soft lighting, calm music, and attentive service create a relaxed, intimate evening. The wine list and desserts complete the experience.',
        image: restaurantAlaCarteOne,
        imageAlt: 'A la carte restaurant ambience',
        images: [
          { src: restaurantAlaCarteOne, alt: 'A la carte dishes' },
          { src: restaurantAlaCarteTwo, alt: 'Refined plating' }
        ],
      },
      {
        title: 'Spa zones',
        detail:
          'Swim in the pools from morning to evening with a calm mountain view. The Turkish hammam and sauna gently warm the body and restore energy. Professional massages release tension and bring a sense of balance. Each zone is kept pristine, with cozy temperatures and attentive service.',
        image: amenityService,
        imageAlt: 'Spa zones',
        images: [
          { src: spa1, alt: 'Panoramic pool' },
          { src: spa2, alt: 'Panoramic pool' },
          { src: spa3, alt: 'Panoramic pool' },
          { src: spa4, alt: 'Panoramic pool' },
          { src: spa5, alt: 'Panoramic pool' },
        ],
      },
      {
        title: "Children's playground",
        detail:
          'A dedicated kids play area is set up with a safe and cozy layout. Bright toys, soft flooring, and comfortable corners keep little guests happy and active. Parents can relax nearby while staying close. Daily cleaning and supervision ensure a calm, tidy space.',
        image: servicePlayground,
        imageAlt: "Children's playground",
      },
      {
        title: 'Fitness zone',
        detail:
          'A modern gym with strength machines, free weights, and cardio equipment. The space works well for both morning energy and evening workouts. Soft lighting, good airflow, and clean surroundings keep sessions comfortable. Optional training routines help you maintain a healthy rhythm.',
        image: gymOne,
        imageAlt: 'Fitness zone',
        images: [
          { src: gymOne, alt: 'Fitness equipment' },
          { src: gymTwo, alt: 'Gym area' },
        ],
      },
      {
        title: "Za'faron Restaurant",
        detail:
          "Za'faron Restaurant blends national favorites with refined European cuisine. Breakfasts and dinners feature a wide menu with fresh ingredients and balanced flavors. A bright interior with calm music sets a welcoming mood. Thoughtful service and elegant plating complete the experience.",
        image: serviceRestaurantOne,
        imageAlt: "Za'faron Restaurant interior",
        images: [
          { src: serviceRestaurantOne, alt: "Za'faron Restaurant" },
          { src: serviceRestaurantTwo, alt: 'Restaurant dishes' },
          { src: serviceRestaurantThree, alt: 'Restaurant ambiance' },
        ],
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
          price_weekday: 180,
          price_weekend: 180,
          size: '34 m²',
          vibe: 'Spacious room with a writing desk and a quiet courtyard view.',
          perks: ['Rainfall shower', 'Blackout curtains', 'Orthopedic king-size bed'],
        },
        {
          id: 'zafaron-suite',
          name: "Za'faron Suite",
          price_weekday: 260,
          price_weekend: 260,
          size: '52 m²',
          vibe: 'Large living area with big panoramic windows.',
          perks: ['Private lounge', 'Daily housekeeping', 'Private minibar'],
        },
        {
          id: 'garden-loft',
          name: 'Garden Loft',
          price_weekday: 320,
          price_weekend: 320,
          size: '64 m²',
          vibe: 'Two-level loft with a balcony and green panorama.',
          perks: ['Balcony', 'Library nook', 'Night aromatherapy'],
        },
        {
          id: 'city-twin',
          name: 'Mountain Twin',
          price_weekday: 210,
          price_weekend: 210,
          size: '38 m²',
          vibe: 'Two separate beds with a mountain view, ideal for traveling together.',
          perks: ['Twin beds', 'Mountain view', 'Morning coffee service'],
        },
        {
          id: 'executive-corner',
          name: 'Executive Corner',
          price_weekday: 280,
          price_weekend: 280,
          size: '48 m²',
          vibe: 'Corner room with wide windows and a quiet work area.',
          perks: ['Corner panorama', 'Work desk', 'Fast Wi-Fi'],
        },
        {
          id: 'spa-residence',
          name: 'Spa Residence',
          price_weekday: 410,
          price_weekend: 410,
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
    productsSection: {
      label: 'Our products',
      title: "Za'faron products",
      description:
        'Natural, refined products prepared for guests in our boutique corner.',
      nameLabel: 'Product name',
      items: [
        {
          nameUz: "Zafaronli asal",
          nameRu: 'Мёд с шафраном',
          nameEn: 'Honey with saffron',
          image: med,
          imageAlt: "Zafaronli asal",
        },
        {
          nameUz: "Za’faronli novvot",
          nameRu: 'Навват с шафраном',
          nameEn: 'Navvat with saffron',
          image: navat,
          imageAlt: "Za’faronli novvot",
        },
        {
          nameUz: "Zafaronli tuz",
          nameRu: 'Соль с шафраном',
          nameEn: 'Salt with saffron',
          image: sol,
          imageAlt: "Zafaronli tuz",
        },
        {
          nameUz: "Za’faron choyi (qora va ko’k)",
          nameRu: 'Чай Зафарон (чёрный и зелёный)',
          nameEn: 'Zafaron tea (black and green)',
          image: chay,
          imageAlt: "Za’faron choyi (qora va ko’k)",
        },
        {
          nameUz: "Za’faron",
          nameRu: 'Шафран',
          nameEn: 'Saffron',
          image: shafran,
          imageAlt: "Za’faron",
        }
      ],
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
      loadError: 'Failed to load rooms.',
      book: 'Book now',
      home: 'Home',
      summaryTitle: '{count} room types',
      summarySubtitle: 'Premium, calm, and modern comfort.',
      startBooking: 'Start booking',
    },
    admin: {
      label: 'Admin',
      loginTitle: 'Admin login',
      loginDescription: 'Log in, the token is stored in cookies for 60 minutes.',
      username: 'Username',
      password: 'Password',
      loginButton: 'Log in',
      loggingIn: 'Please wait...',
      sections: {
        roomsLabel: 'Rooms',
        roomsTitle: 'Room list',
        blocksLabel: 'Blocked dates',
        blocksTitle: 'Room availability blocks',
        restaurantsLabel: 'Restaurants',
        restaurantsTitle: 'Restaurant list',
        menusLabel: 'Restaurant menus',
        menusTitle: 'Restaurant menus',
      },
      labels: {
        id: 'ID',
        restaurantId: 'Restaurant ID',
        currentImage: 'Current image',
      },
      alt: {
        roomImage: 'Room image',
        restaurantImage: 'Restaurant image',
        menuImage: 'Menu image',
      },
      empty: {
        rooms: 'No rooms yet.',
        restaurants: 'No restaurants yet.',
        menus: 'No menus yet.',
        blocks: 'No blocked dates yet.',
      },
      form: {
        roomNameUz: 'Room name (UZ)',
        roomNameRu: 'Room name (RU)',
        roomNameEn: 'Room name (EN)',
        descriptionUz: 'Description (UZ)',
        descriptionRu: 'Description (RU)',
        descriptionEn: 'Description (EN)',
        priceWeekday: 'Weekday Price',
        priceWeekend: 'Weekend Price',
        roomType: 'Room type',
        roomTypePlaceholder: 'Select type',
        roomImagesOptional: 'Room images (optional)',
        blockRoom: 'Room',
        blockRoomPlaceholder: 'Select a room',
        blockRoomFallback: 'Room #{id}',
        blockStart: 'Start date',
        blockEnd: 'End date',
        nameUz: 'Name (UZ)',
        nameRu: 'Name (RU)',
        nameEn: 'Name (EN)',
        imagesOptional: 'Images (optional)',
        restaurant: 'Restaurant',
        selectRestaurant: 'Select restaurant',
        menuImage: 'Image ({requirement})',
      },
      roomTypes: {
        double: 'Double',
        suite: 'Suite',
        lux: 'Lux',
      },
      modals: {
        createRoom: 'Create room',
        updateRoom: 'Update room',
        newRoom: 'New room',
        createRestaurant: 'Create restaurant',
        updateRestaurant: 'Update restaurant',
        newRestaurant: 'New restaurant',
        createMenu: 'Create menu',
        updateMenu: 'Update menu',
        newMenu: 'New menu',
      },
      required: 'required',
      optional: 'optional',
      actions: {
        blockRoom: 'Block room',
      },
      errors: {
        roomsLoad: 'Failed to load rooms.',
        restaurantsLoad: 'Failed to load restaurants.',
        menusLoad: 'Failed to load menus.',
        invalidCredentials: 'Invalid username or password.',
        adminNotConfigured: 'Admin credentials are not configured.',
        loginFailed: 'Login failed.',
        roomUpdate: 'Failed to update room.',
        roomCreate: 'Failed to create room.',
        roomDelete: 'Failed to delete room.',
        blocksLoad: 'Failed to load blocked dates.',
        blockCreate: 'Failed to add blocked dates.',
        blockDelete: 'Failed to delete blocked dates.',
        blockRequired: 'Please fill out all fields.',
        blockDateOrder: 'End date must be after start date.',
        invalidPrices: 'Please enter valid prices.',
        restaurantUpdate: 'Failed to update restaurant.',
        restaurantCreate: 'Failed to create restaurant.',
        restaurantDelete: 'Failed to delete restaurant.',
        menuUpdate: 'Failed to update menu.',
        menuCreate: 'Failed to create menu.',
        menuDelete: 'Failed to delete menu.',
        menuImageRequired: 'Please select a menu image.',
      },
      messages: {
        loginSuccess: 'Login successful.',
        logoutSuccess: 'You have logged out.',
        roomUpdated: 'Room updated successfully.',
        roomCreated: 'Room created successfully.',
        roomDeleted: 'Room deleted.',
        blockCreated: 'Blocked dates saved.',
        blockDeleted: 'Blocked dates removed.',
        restaurantUpdated: 'Restaurant updated successfully.',
        restaurantCreated: 'Restaurant created successfully.',
        restaurantDeleted: 'Restaurant deleted.',
        menuUpdated: 'Menu updated successfully.',
        menuCreated: 'Menu created successfully.',
        menuDeleted: 'Menu deleted.',
      },
      confirm: {
        deleteRoom: 'Confirm room deletion?',
        deleteBlock: 'Confirm blocked dates deletion?',
        deleteRestaurant: 'Confirm restaurant deletion?',
        deleteMenu: 'Confirm menu deletion?',
      },
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
