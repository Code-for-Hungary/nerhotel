export const config = {
  csvUrl:
    "https://docs.google.com/spreadsheets/d/1FaeML93U76Fjh9GR7gbQhtb2O3Ga0ZY2honrYKyQQLo/gviz/tq?tqx=out:csv&sheet=Sheet1",
  csvDownloadUrl:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSEboU5aIOUgZ-hmNpLQIYB8EZTc1HYAFf9mL97jvjVl6S9auEiFxJ1fwMpbr6-7dwPYl57BOK4ANfs/pub?gid=0&single=true&output=csv",
  locales: {
    default: "hu",
    available: ["hu", "en"],
    paramName: "plang",
  },
  map: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>",
    maxZoom: 19,
    closeZoomLevel: 17,
  },
};
