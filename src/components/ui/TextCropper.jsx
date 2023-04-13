import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./TextCropper.module.css";
import useWindowSize from "../../hooks/window-size";

function TextCropper({ openTextLabel, closeTextLabel, linesToDisplay = 5, opened = false, children, ...props }) {
    const [isOpened, setIsOpened] = useState(opened);
    const [width] = useWindowSize();
    const [isInactive, setIsInactive] = useState(false);
    const lineHeight = 33.6;
    const croppedHeight = lineHeight * linesToDisplay;
    const contentRef = useRef(null);
    const openerClickHandler = (_) => {
        setIsOpened(!isOpened);
    };

    const checkIfNeedsCropping = useCallback(() => {
        if (contentRef.current.clientHeight <= croppedHeight) {
            setIsInactive(true);
        }
    }, [croppedHeight]);

    useEffect(checkIfNeedsCropping, [checkIfNeedsCropping, width]);

    return (
        <div
            className={`${styles.TextCropper} ${isOpened ? styles["TextCropper--open"] : ""} ${
                isInactive ? styles["TextCropper--inactive"] : ""
            }`}
            {...props}
            style={{ "--text-cropper-height": `${croppedHeight}px` }}
        >
            <div className={styles["TextCropper__crop"]}>
                <div ref={contentRef}>{children}</div>
            </div>
            <div className={styles["TextCropper__mask"]}>
                <button type="button" className={styles["TextCropper__opener"]} onClick={openerClickHandler}>
                    {isOpened ? closeTextLabel : openTextLabel}
                </button>
            </div>
        </div>
    );
}

export default TextCropper;
