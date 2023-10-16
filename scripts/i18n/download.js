const path = require("path");
const fs = require("fs");
const { Curl } = require("node-libcurl");
const { TOLGEE_API_PATH, TRANSLATION_FILES_FOLDER, AVAILABLE_LANGUAGES } = require("./config");
require("dotenv").config();

function download(lang) {
    const curl = new Curl();
    curl.setOpt(Curl.option.URL, `${TOLGEE_API_PATH}/projects/export?languages=${lang}&zip=false`);
    curl.setOpt(Curl.option.HTTPHEADER, [`X-API-Key: ${process.env.TOLGEE_API_KEY}`]);

    curl.on("end", (statusCode, data) => {
        console.info(`STATUS CODE: ${statusCode}`);
        const fileContent = statusCode === 200 ? data : "{}";
        fs.writeFile(`${path.resolve(TRANSLATION_FILES_FOLDER)}/${lang}.json`, fileContent, (err) => {
            if (err) {
                console.error(err);
            }
        });
        console.info(`Downloaded [${lang}] in ${curl.getInfo("TOTAL_TIME")}ms`);
        curl.close();
    });

    curl.on("error", curl.close.bind(curl));
    curl.perform();
}

function main() {
    AVAILABLE_LANGUAGES.forEach((lang) => download(lang));
}

try {
    main();
} catch (e) {
    console.error(e.message);
}
