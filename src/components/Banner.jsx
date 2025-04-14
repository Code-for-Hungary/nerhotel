import { useState, useEffect } from "react";
import styles from "./Banner.module.css";

const Banner = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if user has previously dismissed the banner
        const bannerDismissed = localStorage.getItem("bannerDismissed");
        if (bannerDismissed === "true") {
            setIsVisible(false);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        // Store the user preference
        localStorage.setItem("bannerDismissed", "true");
    };

    if (!isVisible) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.bannerContent}>
                <img src="/k-kor.png" alt="K-Monitor" className={styles.bannerImage} />
                <p>
                    Hasznosnak találod az oldalt?{" "}
                    <strong>
                        <a href="https://tamogatas.k-monitor.hu/#onepc" target="_blank" rel="noopener noreferrer">
                            Támogasd adód 1%-ával a K-Monitort
                        </a>
                    </strong>
                    , hogy még több hasonló projektbe vághassunk bele!
                    <br />
                    Adószámunk: 18193288-1-42
                </p>
            </div>
            <button className={styles.dismissButton} onClick={handleDismiss}>
                ✕
            </button>
        </div>
    );
};

export default Banner;
