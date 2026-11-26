import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import isEmail from "../utils/is-email";
import isUrl from "../utils/is-url";

import { config } from "../config";

export const SmartLink = ({ children, to, ...props }) => {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const isToAnEmail = isEmail(to);

    if (isUrl(to) || isToAnEmail || typeof to !== "string") {
        const href = isToAnEmail ? `mailto:${to}` : to;

        return (
            <a href={href} rel={!isToAnEmail ? "noopener noreferrer" : undefined} target={!isToAnEmail ? "_blank" : undefined} {...props}>
                {children}
            </a>
        );
    }

    // Determine the active language: Param -> i18n -> Default
    const currentLang = lang || i18n.resolvedLanguage || config.locales.default;
    // Normalize path to ensure it starts with a single slash and avoids double slashes
    const normalizedTo = to.startsWith("/") ? to : `/${to}`;
    // If the path already starts with a valid language prefix, don't double-prefix it
    const hasLangPrefix = config.locales.available.some((l) => normalizedTo === `/${l}` || normalizedTo.startsWith(`/${l}/`));

    const toWithLangPrefix = hasLangPrefix ? normalizedTo : `/${currentLang}${normalizedTo === "/" ? "" : normalizedTo}`;

    return (
        <Link to={toWithLangPrefix} {...props}>
            {children}
        </Link>
    );
};
