import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useLocation, Outlet } from "react-router";

import { config } from "../config";

export function LanguageLayout() {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // 1. If no language is in the URL path
        if (!lang) {
            const preferredLang = localStorage.getItem(config.locales.paramName) || "hu";
            // Redirect to /hu/current-path
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
            // 3. Fallback for invalid language codes (e.g., /fr/page -> /hu/page)
            navigate(`/hu${location.pathname.replace(`/${lang}`, "")}`, { replace: true });
        }
    }, [lang, i18n, navigate, location.pathname, location.search]);

    return <Outlet />;
}
