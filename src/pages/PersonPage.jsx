import { useLoaderData } from "react-router";

import Layout from "./Layout";
import Person from "../components/person/Person";
import { getApiUrl } from "../utils/api/get-api-url";

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

    const kMonitorDbId = person && person.id ? person.id : undefined;

    return {
        personName,
        affiliatedPlaces,
        isMainOligarch,
        kMonitorDbId,
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
                kMonitorDbId={data.kMonitorDbId}
            />
        </Layout>
    );
};

export default PersonPage;
