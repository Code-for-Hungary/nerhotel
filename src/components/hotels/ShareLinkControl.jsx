import { useState } from "react";

import styles from "./ShareLinkControl.module.css";
import listStyles from "../../css/map-list-opener.module.css";
import Icon from "../ui/Icon";
import Toast from "../ui/Toast";
import shareIcon from "../../assets/share-icon.svg";

function ShareLinkControl({ shareLink }) {
    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        shareLink();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <>
            <button className={`${listStyles.controlButton} ${styles.shareButton}`} onClick={handleClick}>
                <Icon img={shareIcon} />
            </button>
            {showToast && <Toast message="A térképpont címe vágólapra lett másolva." />}
        </>
    );
}

export default ShareLinkControl;
