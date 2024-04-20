import { forwardRef } from "react";
import styles from "./Popup.module.css";
import { SmartLink } from "./SmartLink";
import Button from "./ui/Button";
import Icon from "./ui/Icon";
import closeIcon from "../assets/close-icon.svg";
import horseIcon from "../assets/horse-icon.svg";
import hotelIcon from "../assets/hotel-icon.svg";
import linkIcon from "../assets/link-icon.svg";
import pinIcon from "../assets/pin-icon.svg";
import arrowIcon from "../assets/arrow-icon.svg";
import { getOligarchData } from "../utils";
import { useTranslation } from "react-i18next";
import displayTranslatedPersonType from "../utils/person/display-translated-person-type";
import "./Popup.transition.css";

const Popup = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const data = props.point ? props.point.properties : undefined;

    const mainOligarchs = data ? getOligarchData(data.mainOligarch, data.mainCEO) : undefined;
    const simpleOligarchs = data ? getOligarchData(data.oligarchs || [], data.ceos || []) : undefined;
    const oligarchsToShow = mainOligarchs && mainOligarchs.length > 0 ? mainOligarchs : simpleOligarchs;

    return data ? (
        <div className={styles.popup} ref={ref}>
            <header className={styles.popupHeader}>
                <h1>{data.name}</h1>
                <button className={`${styles.close} resetButton`} onClick={props.onClose}>
                    <Icon img={closeIcon} size="large" className={styles.desktopCloseIcon} />
                    <Icon img={arrowIcon} size="large" className={styles.mobileCloseIcon} />
                </button>
            </header>
            <div className={styles.popupContent}>
                <div className={`${styles.popupRow} ${styles.popupRowTopLevel}`}>
                    <div className={styles.popupCol}>
                        <span>{t("general.maintainer")}</span>
                        <div className={styles.popupRow}>
                            <Icon img={hotelIcon} size="small" />
                            <div className={styles.company}>
                                {data.company && data.company.link ? (
                                    <p>
                                        <a href={data.company.link} target="_blank" rel="noopener noreferrer">
                                            {data.company.name}
                                        </a>
                                    </p>
                                ) : (
                                    <p>{data.company.name}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {oligarchsToShow && oligarchsToShow.length > 0 && (
                        <div className={styles.popupCol}>
                            <span>{t("person.pep")}</span>
                            <div className={styles.popupRow}>
                                <Icon img={horseIcon} size="small" />
                                <div className={styles.oligarch}>
                                    {oligarchsToShow.map((oligarch, key) => (
                                        <div key={key}>
                                            {oligarch.data.link !== "" ? (
                                                <SmartLink to={`/person/${oligarch.name}`}>{oligarch.name}</SmartLink>
                                            ) : (
                                                <p>{oligarch.name}</p>
                                            )}
                                            <span>{displayTranslatedPersonType(oligarch.data.type, t)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <span>{t("general.address")}</span>
                    <div className={styles.popupRow}>
                        <Icon img={pinIcon} size="small" />
                        <p>{data.address}</p>
                    </div>
                </div>
                {data.link !== "" && (
                    <div className={styles.popupRow}>
                        <Icon img={linkIcon} size="small" />
                        <a href={data.link} target="_blank" rel="noopener noreferrer">
                            {t("general.article")}
                        </a>
                    </div>
                )}
            </div>
            <footer className={styles.popupFooter}>
                <Button to={`/hotel/${data.id}`} isFull={true} onClick={props.onClose}>
                    {t("popUp.linkText")}
                </Button>
            </footer>
        </div>
    ) : null;
});

export default Popup;
