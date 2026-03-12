function getStorageKey() {
    const currentYear = new Date().getFullYear();
    return `${currentYear}_has_dismissed_one_percent_banner`;
}

export function rememberDismiss() {
    if (window.localStorage) {
        window.localStorage.setItem(getStorageKey(), true);
    }
}

export function checkIfAlreadyDismissed() {
    if (window.localStorage) {
        return !!window.localStorage.getItem(getStorageKey());
    }
    return false;
}

export function isOnePercentDonationSeason() {
    const now = new Date();
    const currentYear = now.getFullYear();

    const start = new Date(`${currentYear}-02-14`);
    const end = new Date(`${currentYear}-05-20`);

    return now >= start && now <= end;
}
