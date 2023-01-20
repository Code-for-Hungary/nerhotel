const goBack = (dispatch, hotelById, location) => {
    dispatch({type: 'SetSelectedPoint', point: hotelById});
    dispatch({type: 'SetCenter', center: location});
};

export default goBack;