import removeAccents from './remove-accents';

/**
 * @param {{name: string, address: string, mainOligarch: {name: string}[]}} place
 * @param {string} phrase
 * @returns {*|boolean}
*/
function findProperty(place, phrase) {
    let foundOligarch = [];
    if (place.mainOligarch.length > 0) {
        foundOligarch = place.mainOligarch.filter(oligarch => {
        return (oligarch.name.toLowerCase().includes(phrase) ||
            removeAccents(oligarch.name).includes(phrase));
        });
    }
    const foundPlace = place.name &&
        (place.name.toLowerCase().includes(phrase) ||
        removeAccents(place.name).includes(phrase));
    const foundAddress = place.address &&
        (place.address.toLowerCase().includes(phrase) ||
        removeAccents(place.address).includes(phrase));

    return (foundPlace || foundAddress || foundOligarch.length > 0);
}

export default findProperty;