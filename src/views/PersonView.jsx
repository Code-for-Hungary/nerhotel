import { useParams } from "react-router-dom";

import Layout from "./Layout";
import Person from "../components/person/Person";

const PersonView = () => {
    const { name } = useParams();

    return (
        <Layout>
            <Person name={name} />
        </Layout>
    );
};

export default PersonView;
