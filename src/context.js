import { createContext } from "react";

const mapValue = {
    list: [],
    showPopup: false,
    center: [],
    selectedPoint: null,
    locationRequired: false,
    showMenu: false,
    showList: false,
    dispatch: () => {},
};

export const MapContext = createContext(mapValue);
