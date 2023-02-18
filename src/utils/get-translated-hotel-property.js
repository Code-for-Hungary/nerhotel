const getTranslatedHotelProperty = (propertyName, lang, properties) => {
    if (!properties[lang] || propertyName in properties[lang] === false || !properties[lang][propertyName]) {
        if (propertyName in properties === false) {
            throw new Error(`${propertyName} not found in properties`);
        }

        return properties[propertyName];
    }

    return properties[lang][propertyName];
};

export default getTranslatedHotelProperty;
