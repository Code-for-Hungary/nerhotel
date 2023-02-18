function trackPageView() {
    if (window.location.hash && window.dataLayer) {
        const hashAsArray = window.location.hash.split("");
        hashAsArray.shift();
        const withoutHashMark = hashAsArray.join("");

        window.dataLayer.push({
            event: "pageview",
            page: {
                url: withoutHashMark,
                title: document.title,
            },
        });
    }
}

export default trackPageView;
