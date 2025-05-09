import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                "hello": "Hello",
                "world": "World",
                "Gain expert insights into balance sheets, income statements, and cash flow reports. Develop practical, hands-on financial analysis skills to make smarter business decisions.": "Gain expert insights into balance sheets, income statements, and cash flow reports. Develop practical, hands-on financial analysis skills to make smarter business decisions.",

            },
        },
        id: {
            translation: {
                "hello": "Halo",
                "world": "Dunia ",
                "Gain expert insights into balance sheets, income statements, and cash flow reports. Develop practical, hands-on financial analysis skills to make smarter business decisions.": "Dapatkan wawasan ahli tentang neraca, laporan laba rugi, dan laporan arus kas. Kembangkan keterampilan analisis keuangan praktis dan langsung untuk membuat keputusan bisnis yang lebih cerdas.",
            },
        },
    },
});

export default i18n