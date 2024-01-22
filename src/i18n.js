import i18next from "i18next";
import { withTolgee, Tolgee, I18nextPlugin, DevTools, BackendFetch } from "@tolgee/i18next";
import { initReactI18next } from "react-i18next";
import { config } from "./config";

const isDevMode = import.meta.env.MODE === "development";

const tolgee = Tolgee()
    .use(isDevMode ? DevTools() : undefined)
    .use(I18nextPlugin())
    .use(BackendFetch({ prefix: config.locales.tolgeeContentDeliveryUrl }))
    .init({
        apiUrl: isDevMode ? config.locales.tolgeeApiUrl : "",
        apiKey: isDevMode ? import.meta.env.VITE_TOLGEE_API_KEY : "",
    });

withTolgee(i18next, tolgee).use(initReactI18next).init({
    debug: isDevMode,
    lng: config.locales.default,
    fallbackLng: config.locales.default,
    supportedLngs: config.locales.available,
});
