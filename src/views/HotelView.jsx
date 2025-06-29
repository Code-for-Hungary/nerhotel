import { useParams } from "react-router";

import Layout from "./Layout";
import Hotel from "../components/Hotel";

const HotelView = () => {
    const { id } = useParams();

    return (
        <Layout>
            <Hotel id={id} />
        </Layout>
    );
};

export default HotelView;
