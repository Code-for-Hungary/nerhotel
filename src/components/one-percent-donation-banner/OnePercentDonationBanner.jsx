import styles from "./OnePercentDonationBanner.module.css";

import { useAnalyticsContext } from "../analytics/AnalyticsProvider";

export const OnePercentDonationBanner = ({ isInline, onDismiss, ...props }) => {
    const { dispatchAnalyticsEvent } = useAnalyticsContext();

    const handleDismiss = () => {
        onDismiss();
        dispatchAnalyticsEvent({
            type: "CloseOnePercentBanner",
        });
    };

    return (
        <div className={`${styles.banner} ${isInline ? styles.inline : ""}`} {...props}>
            <div className={styles.bannerContent}>
                <img src="/k-kor.png" alt="K-Monitor" className={styles.bannerImage} />
                <p>
                    Hasznosnak találod az oldalt?{" "}
                    <strong>
                        <a
                            href="https://tamogatas.k-monitor.hu/#onepc?utm_source=nerhotel_banner"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Támogasd adód 1%-ával a K-Monitort
                        </a>
                    </strong>
                    , hogy még több hasonló projektbe vághassunk bele!
                    <br />
                    Adószámunk: 18193288-1-42
                </p>
            </div>
            <button type="button" className={styles.dismissButton} onClick={handleDismiss}>
                ✕
            </button>
        </div>
    );
};

export default OnePercentDonationBanner;
