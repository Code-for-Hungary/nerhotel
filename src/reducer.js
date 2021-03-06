export const initialState = {
  list: [],
  map: null,
  showList: false,
  showPopup: false,
  showMenu: false,
  center: [47.498045, 19.0385183],
  selectedPoint: null,
  locationRequired: false
};

export default function mapReducer(state, action) {
  switch (action.type) {
    case 'SetMap':
      return {
        ...state,
        map: action.map
      };
    case 'SetList':
      return {
        ...state,
        list: action.list
      };
    case 'SetCenter':
      return {
        ...state,
        center: action.center
      };
    case 'SetSelectedPoint':
      return {
        ...state,
        selectedPoint: action.point
      };
    case 'ToggleList':
      return {
        ...state,
        showList: action.showList
      };
    case 'TogglePopup':
      return {
        ...state,
        showPopup: action.showPopup
      };
    case 'ToggleMenu':
      return {
        ...state,
        showMenu: action.showMenu
      };
    case 'SetLocator':
      return {
        ...state,
        locationRequired: true
      };
    default:
      return state;
  }
}
