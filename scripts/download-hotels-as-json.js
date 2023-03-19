import loadHotelDataFromCsv from "../src/utils/load-hotel-data-from-csv.js";
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");

function downloadHotelsAsJSON() {
    loadHotelDataFromCsv()
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

downloadHotelsAsJSON();
