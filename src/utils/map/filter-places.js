export function filterPlaces(place, filterType) {
    if (filterType === "mind") {
        return true;
    }
    return place.properties.type.includes(filterType);
}
