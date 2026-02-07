import { config } from "../config.js";
import { getPlaces } from "./get-places.js";
import { convertCsvToObject } from "./csvParser.js";

async function loadPlaceDataFromCsv() {
    const response = await fetch(config.csvUrl, { method: "GET" });
    const csvString = await response.text();
    const csvRowsAsObjects = convertCsvToObject(csvString);
    return getPlaces(csvRowsAsObjects);
}

export default loadPlaceDataFromCsv;
