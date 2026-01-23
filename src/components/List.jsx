import { useTranslation, Trans } from "react-i18next";

import styles from "../css/list.module.css";
import Icon from "./ui/Icon";

import closeIcon from "../assets/close-icon.svg";
import ListItem from "./ListItem";

function List({ list, onItemClick, onClose }) {
    const { t } = useTranslation();

    return (
        <div className={styles.list} aria-modal>
            <div className={styles.listContent}>
                <div className={styles.closeContainer}>
                    <button type="button" className={`resetButton ${styles.closeButton}`} onClick={onClose}>
                        <Icon img={closeIcon} size="large" />
                    </button>
                </div>
                <div className={styles.scrollPlane}>
                    <div className={styles.listWrapper}>
                        {list &&
                            list.length > 0 &&
                            list.map((item) => <ListItem key={item.properties.id} item={item} onClick={onItemClick} />)}

                        {list.length === 0 && (
                            <p>
                                <Trans i18nKey="list.emptyState">
                                    Adatbázisunkban nincsen megfelelő szállás- vagy vendéglátóhely. Ha tudsz egy politikaközeli helyet,
                                    <a href={t("list.sendToUsLink")} target="_blank" rel="noopener noreferrer">
                                        küldd el nekünk
                                    </a>
                                    !
                                </Trans>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
