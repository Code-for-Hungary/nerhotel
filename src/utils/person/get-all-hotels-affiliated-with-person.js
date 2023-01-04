/**
 * @param {Hotel[]} hotels
 * @param {string} personName
 * @returns {Hotel[]}
 */
function _getAllHotelsAffiliatedWithPerson(hotels, personName) {
    return hotels.filter(
        hotel => hotel.properties.ceos.find(ceo => ceo.name === personName)
        || hotel.properties.oligarchs.find(oligarch => oligarch.name === personName));
}

export default _getAllHotelsAffiliatedWithPerson;