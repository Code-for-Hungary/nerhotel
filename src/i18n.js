import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import hu from './translations/hu.json';
import en from './translations/en.json';
import { config } from './config';

i18next
    .use(initReactI18next)
    .init({
        debug: process.env.NODE_ENV === 'development',
        defaultNS: 'general',
        lng: config.locales.default,
        fallbackLng: config.locales.default,
        resources: {
            hu,
            en
        }
    });