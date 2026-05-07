<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="mt-16 bg-linear-to-b from-white to-sand-100 px-4 py-16 text-clay-900">
    <div class="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.45fr]">
      <div class="rounded-[1.75rem] border border-clay-100/80 bg-white/90 p-6 shadow-2xl shadow-clay-950/10 backdrop-blur">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-clay-600">
          {{ t('mapSection.contactsLabel') }}
        </p>
        <h3 class="mt-3 font-display text-4xl font-semibold leading-tight text-clay-950">
          {{ t('mapSection.title') }}
        </h3>
        <div class="mt-5 space-y-3 border-l border-clay-300 pl-4 text-sm text-clay-800">
          <p class="grid gap-1">
            <span class="font-semibold text-clay-950">{{ t('common.phoneLabel') }}</span>
            <a class="hover:text-clay-950" href="tel:+998722215454">+998 72 221 54 54</a>
          </p>
          <p class="grid gap-1">
            <span class="font-semibold text-clay-950">{{ t('common.emailLabel') }}</span>
            <a class="break-all hover:text-clay-950" href="mailto:sales@zamindor.com">
              sales@zamindor.com
            </a>
          </p>
          <p class="grid gap-1">
            <span class="font-semibold text-clay-950">{{ t('location.label') }}</span>
            <span>{{ t('location.address') }}</span>
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
                class="w-full rounded-2xl border border-clay-200/80 bg-white px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('mapSection.form.phoneLabel') }}</span>
              <input
                type="tel"
                inputmode="tel"
                autocomplete="tel"
                :placeholder="t('mapSection.form.phonePlaceholder')"
                class="w-full rounded-2xl border border-clay-200/80 bg-white px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm font-semibold text-clay-800">
              <span>{{ t('mapSection.form.noteLabel') }}</span>
              <textarea
                rows="4"
                :placeholder="t('mapSection.form.notePlaceholder')"
                class="w-full rounded-2xl border border-clay-200/80 bg-white px-3 py-3 text-sm font-semibold text-clay-900 outline-none transition focus:border-clay-500 focus:ring-4 focus:ring-clay-200/60"
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

      <div class="min-h-[520px] overflow-hidden rounded-[1.75rem] border border-clay-100/70 bg-white shadow-2xl shadow-clay-950/15">
        <iframe
          src="https://maps.google.com/maps?q=Zamindor%20Resort%20Zaamin&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
