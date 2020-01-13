import React from 'react';
import { connect } from 'react-redux';
import store, { openList, setList, setSelectedPoint, openPopup, setMap } from '../store.js';

import { Map, Marker, TileLayer } from 'react-leaflet';
import LocateControl from './LocateControl.js';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import orangeIcon from '../assets/marker-icon-orange.svg';
import blueIcon from '../assets/marker-icon-blue.svg';

import Popup from '../components/Popup';
import Icon from '../components/Icon';

import places from '../data/nerhotel.json';
import listIcon from '../assets/menu-icon.svg';

import styles from '../css/map.module.css';

const filterPoints = (points, bounds) => {
  return points.filter(point => {
    const [lat, lng] = point.geometry.coordinates;
    return (lng > bounds._southWest.lng && lng < bounds._northEast.lng
      && lat > bounds._southWest.lat && lat < bounds._northEast.lat);
  });
};

const getIcon = (iconUrl) => {
  return L.icon({
    iconUrl,
    shadowUrl: iconShadow,
    iconSize: [40, 62],
    iconAnchor: [20, 52],
    shadowSize: [40, 62],
    shadowAnchor: [12, 62]
  });
};

const createClusterCustomIcon = (cluster) => {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: styles.clusterMarker,
    iconSize: L.point(40, 40, true),
  });
};

class MapComponent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      bounds: null,
      filteredPoints: [],
      showPopup: false,
    };

    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.calcPoints = this.calcPoints.bind(this);
    this.openLocationList = this.openLocationList.bind(this);
  }

  componentDidMount () {
    if (!this.state.bounds) {
      store.dispatch(setMap(this.refs.map.leafletElement));
      this.calcPoints();
    }
  }

  calcPoints () {
    let bounds = this.refs.map.leafletElement.getBounds();
    const filteredPoints = filterPoints(places, bounds);
    this.setState({filteredPoints});
    store.dispatch(setList(filteredPoints));
  }

  onZoomEnd (e) {
    this.calcPoints();
  }

  onMoveEnd () {
    this.calcPoints();
  }

  onMarkerClick (e, point) {
    store.dispatch(setSelectedPoint(point));
    store.dispatch(openPopup());
  }

  openLocationList () {
    store.dispatch(openList());
  }

  render () {
    const locateOptions = {
      position: 'topright',
      keepCurrentZoomLevel: true
    };

    const MarkerList = () => {
      return this.state.filteredPoints.map((point, i) => {
        const [lat, lng] = point.geometry.coordinates;
        const isSelected = this.props.selectedPoint && this.props.selectedPoint.properties.id === point.properties.id;
        const DefaultIcon = getIcon(orangeIcon);
        const ActiveIcon = getIcon(blueIcon);

        return (
          <Marker position={[lat, lng]} key={i} icon={isSelected ? ActiveIcon : DefaultIcon} onClick={(e) => this.onMarkerClick(e, point)}/>
        );
      });
    };

    return (
        <>
      <div className={styles.map}>
        <div className={styles.mapWrapper}>
          <Map ref='map' className="markercluster-map" center={this.props.center} zoom={16} maxZoom={19} onZoomEnd={this.onZoomEnd} onMoveEnd={this.onMoveEnd}>
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
            />
            <MarkerClusterGroup maxClusterRadius={6} zoomToBoundsOnClick={true} showCoverageOnHover={false} iconCreateFunction={createClusterCustomIcon}>
              <MarkerList/>
            </MarkerClusterGroup>
            <LocateControl options={locateOptions} startDirectly/>
          </Map>
          <div className={styles.listButton} onClick={this.openLocationList}>
            <Icon img={listIcon} size="small"/>
          </div>
        </div>

      </div>
          {this.props.showPopup && (<Popup close={this.closePopup} point={this.props.selectedPoint}/>)}
        </>
    );
  }
}

const mapStateToProps = state => ({
  center: state.center,
  selectedPoint: state.selectedPoint,
  showPopup: state.showPopup
});

export default connect(mapStateToProps)(MapComponent);
