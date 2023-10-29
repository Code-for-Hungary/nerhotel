const fs = require("fs").promises;
const path = require("path");

const TRANSLATION_FILES_FOLDER = "./src/translations";

function clearValuesOfObject(obj) {
    const copy = JSON.parse(JSON.stringify(obj, null, 4));
    const keys = Object.keys(copy);

    keys.forEach((key) => {
        const value = copy[key];
        if (typeof value === "object" && !Array.isArray(value) && value !== null) {
            copy[key] = clearValuesOfObject(copy[key]);
        } else {
            copy[key] = "";
        }
    });

    return copy;
}

async function main() {
    const runArgs = process.argv.slice(2);
    const langFileName = runArgs[0];

    if (!langFileName) {
        console.error("Please add a language code for the new file as argument!");
        return;
    }

    const baseLanguageTranslations = await fs.readFile(path.resolve(`${TRANSLATION_FILES_FOLDER}/hu.json`), "utf8");
    const baseLanguageTranslationsObj = JSON.parse(baseLanguageTranslations);
    const emptyLanguageTranslationObj = clearValuesOfObject(baseLanguageTranslationsObj);

    await fs.writeFile(
        path.resolve(`${TRANSLATION_FILES_FOLDER}/${langFileName}.json`),
        JSON.stringify(emptyLanguageTranslationObj, null, 4)
    );
}

try {
    main();
} catch (e) {
    console.error(e.message);
}
