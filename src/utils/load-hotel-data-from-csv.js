import { config } from "../config";
import { getHotels } from "./getHotels";
import { convertCsvToObject } from "./csvParser.js";

async function loadHotelDataFromCsv() {
    const response = await fetch(config.csvUrl, { method: "GET" });
    const csvString = await response.text();
    const csvRowsAsObjects = convertCsvToObject(csvString);
    return getHotels(csvRowsAsObjects);
}

export default loadHotelDataFromCsv;
