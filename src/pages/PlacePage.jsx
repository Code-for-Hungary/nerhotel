import { useLoaderData } from "react-router";

import { getApiUrl } from "../utils/api/get-api-url";

import Layout from "./Layout";
import Place from "../components/place/Place";

export async function clientLoader({ params }) {
    const id = params.id;
    const apiUrl = `${getApiUrl("place")}${id}`;
    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error(`Failed to fetch place, with id of "${id}"`);

    return await res.json();
}

const PlacePage = () => {
    const place = useLoaderData();

    return (
        <Layout>
            <Place place={place} />
        </Layout>
    );
};

export default PlacePage;
