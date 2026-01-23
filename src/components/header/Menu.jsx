import { useRef } from "react";
import { SmartLink } from "../SmartLink";
import closeIcon from "../../assets/close-icon.svg";
import styles from "./Menu.module.css";
import Icon from "../ui/Icon";
import image from "../../assets/nh-main.svg";
import logo from "../../assets/nh-logo.svg";
import logoEn from "../../assets/nh-logo-en.svg";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import "./Menu.transition.css";

const Menu = ({ showMenu, onClose }) => {
    const menuRef = useRef(null);
    const backdropRef = useRef(null);
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    return (
        <>
            <CSSTransition in={showMenu} nodeRef={menuRef} classNames="Menu" unmountOnExit timeout={200}>
                <nav className={styles.menu} ref={menuRef}>
                    <div className={styles.close}>
                        <button onClick={onClose} type="button" className="resetButton">
                            <Icon img={closeIcon} size="large" />
                        </button>
                    </div>

                    <div className={styles.logoWrapper}>
                        <img src={resolvedLanguage === "hu" ? logo : logoEn} alt="" style={{ aspectRatio: "47 / 112" }} />
                    </div>

                    <ul className={styles.menulist}>
                        <li>
                            <SmartLink to="/" onClick={onClose}>
                                {t("navigation.map")}
                            </SmartLink>
                        </li>
                        <li>
                            <SmartLink to="/about" onClick={onClose}>
                                {t("navigation.about")}
                            </SmartLink>
                        </li>
                        <li>
                            <SmartLink to={t("navigation.submit-link")} onClick={onClose}>
                                {t("navigation.submit")}
                            </SmartLink>
                        </li>
                        <li>
                            <SmartLink to="/contact" onClick={onClose}>
                                {t("navigation.contact")}
                            </SmartLink>
                        </li>
                        <li>
                            <SmartLink to="https://tamogatas.k-monitor.hu" onClick={onClose}>
                                {t("navigation.supportUs")}
                            </SmartLink>
                        </li>
                        <li>
                            <SmartLink to="/data-export" onClick={onClose}>
                                {t("navigation.export")}
                            </SmartLink>
                        </li>
                        {/* This page is only relevant to Hungarian speakers as it's not translated,
                                so it doesn't make sense to add a translation key.
                            */}
                        {resolvedLanguage === "hu" && (
                            <li>
                                <SmartLink to="/press-releases" onClick={onClose}>
                                    #nerhotel
                                </SmartLink>
                            </li>
                        )}
                    </ul>

                    <div className={styles.imageWrapper}>
                        <img src={image} alt="" />
                    </div>

                    <address className={styles.footer}>
                        <p>
                            <strong
                                dangerouslySetInnerHTML={{
                                    __html: t("navigation.address.name"),
                                }}
                            />
                        </p>
                        <p>
                            {t("navigation.address.heading")}: <br />
                            {t("navigation.address.address")}
                        </p>
                        <p>
                            <SmartLink to="info@k-monitor.hu">info@k-monitor.hu</SmartLink>
                        </p>
                    </address>
                </nav>
            </CSSTransition>
            <CSSTransition in={showMenu} nodeRef={backdropRef} classNames="MenuBackdrop" unmountOnExit timeout={200}>
                <div className={styles.backdrop} ref={backdropRef} onClick={onClose} />
            </CSSTransition>
        </>
    );
};

export default Menu;
