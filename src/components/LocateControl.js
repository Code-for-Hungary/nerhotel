import React from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

class LocateControl extends React.Component {
    componentDidMount() {
        const { options } = this.props;
        const { map } = this.props.leaflet;

        const lc = new Locate(options);
        lc.addTo(map);
        lc.start();
    }

    render() {
        return null;
    }
}

export default withLeaflet(LocateControl);
