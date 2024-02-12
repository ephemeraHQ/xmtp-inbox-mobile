import {I18n} from 'i18n-js';
import {findBestLanguageTag} from 'react-native-localize';
import en from './locales/en.json';
import th from './locales/th.json';

type Translation = typeof en;

const i18n = new I18n({
  en,
  th,
});

// If user's locale is Thai, the app will use Thai translation
// If user's locale is English, the app will use English translation
// If user's locale is not Thai or English, the app will use English translation
const bestLanguageTag = findBestLanguageTag(['en', 'th']);
i18n.locale = bestLanguageTag?.languageTag ?? 'en';

export const translations: Translation = en;

export const translate = (
  key: keyof Translation,
  options?: Record<string, string>,
) => {
  return i18n.t(key, options);
};
