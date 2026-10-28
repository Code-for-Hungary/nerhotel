import { Component } from "react";
import ErrorScreen from "../components/ErrorScreen";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.error(error);
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback === undefined) {
                return <ErrorScreen standAlone={true} />;
            }

            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
