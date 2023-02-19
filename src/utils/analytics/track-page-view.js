function trackPageView() {
    window.dataLayer.push({
        event: "pageview",
        page: {
            url: `${window.location.pathname}${window.location.search}`,
            title: document.title,
        },
    });
}

export default trackPageView;
