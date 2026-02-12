import loadPlaceDataFromCsv from "../src/utils/load-place-data-from-csv.js";
import fs from "fs";
import { mkdirp } from "mkdirp";
import path from "path";

function downloadPlacesAsJSON() {
    loadPlaceDataFromCsv()
        .then(async (data) => {
            const filePath = path.join(__dirname, "..", "data", "nerhotel.json");
            mkdirp(path.dirname(filePath)).then((dir) => {
                console.log(dir);
                fs.writeFileSync(filePath, JSON.stringify(data));
            });
        })
        .catch((e) => {
            throw e;
        });
}

downloadPlacesAsJSON();
