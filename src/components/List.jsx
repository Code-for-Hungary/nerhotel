import { useContext, useCallback } from "react";
import styles from "../css/list.module.css";
import Icon from "./ui/Icon";
import { useTranslation, Trans } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import closeIcon from "../assets/close-icon.svg";
import ListItem from "./ListItem";

import { MapContext } from "../context";

function List() {
    const { dispatch, list, map } = useContext(MapContext);
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();

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
            if (location.pathname !== "/") {
                history.push("/");
            }
        },
        [map, dispatch, history, location]
    );

    const closeList = useCallback(() => {
        dispatch({ type: "ToggleList", showList: false });
    }, [dispatch]);

    return (
        <div className={styles.list} aria-modal>
            <div className={styles.closeButton} onClick={closeList}>
                <Icon img={closeIcon} size="large" />
            </div>
            <div className={styles.listWrapper}>
                {list && list.length > 0 && list.map((item, key) => <ListItem key={key} item={item} onClick={showItem(item)} />)}

                {list.length === 0 && (
                    <p>
                        <Trans i18nKey="list:emptyState">
                            Adatbázisunkban nincsen megfelelő szállás- vagy vendéglátóhely. Ha tudsz egy politikaközeli helyet,
                            <a href={t("list:sendToUsLink")} target="_blank" rel="noopener noreferrer">
                                küldd el nekünk
                            </a>
                            !
                        </Trans>
                    </p>
                )}
            </div>
        </div>
    );
}

export default List;
