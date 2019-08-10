import React from 'react';
import { connect } from 'react-redux';
import store, {closeList, setCenter, setSelectedPoint, openPopup} from '../store.js'
import styles from '../css/list.module.css'
import Icon from './Icon.js'

import closeIcon from '../assets/close-icon.svg';
import horseIcon from '../assets/horse-icon.svg';
import pinIcon from '../assets/pin-icon.svg';

class List extends React.Component {
    closeList() {
        store.dispatch(closeList())
    }

    showItem(item) {
        const [lat, lng] = item.geometry.coordinates
        this.props.map.setView([lat, lng], 18);
        store.dispatch(setCenter([lat, lng]))
        store.dispatch(setSelectedPoint(item))
        store.dispatch(closeList())
        store.dispatch(openPopup())
    }

    render () {
        return (
            <div className={styles.list}>
                <div className={styles.closeButton} onClick={() => this.closeList()}>
                    <Icon img={closeIcon} size="large"/>
                </div>
                <div>
                    {this.props.list.length > 0 && this.props.list.map(item => (
                        <div className={styles.listItem} onClick={() => this.showItem(item)}>
                            <h1>{item.properties.name}</h1>
                            <div className={styles.listItemRow}>
                                <div className={styles.listItemCol}>
                                    <Icon img={horseIcon} size="small"/>
                                    <p>{item.properties.oligarch}</p>
                                </div>
                                <div className={styles.listItemCol}>
                                    <Icon img={pinIcon} size="small"/>
                                    <p>{item.properties.address}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {this.props.list.length === 0 && (
                        <p>Nincs megfelelo NER hotel.</p>
                    )}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    list: state.list,
    map: state.map
})


export default connect(mapStateToProps)(List)
