const API_ENDPOINT = "https://adatbazis.k-monitor.hu/api-person.php";

async function getPersonProfile(name) {
    const response = await fetch(`${API_ENDPOINT}/?name=${name}`);
    const responseJSON = await response.json();

    return responseJSON;
}

export default getPersonProfile;
