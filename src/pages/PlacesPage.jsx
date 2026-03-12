import Places from "../components/places/Places";
import Layout from "./Layout";

import { OnePercentDonationBanner } from "../components/one-percent-donation-banner";
import { useBannerContext } from "../context/banner-provider";

const PlacesPage = () => {
    const { isVisible, onDismiss } = useBannerContext();

    return (
        <Layout withSearch={true} withList={true}>
            {isVisible && <OnePercentDonationBanner onDismiss={onDismiss} />}
            <Places />
        </Layout>
    );
};

export default PlacesPage;
