// PLUGIN
import { createI18n } from 'vue-i18n';

// import en from '@/global-helper/i18n/dictionary/en';
// import id from '@/global-helper/i18n/dictionary/id';

// VARIABLE
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("language") || 'id',
  fallbackLocale: 'en',
  messages: {
    en,
    id,
  },
})

export default i18n;
