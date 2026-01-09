import { useParams } from "react-router";

import Layout from "./Layout";
import Hotel from "../components/hotel/Hotel";

const HotelPage = () => {
    const { id } = useParams();

    return (
        <Layout>
            <Hotel id={id} />
        </Layout>
    );
};

export default HotelPage;
