import MapComponent from "../components/Map";
import Layout from "./Layout";
import Banner from "../components/Banner";

const MapView = (props) => {
    return (
        <Layout withSearch={true} withList={true} history={props.history}>
            <Banner />
            <MapComponent />
        </Layout>
    );
};

export default MapView;
