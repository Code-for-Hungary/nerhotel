import { createStore } from 'redux';

const SET_MAP = 'SET_MAP';
const SET_LIST = 'SET_LIST';
const OPEN_LIST = 'OPEN_LIST';
const CLOSE_LIST = 'CLOSE_LIST';
const SET_CENTER = 'SET_CENTER';
const SET_POINT = 'SET_POINT';
const OPEN_POPUP = 'OPEN_POPUP';
const CLOSE_POPUP = 'CLOSE_POPUP';
const OPEN_MENU = 'OPEN_MENU';
const CLOSE_MENU = 'CLOSE_MENU';
const SET_LOCATOR = 'SET_LOCATOR';

const initialState = {
  list: [],
  showList: false,
  showPopup: false,
  showMenu: false,
  center: [47.498045, 19.0385183],
  selectedPoint: null,
  locationRequired: false
};

const mapStore = (state = initialState, action) => {
  switch (action.type) {
    case SET_MAP:
      return {
        ...state,
        map: action.map
      };
    case SET_LIST:
      return {
        ...state,
        list: action.list
      };
    case OPEN_LIST:
      return {
        ...state,
        showList: true
      };
    case CLOSE_LIST:
      return {
        ...state,
        showList: false
      };
    case SET_CENTER:
      return {
        ...state,
        center: action.center
      };
    case SET_POINT:
      return {
        ...state,
        selectedPoint: action.point
      };
    case OPEN_POPUP:
      return {
        ...state,
        showPopup: true
      };
    case CLOSE_POPUP:
      return {
        ...state,
        showPopup: false
      };
    case OPEN_MENU:
      return {
        ...state,
        showMenu: true
      };
    case CLOSE_MENU:
      return {
        ...state,
        showMenu: false
      };
    case SET_LOCATOR:
      return {
        ...state,
        locationRequired: true
      };
    default:
      return state;
  }
};

export const setMap = (map) => {
  return {
    type: SET_MAP,
    map
  };
};

export const setList = (list) => {
  return {
    type: SET_LIST,
    list
  };
};

export const openList = () => {
  return { type: OPEN_LIST };
};

export const closeList = () => {
  return { type: CLOSE_LIST };
};

export const openMenu = () => {
  return { type: OPEN_MENU };
};

export const closeMenu = () => {
  return { type: CLOSE_MENU };
};

export const setCenter = (center) => {
  return {
    type: SET_CENTER,
    center
  };
};

export const setSelectedPoint = (point) => {
  return {
    type: SET_POINT,
    point
  };
};

export const openPopup = () => {
  return { type: OPEN_POPUP };
};

export const closePopup = () => {
  return { type: CLOSE_POPUP };
};

export default createStore(mapStore);
