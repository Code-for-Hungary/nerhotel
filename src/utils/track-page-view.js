function trackPageView() {
  const hashAsArray = window.location.hash.split("");
  hashAsArray.shift();
  const withoutHashMark = hashAsArray.join("");
  window.ga("gtm2.set", "page", withoutHashMark);
  window.ga("gtm2.send", "pageview");
}

export default trackPageView;
