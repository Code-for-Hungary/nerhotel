import Hotels from "../components/hotels/Hotels";
import Layout from "./Layout";

const HotelsPage = () => {
    return (
        <Layout withSearch={true} withList={true}>
            <Hotels />
        </Layout>
    );
};

export default HotelsPage;
