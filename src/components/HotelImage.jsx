import { useRef } from "react";
import styles from "../css/hotel-image.module.css";

function HotelImage({ src, alt = "" }) {
    const imgContainerRef = useRef(null);
    return (
        <figure className={styles.hotelImage} ref={imgContainerRef}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onError={(e) => {
                    console.log(e);
                    // this.style.display = "none";
                    imgContainerRef.current.style.display = "none";
                }}
            />
        </figure>
    );
}

export default HotelImage;
