import { useContext, useCallback, useRef } from "react";
import { SmartLink } from "../SmartLink";
import closeIcon from "../../assets/close-icon.svg";
import styles from "./Menu.module.css";
import Icon from "../ui/Icon";
import image from "../../assets/nh-main.svg";
import logo from "../../assets/nh-logo.svg";
import logoEn from "../../assets/nh-logo-en.svg";
import { MapContext } from "../../context";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import "./Menu.transition.css";

const Menu = () => {
    const menuRef = useRef(null);
    const backdropRef = useRef(null);
    const { dispatch, showMenu } = useContext(MapContext);
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const closeMenu = useCallback(() => {
        dispatch({ type: "ToggleMenu", showMenu: false });
        dispatch({ type: "ToggleList", showList: false });
    }, [dispatch]);

    return (
        <>
            <CSSTransition in={showMenu} nodeRef={menuRef} classNames="Menu" unmountOnExit timeout={200}>
                <nav className={styles.menu} ref={menuRef}>
                    <div className={styles.content}>
                        <div className={styles.close}>
                            <button onClick={closeMenu} type="button" className="resetButton">
                                <Icon img={closeIcon} size="large" />
                            </button>
                        </div>

                        <div className={styles.logoWrapper}>
                            <img src={resolvedLanguage === "hu" ? logo : logoEn} alt="" style={{ aspectRatio: "47 / 112" }} />
                        </div>

                        <ul className={styles.menulist}>
                            <li>
                                <SmartLink to="/" onClick={closeMenu}>
                                    {t("navigation.map")}
                                </SmartLink>
                            </li>
                            <li>
                                <SmartLink to="/about" onClick={closeMenu}>
                                    {t("navigation.about")}
                                </SmartLink>
                            </li>
                            <li>
                                <SmartLink to={t("navigation.submit-link")} onClick={closeMenu}>
                                    {t("navigation.submit")}
                                </SmartLink>
                            </li>
                            <li>
                                <SmartLink to="/contact" onClick={closeMenu}>
                                    {t("navigation.contact")}
                                </SmartLink>
                            </li>
                            <li>
                                <SmartLink to="https://tamogatas.k-monitor.hu" onClick={closeMenu}>
                                    {t("navigation.supportUs")}
                                </SmartLink>
                            </li>
                            <li>
                                <SmartLink to="/data-export" onClick={closeMenu}>
                                    {t("navigation.export")}
                                </SmartLink>
                            </li>
                            {/* This page is only relevant to Hungarian speakers as it's not translated,
                                so it doesn't make sense to add a translation key.
                            */}
                            {resolvedLanguage === "hu" && (
                                <li>
                                    <SmartLink to="/press-releases" onClick={closeMenu}>
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
                            <p>{t("navigation.address.heading")}:</p>
                            <p>{t("navigation.address.address")}</p>
                            <SmartLink to="info@k-monitor.hu">info@k-monitor.hu</SmartLink>
                        </address>
                    </div>
                </nav>
            </CSSTransition>
            <CSSTransition in={showMenu} nodeRef={backdropRef} classNames="MenuBackdrop" unmountOnExit timeout={200}>
                <div className={styles.backdrop} ref={backdropRef} onClick={closeMenu} />
            </CSSTransition>
        </>
    );
};

export default Menu;
