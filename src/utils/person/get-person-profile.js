const API_ENDPOINT = "https://adatbazis.k-monitor.hu/api-person.php";

async function getPersonProfile(id) {
    const response = await fetch(`${API_ENDPOINT}/?id=${id}`);
    const profileResponse = await response.json();

    // return profileResponse;

    if (profileResponse.error) {
        throw new Error(profileResponse.error);
    }

    if (!profileResponse.results || !profileResponse.results.length) {
        throw new Error(`No valid results for person ID "${id}" from the person profile endpoint`);
    }

    if (!profileResponse.results[0].description) {
        throw new Error(`No description field in the first result object, value was "${profileResponse.results[0].description}"`);
    }

    return {
        name: profileResponse.results[0].name,
        profileImage: profileResponse.results[0].image_small_url,
        text: profileResponse.results[0].description,
    };
}

const cache = new Map();

export function getCachedPersonProfile(id) {
    if (!cache.has(id)) {
        const promise = getPersonProfile(id);
        promise.status = "pending";
        promise.then(
            (value) => {
                promise.status = "fulfilled";
                promise.value = value;
            },
            (reason) => {
                promise.status = "rejected";
                promise.reason = reason;
            }
        );
        cache.set(id, promise);
    }

    return cache.get(id);
}
