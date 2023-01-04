/**
 * Source: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript#answer-37511463
 *
 * @param {string} string
 * @returns {string}
*/
function removeAccents(string) {
    return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default removeAccents;