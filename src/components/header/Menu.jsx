import { useContext, useCallback } from "react";
import { SmartLink } from "../SmartLink";
import closeIcon from "../../assets/close-icon.svg";
import styles from "./Menu.module.css";
import Icon from "../ui/Icon";
import image from "../../assets/nh-main.svg";
import logo from "../../assets/nh-logo.svg";
import logoEn from "../../assets/nh-logo-en.svg";
import { MapContext } from "../../context";
import PoweredByVercel from "../PoweredByVercel";
import { useTranslation } from "react-i18next";

const Menu = () => {
    const { dispatch, showMenu } = useContext(MapContext);
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const closeMenu = useCallback(() => {
        dispatch({ type: "ToggleMenu", showMenu: false });
    }, [dispatch]);

    if (!showMenu) {
        return null;
    }

    const isDesktop = window.innerWidth > 768;

    return (
        <aside className={styles.menu}>
            <div className={styles.content}>
                <div onClick={closeMenu} className={styles.close}>
                    <Icon img={closeIcon} size="large" />
                </div>
                {isDesktop && (
                    <div className={styles.logoWrapper}>
                        <img src={resolvedLanguage === "hu" ? logo : logoEn} alt="" style={{ aspectRatio: "47 / 112" }} />
                    </div>
                )}
                <ul className={styles.menulist}>
                    <li>
                        <SmartLink to="/" onClick={closeMenu}>
                            {t("navigation:map")}
                        </SmartLink>
                    </li>
                    <li>
                        <SmartLink to="/about" onClick={closeMenu}>
                            {t("navigation:about")}
                        </SmartLink>
                    </li>
                    <li>
                        <a href="https://www.partimap.eu/hu/p/nerhotel-bekuldes/0" target=new">Küldj be!</a>
                    </li>
                    <li>
                        <SmartLink to="/contact" onClick={closeMenu}>
                            {t("navigation:contact")}
                        </SmartLink>
                    </li>
                    <li>
                        <SmartLink to="https://tamogatas.k-monitor.hu" onClick={closeMenu}>
                            {t("navigation:supportUs")}
                        </SmartLink>
                    </li>
                    <li>
                        <SmartLink to="/data-export" onClick={closeMenu}>
                            {t("navigation:export")}
                        </SmartLink>
                    </li>
                </ul>
                {isDesktop && (
                    <div className={styles.imageWrapper}>
                        <img src={image} alt="" />
                    </div>
                )}
                <address className={styles.footer}>
                    <p>
                        <strong
                            dangerouslySetInnerHTML={{
                                __html: t("navigation:address.name"),
                            }}
                        />
                    </p>
                    <p>{t("navigation:address.heading")}:</p>
                    <p>{t("navigation:address.address")}</p>
                    <SmartLink to="info@k-monitor.hu">info@k-monitor.hu</SmartLink>
                </address>
            </div>
            <PoweredByVercel link={"https://vercel.com/"} />
        </aside>
    );
};

export default Menu;
