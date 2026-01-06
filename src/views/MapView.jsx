import Map from "../components/Map";
import Layout from "./Layout";

const MapView = () => {
    return (
        <Layout withSearch={true} withList={true}>
            <Map />
        </Layout>
    );
};

export default MapView;
