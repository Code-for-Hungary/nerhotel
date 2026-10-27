import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLocation, Outlet } from "react-router";

import { config } from "../config";

const getPreferredLang = () => localStorage.getItem(config.locales.paramName) || config.locales.default;

export function LanguageLayout() {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 1. If no language is in the URL path
        if (!lang) {
            const preferredLang = getPreferredLang();
            navigate(`/${preferredLang}${location.pathname}${location.search}`, { replace: true });
            return;
        }

        // 2. If language in URL is valid but different from i18n state
        if (config.locales.available.includes(lang)) {
            if (i18n.language !== lang) {
                i18n.changeLanguage(lang);
                localStorage.setItem(config.locales.paramName, lang);
            }
        } else {
            // 3. Any first segment that is not a valid locale (whether it's /about or /dsdsdsds).
            // Prepend the preferred language prefix so React Router can parse it correctly.
            const preferredLang = getPreferredLang();
            navigate(`/${preferredLang}${location.pathname}${location.search}`, { replace: true });
        }
    }, [lang, i18n, navigate, location.pathname, location.search]);

    return <Outlet />;
}
