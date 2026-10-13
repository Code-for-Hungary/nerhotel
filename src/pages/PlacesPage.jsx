import { useLoaderData } from "react-router";

import { getApiUrl } from "../utils/api/get-api-url";

import Places from "../components/places/Places";
import { OnePercentDonationBanner } from "../components/one-percent-donation-banner";

import { useBannerContext } from "../context/banner-provider";

import Layout from "./Layout";

export async function clientLoader() {
    const apiUrl = getApiUrl("places");
    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error("Failed to fetch places");

    return res.json();
}

const PlacesPage = () => {
    const { isVisible, onDismiss } = useBannerContext();
    const places = useLoaderData();

    return (
        <Layout>
            {isVisible && <OnePercentDonationBanner onDismiss={onDismiss} />}
            <Places places={places} />
        </Layout>
    );
};

export default PlacesPage;
