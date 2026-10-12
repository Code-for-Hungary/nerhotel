const isUrl = (string) => {
    try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (e) {
        console.error(e);
        return false;
    }
};

export default isUrl;
