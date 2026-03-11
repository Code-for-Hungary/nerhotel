import { forwardRef } from "react";
import { useTranslation, Trans } from "react-i18next";

import styles from "../css/list.module.css";
import Icon from "./ui/Icon";

import closeIcon from "../assets/close-icon.svg";
import ListItem from "./ListItem";
import "./List.transition.css";

const List = forwardRef(({ list, onItemClick, onClose, emptyState, beforeItemsSlot, ...props }, ref) => {
    return (
        <div className={styles.list} aria-modal ref={ref} {...props}>
            <div className={styles.listContent}>
                <div className={styles.closeContainer}>
                    <button type="button" className={`resetButton ${styles.closeButton}`} onClick={onClose}>
                        <Icon img={closeIcon} size="large" />
                    </button>
                </div>
                <div className={styles.scrollPlane}>
                    <div className={styles.listWrapper}>
                        {beforeItemsSlot ? beforeItemsSlot : null}
                        {list &&
                            list.length > 0 &&
                            list.map((item) => <ListItem key={item.properties.id} item={item} onClick={onItemClick} />)}

                        {list.length === 0 && <p>{emptyState}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default List;
