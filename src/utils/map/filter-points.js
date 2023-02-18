/**
 * @param {Hotel[]} points
 * @param {LatLngBounds} bounds
 * @returns {*}
 */
function filterPoints(points, bounds) {
    return points.filter((point) => {
        const [latitude, longitude] = point.geometry.coordinates;
        return (
            longitude > bounds._southWest.lng &&
            longitude < bounds._northEast.lng &&
            latitude > bounds._southWest.lat &&
            latitude < bounds._northEast.lat
        );
    });
}

export default filterPoints;
