import Layout from "./Layout";
import ErrorScreen from "../components/ErrorScreen";

function ErrorView(props) {
    return (
        <Layout history={props.history}>
            <ErrorScreen />
        </Layout>
    );
}

export default ErrorView;
