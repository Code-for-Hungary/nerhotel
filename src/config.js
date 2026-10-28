const mapApiKey = import.meta.env?.VITE_MAP_API_KEY ?? "cb1_3oex_2_783436d79231b1cee3238724";

export const config = Object.freeze({
    locales: {
        default: "hu",
        available: ["hu", "en", "de"],
        paramName: "plang",
        tolgeeContentDeliveryUrl: "https://cdn.tolg.ee/f853f27fff178fd3340dad767ebb4637",
        tolgeeApiUrl: "https://app.tolgee.io",
    },
    map: {
        url: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png${mapApiKey ? `?key=${mapApiKey}` : ""}`,
        attribution:
            "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>",
        maxZoom: 19,
        closeZoomLevel: 17,
    },
    api: {
        base: import.meta.env?.VITE_API_BASE ?? "",
        endpoints: {
            places: "/places",
            place: "/places/",
            placesByPerson: "/places/person/",
            search: "/places/search",
        },
    },
});

export const KNOWN_ROUTES = Object.freeze({
    ABOUT: "about",
    CONTACT: "contact",
    DATA_EXPORT: "data-export",
    PRESS_RELEASES: "press-releases",
    SEARCH: "search",
    PLACE: "place",
    PERSON: "person",
});
