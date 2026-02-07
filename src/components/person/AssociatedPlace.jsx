import { useTranslation } from "react-i18next";
import styles from "../../css/place.module.css";
import { SmartLink } from "../SmartLink";
import getTranslatedPlaceProperty from "../../utils/get-translated-place-property";

function AssociatedPlace({ place, ...props }) {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    let details = null;
    if (resolvedLanguage === "en" && place.properties.en.details) {
        details = place.properties.en.details;
    }
    if (resolvedLanguage === "hu" && place.properties.details) {
        details = place.properties.details;
    }
    return (
        <li className={styles.oligarch} {...props}>
            <SmartLink to={`/place/${place.properties.id}`}>
                {getTranslatedPlaceProperty("name", resolvedLanguage, place.properties)}
            </SmartLink>
            <span className={styles.title}> ({getTranslatedPlaceProperty("type", resolvedLanguage, place.properties)})</span>
            {place.properties.address && ` – ${place.properties.address}`}
            {place.properties.date && <> – {place.properties.date}</>}
            {details && (
                <p>
                    <span>{t("general.additionalInfo")}:</span> {details}
                </p>
            )}
        </li>
    );
}

export default AssociatedPlace;
