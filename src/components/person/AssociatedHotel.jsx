import { useTranslation } from "react-i18next";
import styles from "../../css/hotel.module.css";
import { SmartLink } from "../SmartLink";
import getTranslatedHotelProperty from "../../utils/get-translated-hotel-property";

function AssociatedHotel({ hotel, ...props }) {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    let details = null;
    if (resolvedLanguage === "en" && hotel.properties.en.details) {
        details = hotel.properties.en.details;
    }
    if (resolvedLanguage === "hu" && hotel.properties.details) {
        details = hotel.properties.details;
    }
    return (
        <li className={styles.oligarch} {...props}>
            <SmartLink to={`/hotel/${hotel.properties.id}`}>
                {getTranslatedHotelProperty("name", resolvedLanguage, hotel.properties)}
            </SmartLink>
            <span className={styles.title}> ({getTranslatedHotelProperty("type", resolvedLanguage, hotel.properties)})</span>
            {hotel.properties.address && ` – ${hotel.properties.address}`}
            {hotel.properties.date && <> – {hotel.properties.date}</>}
            {details && (
                <p>
                    <span>{t("general:additionalInfo")}:</span> {details}
                </p>
            )}
        </li>
    );
}

export default AssociatedHotel;
