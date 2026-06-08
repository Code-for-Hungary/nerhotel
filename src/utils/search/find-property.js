import removeAccents from "./remove-accents";
import { getUniqueElements } from "../get-unique-elements";

/**
 * @param {{name: string, address: string, mainOligarch: {name: string}[]}} place
 * @param {string} phrase
 * @returns {*|boolean}
 */
function findProperty(place, phrase) {
    let foundNames = [];
    const allAssociatedNames = [...place.ceos.map((ceo) => ceo.name), ...place.oligarchs.map((oligarch) => oligarch.name)];
    const allAssociatedNamesDeduped = getUniqueElements(allAssociatedNames);

    if (allAssociatedNamesDeduped.length > 0) {
        foundNames = allAssociatedNamesDeduped.filter((name) => {
            return name.toLowerCase().includes(phrase) || removeAccents(name).includes(phrase);
        });
    }
    const foundPlace = place.name && (place.name.toLowerCase().includes(phrase) || removeAccents(place.name).includes(phrase));
    const foundAddress = place.address && (place.address.toLowerCase().includes(phrase) || removeAccents(place.address).includes(phrase));

    return foundPlace || foundAddress || foundNames.length > 0;
}

export default findProperty;
