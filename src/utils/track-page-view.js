import ReactGA from "react-ga";

function trackPageView() {
  if (window.location.hash) {
    const hashAsArray = window.location.hash.split("");
    hashAsArray.shift();
    const withoutHashMark = hashAsArray.join("");

    ReactGA.pageview(withoutHashMark);
  }
}

export default trackPageView;
