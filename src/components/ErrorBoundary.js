import React, { Component } from 'react';
import ErrorScreen from '../components/ErrorScreen';

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
            return <ErrorScreen standAlone={true} />;
        }

        return this.props.children;
    }

}

export default ErrorBoundary;