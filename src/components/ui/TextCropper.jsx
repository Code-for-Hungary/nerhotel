import { useState } from "react";
import styles from "./TextCropper.module.css";

function TextCropper({ openTextLabel, closeTextLabel, linesToDisplay = 5, opened = false, children, ...props }) {
    const [isOpened, setIsOpened] = useState(opened);
    const openerClickHandler = (e) => {
        setIsOpened(!isOpened);
    };

    return (
        <div
            className={`${styles.TextCropper} ${isOpened ? styles["TextCropper--open"] : ""}`}
            {...props}
            style={{ "--text-cropper-height": `calc(33.6px * ${linesToDisplay})` }}
        >
            <div className={styles["TextCropper__crop"]}>{children}</div>
            <div className={styles["TextCropper__mask"]}>
                <button type="button" className={styles["TextCropper__opener"]} onClick={openerClickHandler}>
                    {isOpened ? closeTextLabel : openTextLabel}
                </button>
            </div>
        </div>
    );
}

export default TextCropper;
