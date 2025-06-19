import MapComponent from "../components/Map";
import Layout from "./Layout";

const MapView = () => {
    return (
        <Layout withSearch={true} withList={true}>
            <MapComponent />
        </Layout>
    );
};

export default MapView;
