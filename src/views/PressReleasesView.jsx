import Layout from "./Layout";
import { PressReleases } from "../components/press-releases/PressReleases";

const PressReleasesView = (props) => {
    return (
        <Layout history={props.history}>
            <PressReleases />
        </Layout>
    );
};

export default PressReleasesView;
