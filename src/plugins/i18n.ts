import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import modules from '@/modules'
const lng = 'fa'

let translate = {}
modules.forEach((modules) => {
  translate = { ...translate, ...modules.translate[lng] }
})

console.log(translate)
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
