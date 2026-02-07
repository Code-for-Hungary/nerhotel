import { useRef } from "react";
import styles from "./PlaceImage.module.css";

function PlaceImage({ src, alt = "" }) {
    const imgContainerRef = useRef(null);
    return (
        <figure className={styles.placeImage} ref={imgContainerRef}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onError={(e) => {
                    console.error(e);
                    imgContainerRef.current.style.display = "none";
                }}
            />
        </figure>
    );
}

export default PlaceImage;
