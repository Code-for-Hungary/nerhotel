function getTranslatedKMonitorLink(link, lang = "en") {
    try {
        const url = new URL(link);
        const googleTranslateDomain = "https://adatbazis-k--monitor-hu.translate.goog";
        const googleTranslateParams = `?_x_tr_sl=hu&_x_tr_tl=${lang}&_x_tr_hl=${lang}&_x_tr_pto=wapp`;

        return `${googleTranslateDomain}${url.pathname}${googleTranslateParams}`;
    } catch (e) {
        console.error(e);
        return "";
    }
}

export default getTranslatedKMonitorLink;
