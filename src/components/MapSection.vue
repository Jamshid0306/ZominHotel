<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="bg-white w-full px-4 py-10">
    <div class="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1fr_1.5fr]">
      <div class="rounded-3xl border border-clay-100/70 bg-sand-50/80 p-6 shadow-sm shadow-clay-950/5">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
          {{ t('mapSection.contactsLabel') }}
        </p>
        <h3 class="mt-2 font-display text-2xl font-semibold text-clay-950">
          {{ t('mapSection.title') }}
        </h3>
        <div class="mt-4 space-y-2 text-sm text-clay-800">
          <p>
            <span class="font-semibold text-clay-900">{{ t('common.phoneLabel') }}</span>
            <a class="ml-2 hover:text-clay-950" href="tel:+998702289999">+998 70 228 99 99</a>
            <a class="ml-2 hover:text-clay-950" href="tel:+998715010606">+998 71 501 06 06</a>
          </p>
          <p>
            <span class="font-semibold text-clay-900">{{ t('common.emailLabel') }}</span>
            <a class="ml-2 hover:text-clay-950" href="mailto:zafaronpremiumhotel@gmail.com">
              zafaronpremiumhotel@gmail.com
            </a>
          </p>
          <p>
            <span class="font-semibold text-clay-900">{{ t('location.label') }}</span>
            <span class="ml-2">{{ t('location.address') }}</span>
          </p>
        </div>

        <div class="mt-6">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
            {{ t('mapSection.formLabel') }}
          </p>
          <p class="mt-2 text-sm text-clay-700">
            {{ t('mapSection.formNote') }}
          </p>
          <form class="mt-4 grid gap-3">
            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('mapSection.form.nameLabel') }}</span>
              <input
                type="text"
                :placeholder="t('mapSection.form.namePlaceholder')"
                class="w-full rounded-xl border border-clay-200/80 bg-white px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('mapSection.form.phoneLabel') }}</span>
              <input
                type="tel"
                inputmode="tel"
                autocomplete="tel"
                :placeholder="t('mapSection.form.phonePlaceholder')"
                class="w-full rounded-xl border border-clay-200/80 bg-white px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('mapSection.form.noteLabel') }}</span>
              <textarea
                rows="4"
                :placeholder="t('mapSection.form.notePlaceholder')"
                class="w-full rounded-xl border border-clay-200/80 bg-white px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              ></textarea>
            </label>
            <button
              type="submit"
              class="mt-2 inline-flex items-center justify-center rounded-full bg-linear-to-r from-clay-500 to-clay-300 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-clay-950/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {{ t('mapSection.form.submit') }}
            </button>
          </form>
        </div>
      </div>

      <div class="h-full overflow-hidden rounded-3xl border border-clay-100/70 bg-white shadow-sm shadow-clay-950/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4052.6831009533953!2d70.0089533!3d41.525802999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38af0d0012eff57f%3A0x66e81186ad41090d!2sZA&#39;FARON%20PREMIUM%20HOTEL!5e1!3m2!1sru!2s!4v1767026142226!5m2!1sru!2s"
          class="h-full w-full"
          style="border: 0"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
</template>
