import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translation from '@/translate'
const lng = 'fa'

let translate = {}
Object.values(translation[lng]).forEach(
  (value) => (translate = { ...translate, ...value })
)

const resources = {
  [lng]: {
    translation: {
      ...translate
    }
  }
}

i18n.use(initReactI18next).init({
  lng: 'fa',
  fallbackLng: 'fa',
  resources,

  interpolation: {
    escapeValue: false
  }
})

export default i18n
