const API_ENDPOINT = "https://adatbazis.k-monitor.hu/api-person.php";

async function getPersonProfile(id) {
    const response = await fetch(`${API_ENDPOINT}/?id=${id}`);
    const responseJSON = await response.json();

    return responseJSON;
}

export default getPersonProfile;
