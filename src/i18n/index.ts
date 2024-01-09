import {I18n} from 'i18n-js';
import en from './locales/en.json';

type Translation = typeof en;

const i18n = new I18n({
  en,
});

export const translations: Translation = en;

export const translate = (
  key: keyof Translation,
  options?: Record<string, string>,
) => {
  return i18n.t(key, options);
};
