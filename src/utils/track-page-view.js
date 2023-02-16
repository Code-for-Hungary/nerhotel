function sendToGa(name, data) {
  window.ga(() => {
    const trackers = window.ga.getAll();
    const firstTracker = trackers[0];
    const trackerName = firstTracker.get("name");
    window.ga(trackerName + "." + name, data);
  });
}

function trackPageView() {
  console.log(window.location.hash);
  window.ga("set", "page", window.location.hash);
  window.ga("send", "pageview");
}

export default trackPageView;
