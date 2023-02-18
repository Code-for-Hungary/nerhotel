import { useContext, useCallback } from "react";
import styles from "../css/list.module.css";
import Icon from "./Icon";
import { Trans } from "react-i18next";

import closeIcon from "../assets/close-icon.svg";
import ListItem from "./ListItem";

import { MapContext } from "../context";

function List() {
    const { dispatch, list, map } = useContext(MapContext);

    const showItem = useCallback(
        (item) => () => {
            const [lat, lng] = item.geometry.coordinates;
            if (map) {
                map.setView([lat, lng], 18);
            }
            dispatch({ type: "SetCenter", center: [lat, lng] });
            dispatch({ type: "SetSelectedPoint", point: item });
            dispatch({ type: "ToggleList", showList: false });
            dispatch({ type: "TogglePopup", showPopup: true });
        },
        [map, dispatch]
    );

    const closeList = useCallback(() => {
        dispatch({ type: "ToggleList", showList: false });
    }, [dispatch]);

    return (
        <div className={styles.list}>
            <div className={styles.closeButton} onClick={closeList}>
                <Icon img={closeIcon} size="large" />
            </div>
            <div className={styles.listWrapper}>
                {list && list.length > 0 && list.map((item, key) => <ListItem key={key} item={item} onClick={showItem(item)} />)}

                {list.length === 0 && (
                    <p>
                        <Trans i18nKey="list:emptyState">
                            Adatbázisunkban nincsen megfelelő szállás- vagy vendéglátóhely. Ha tudsz egy politikaközeli helyet,{" "}
                            <a href="https://www.partimap.eu/p/nerhotel-bekuldes">küldd el nekünk</a>!
                        </Trans>
                    </p>
                )}
            </div>
        </div>
    );
}

export default List;
