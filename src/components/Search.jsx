import { useNavigate } from "react-router";
import { Trans, useTranslation } from "react-i18next";

import styles from "../css/map.module.css";
import List from "./List";

import { OnePercentDonationBanner } from "./one-percent-donation-banner";
import { useBannerContext } from "../context/banner-provider";

export const Search = ({ results }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { isVisible, onDismiss } = useBannerContext();

    return (
        <div className={styles.map}>
            <div className={styles.mapWrapper}>
                {results && (
                    <List
                        list={results}
                        onClose={() => navigate(-1)}
                        beforeItemsSlot={isVisible ? <OnePercentDonationBanner isInline onDismiss={onDismiss} /> : null}
                        emptyState={
                            <Trans i18nKey="list.emptyState">
                                Adatbázisunkban nincsen megfelelő szállás- vagy vendéglátóhely. Ha tudsz egy politikaközeli helyet,
                                <a href={t("list.sendToUsLink")} target="_blank" rel="noopener noreferrer">
                                    küldd el nekünk
                                </a>
                                !
                            </Trans>
                        }
                    />
                )}
            </div>
        </div>
    );
};
