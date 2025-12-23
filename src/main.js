import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import { i18n } from './i18n'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')

const syncLocale = (locale) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('locale', locale)
  }
}

syncLocale(i18n.global.locale.value)
watch(i18n.global.locale, (locale) => {
  syncLocale(locale)
})
