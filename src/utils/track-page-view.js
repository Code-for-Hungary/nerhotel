function trackPageView() {
  if (window.location.hash && window.ga && typeof window.ga === "function") {
    const hashAsArray = window.location.hash.split("");
    hashAsArray.shift();
    const withoutHashMark = hashAsArray.join("");
    window.ga("gtm2.set", "page", withoutHashMark);
    window.ga("gtm2.send", "pageview");
  }
}

export default trackPageView;
