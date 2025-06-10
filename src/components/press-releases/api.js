const API_URL = "https://adatbazis.k-monitor.hu/api.php";
const TAG_NAME = "ner-hotel";

export const PAGE_SIZE = 10;

async function load(offset = 0) {
    const url = `${API_URL}?tag=${TAG_NAME}&limit=${PAGE_SIZE}&offset=${offset}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error while loading the URL: ${url}`);
    }

    const data = await response.json();

    if (data.error) {
        console.error(data);
        throw Error(`Error in the response`);
    }

    return data;
}

export async function loadFirstPage() {
    const data = await load();

    return {
        results: data.results,
        total: data.total,
    };
}

export async function loadNextPage(offset) {
    const data = await load(offset);

    return data.results;
}
