import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/en.json'
import id from './locales/id/id.json'
import cn from './locales/cn/cn.json'
import enPrivacy from './locales/en/enPrivacyPolicy.json'
import idPrivacy from './locales/id/idPrivacyPolicy.json'
import cnPrivacy from './locales/cn/cnPrivacyPolicy.json'

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: 'en',
    ns: ['translation', 'privacyPolicy'],
    defaultNS: 'translation',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        id: {
            translation: id,
            privacyPolicy: idPrivacy,
        },
        en: {
            translation: en,
            privacyPolicy: enPrivacy,
        },
        cn:{
            translation: cn,
            privacyPolicy: cnPrivacy
        }
    }
})

export default i18n


