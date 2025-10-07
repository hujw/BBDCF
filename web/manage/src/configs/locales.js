import en from '../translations/en';
import es from '../translations/es';
import pt from '../translations/pt';
import de from '../translations/de';
import fr from '../translations/fr';
import ar from '../translations/ar';
import ko from '../translations/ko';
import ru from '../translations/ru';
import zh from '../translations/zh';
import tw from '../translations/tw';
import ja from '../translations/ja';
import pl from '../translations/pl';

const supported = ['en', 'es', 'pt', 'de', 'fr', 'ar', 'ko', 'ru', 'zh', 'zh-TW', 'ja', 'pl'];
let locale = 'zh-TW';

try {
  // get browser default language
  const browserLang = navigator.language;

  if (supported.includes(browserLang)) locale = browserLang;
} catch (e) {
  console.log(e);
}

export default {
  // current locale
  locale,

  // when translation is not available fallback to that locale
  fallbackLocale: 'zh-TW',

  // availabled locales for user selection
  availableLocales: [
    {
      code: 'en',
      flag: 'us',
      label: 'English',
      messages: en
    },
    // {
    //   code: 'es',
    //   flag: 'es',
    //   label: 'Español',
    //   messages: es
    // }, {
    //   code: 'pt',
    //   flag: 'pt',
    //   label: 'Português',
    //   messages: pt
    // }, {
    //   code: 'de',
    //   flag: 'de',
    //   label: 'Deutsche',
    //   messages: de
    // }, {
    //   code: 'fr',
    //   flag: 'fr',
    //   label: 'Français',
    //   messages: fr
    // }, {
    //   code: 'ar',
    //   flag: 'sa',
    //   label: 'العربية',
    //   messages: ar
    // }, {
    //   code: 'ko',
    //   flag: 'kr',
    //   label: '한국어',
    //   messages: ko
    // }, {
    //   code: 'ru',
    //   flag: 'ru',
    //   label: 'русский',
    //   messages: ru
    // }, {
    //   code: 'zh',
    //   flag: 'cn',
    //   label: '簡體中文',
    //   messages: zh
    // },
    {
      code: 'zh-TW',
      flag: 'tw',
      label: '繁體中文',
      messages: tw
    }
    // , {
    //   code: 'ja',
    //   flag: 'jp',
    //   label: '日本語',
    //   messages: ja
    // }, {
    //   code: 'pl',
    //   flag: 'pl',
    //   label: 'Polskie',
    //   messages: pl
    // }
  ]
};
