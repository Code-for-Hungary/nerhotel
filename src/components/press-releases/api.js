const API_URL = "https://adatbazis.k-monitor.hu/api.php";
const TAG_NAME = "ner-hotel";
export const PAGE_SIZE = 10;

export async function fetchPressReleases(offset = 0) {
    const url = `${API_URL}?tag=${TAG_NAME}&limit=${PAGE_SIZE}&offset=${offset}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error || "API returned an error state");
    }

    return {
        results: data.results,
        total: data.total,
    };
}
