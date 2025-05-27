import { useTranslation } from 'react-i18next';

const SwitchLanguage = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => changeLanguage('en')}
                className={`select-none text-sm font-bold ${i18n.language === 'en' ? 'text-orange-400' : 'text-gray-400'}`}
            >
                EN
            </button>
            |
            <button
                onClick={() => changeLanguage('id')}
                className={`select-none text-sm font-bold ${i18n.language === 'id' ? 'text-orange-400' : 'text-gray-400'}`}
            >
                ID
            </button>
            |
            <button
                onClick={() => changeLanguage('cn')}
                className={`select-none text-sm font-bold ${i18n.language === 'cn' ? 'text-orange-400' : 'text-gray-400'}`}
            >
                中文
            </button>
        </div>
    );
};

export default SwitchLanguage;
