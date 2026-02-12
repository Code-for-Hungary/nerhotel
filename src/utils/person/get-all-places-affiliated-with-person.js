/**
 * @param {Hotel[]} places
 * @param {string} personName
 * @returns {Hotel[]}
 */
function _getAllPlacesAffiliatedWithPerson(places, personName) {
    return places.filter(
        (place) =>
            place.properties.ceos.find((ceo) => ceo.name === personName) ||
            place.properties.oligarchs.find((oligarch) => oligarch.name === personName)
    );
}

export default _getAllPlacesAffiliatedWithPerson;
