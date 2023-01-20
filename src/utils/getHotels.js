function cleanPersonData(person) {
  return { name: person.name.replace(/!/g, "").trim(), link: person.link };
}

/**
 * @param {{name: string, link: string}[]} people
 * @returns {{name: string, link: string}[]} Only the ones whose name starts with "!!!"
 */
function getMainOligarchs(people) {
  return people
    .filter((person) => person.name && person.name.startsWith("!!!"))
    .map(cleanPersonData);
}

/**
 * @param {{name: string, link: string}[]} people
 * @returns {{name: string, link: string}[]} Without empty ones, and with "!!!"-s removed
 */
function getAllOligarchs(people) {
  return people.filter((person) => person.name).map(cleanPersonData);
}

/**
 * @param {Object<string, string>[]} csvRowsAsObjects
 * @returns {Hotel[]}
 */
export function getHotels(csvRowsAsObjects) {
  return csvRowsAsObjects.map((csvRow, index) => {
    /** @type {{name: string, link: string}[]} */
    const oligarchs = [
      { name: csvRow["T1 OL"], link: csvRow["T1_link"] },
      { name: csvRow["T2 OL"], link: csvRow["T2_link"] },
      { name: csvRow["T3 OL"], link: csvRow["T3_link"] },
    ];
    /** @type {{name: string, link: string}[]} */
    const ceos = [
      { name: csvRow["IT1"], link: csvRow["IT1_link"] },
      { name: csvRow["IT2"], link: csvRow["IT2_link"] },
      { name: csvRow["IT3"], link: csvRow["IT3_link"] },
    ];
    return {
      type: "Feature",
      properties: {
        id: index,
        address: [csvRow["city"], csvRow["loc_address"], csvRow["zip"]].join(
          ", "
        ),
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
