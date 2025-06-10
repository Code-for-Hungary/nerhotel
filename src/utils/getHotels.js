function cleanPersonData(person) {
    return { name: person.name.replace(/!/g, "").trim(), link: person.link, id: person.id };
}

/**
 * @param {{name: string, link: string}[]} people
 * @returns {{name: string, link: string}[]} Only the ones whose name starts with "!!!"
 */
function getMainOligarchs(people) {
    return people.filter((person) => person.name && person.name.startsWith("!!!")).map(cleanPersonData);
}

/**
 * @param {{name: string, link: string}[]} people
 * @returns {{name: string, link: string}[]} Without empty ones, and with "!!!"-s removed
 */
function getAllOligarchs(people) {
    return people.filter((person) => person.name).map(cleanPersonData);
}

/**
 *
 * @param {string} city
 * @param {string} address
 * @param {string} zip
 */
function makeAddress(city, address, zip) {
    const addressParts = [city];

    if (address) {
        addressParts.push(address);
    }

    if (zip) {
        addressParts.push(zip);
    }

    return addressParts.join(", ");
}

/**
 * @param {Object<string, string>[]} csvRowsAsObjects
 * @returns {Hotel[]}
 */
export function getHotels(csvRowsAsObjects) {
    return csvRowsAsObjects.map((csvRow, index) => {
        /** @type {{name: string, link: string}[]} */
        const oligarchs = [
            { name: csvRow["T1 OL"], link: csvRow["T1_link"], id: csvRow["T1_ID"] },
            { name: csvRow["T2 OL"], link: csvRow["T2_link"], id: csvRow["T2_ID"] },
            { name: csvRow["T3 OL"], link: csvRow["T3_link"], id: csvRow["T3_ID"] },
        ];
        /** @type {{name: string, link: string}[]} */
        const ceos = [
            { name: csvRow["IT1"], link: csvRow["IT1_link"], id: csvRow["IT1_ID"] },
            { name: csvRow["IT2"], link: csvRow["IT2_link"], id: csvRow["IT2_ID"] },
            { name: csvRow["IT3"], link: csvRow["IT3_link"], id: csvRow["IT3_ID"] },
        ];
        return {
            type: "Feature",
            properties: {
                id: index,
                address: makeAddress(csvRow["city"], csvRow["loc_address"], csvRow["zip"]),
                company: {
                    name: csvRow["company"].trim(),
                    link: csvRow["company_link"],
                },
                name: csvRow["loc_name"],
                city: csvRow["city"],
                type: csvRow["type"],
                link: csvRow["news"],
                mainOligarch: getMainOligarchs(oligarchs),
                mainCEO: getMainOligarchs(ceos),
                oligarchs: getAllOligarchs(oligarchs),
                ceos: getAllOligarchs(ceos),
                date: csvRow["date"],
                details: csvRow["details"],
                en: {
                    name: csvRow["name_en"] ? csvRow["name_en"] : null,
                    link: csvRow["news_en"] ? csvRow["news_en"] : null,
                    details: csvRow["details_en"] ? csvRow["details_en"] : null,
                    type: csvRow["category"],
                },
                de: {
                    name: csvRow["name_de"] ? csvRow["name_de"] : null,
                    link: csvRow["news_de"] ? csvRow["news_de"] : null,
                    details: csvRow["details_de"] ? csvRow["details_de"] : null,
                    type: csvRow["category_de"],
                },
                picture: csvRow["picture"] ? csvRow["picture"] : null,
            },
            geometry: {
                type: "Point",
                coordinates: [parseFloat(csvRow["lat"]), parseFloat(csvRow["lng"])],
            },
        };
    });
}
