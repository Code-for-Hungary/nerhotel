export function filterPoints(point, filterType) {
    if (filterType === "mind") {
        return true;
    }
    return point.properties.type.includes(filterType);
}
