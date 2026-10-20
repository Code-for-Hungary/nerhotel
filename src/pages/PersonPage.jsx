import { useLoaderData } from "react-router";

import Layout from "./Layout";
import Person from "../components/person/Person";
import { getApiUrl } from "../utils/api/get-api-url";
import getPersonProfile from "../utils/person/get-person-profile";

export async function clientLoader({ params }) {
    const personName = params.name;

    const apiUrl = `${getApiUrl("placesByPerson")}${personName}`;
    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error(`Failed to fetch place, with id of "${personName}"`);

    const affiliatedPlaces = await res.json();

    const person =
        affiliatedPlaces && affiliatedPlaces.length
            ? affiliatedPlaces[0].properties.ceos.find((ceo) => ceo.name === personName) ||
              affiliatedPlaces[0].properties.oligarchs.find((oligarch) => oligarch.name === personName)
            : undefined;

    const isMainOligarch = !!(
        affiliatedPlaces &&
        affiliatedPlaces.length &&
        (affiliatedPlaces[0].properties.mainCEO.find((ceo) => ceo.name === personName) ||
            affiliatedPlaces[0].properties.mainOligarch.find((oligarch) => oligarch.name === personName))
    );

    let personProfile;
    const kMonitorDbId = person && person.id ? person.id : null;
    if (kMonitorDbId) {
        try {
            const profileResponse = await getPersonProfile(kMonitorDbId);

            if (profileResponse.error) {
                throw new Error(profileResponse.error);
            }

            if (!profileResponse.results || !profileResponse.results.length) {
                throw new Error(`No valid results for person ID "${kMonitorDbId}" from the person profile endpoint`);
            }

            if (!profileResponse.results[0].description) {
                throw new Error(`No description field in the first result object, value was "${profileResponse.results[0].description}"`);
            }

            personProfile = {
                name: personName,
                profileImage: profileResponse.results[0].image_small_url,
                text: profileResponse.results[0].description,
            };
        } catch (error) {
            console.error(error);
        }
    }

    return {
        personName,
        affiliatedPlaces,
        isMainOligarch,
        personProfile,
    };
}

const PersonPage = () => {
    const data = useLoaderData();

    return (
        <Layout>
            <Person
                personName={data.personName}
                affiliatedPlaces={data.affiliatedPlaces}
                isMainOligarch={data.isMainOligarch}
                personProfile={data.personProfile}
            />
        </Layout>
    );
};

export default PersonPage;
