import { useParams } from "react-router";

import Layout from "./Layout";
import Place from "../components/place/Place";

const PlacePage = () => {
    const { id } = useParams();

    return (
        <Layout>
            <Place id={id} />
        </Layout>
    );
};

export default PlacePage;
