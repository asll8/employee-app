import { locales } from './locales.js';

export function localize(key, values = {}) {
  const lang = document.documentElement.lang || 'en';
  let text = locales[lang][key] || locales['en'][key];
  
  Object.keys(values).forEach(placeholder => {
    text = text.replace(`{${placeholder}}`, values[placeholder]);
  });

  return text;
}
