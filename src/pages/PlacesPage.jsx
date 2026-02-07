import Places from "../components/places/Places";
import Layout from "./Layout";

const PlacesPage = () => {
    return (
        <Layout withSearch={true} withList={true}>
            <Places />
        </Layout>
    );
};

export default PlacesPage;
