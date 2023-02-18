import styles from "../css/hotel-image.module.css";

function HotelImage({ src, alt = "" }) {
    return (
        <figure className={styles.hotelImage}>
            <img src={src} alt={alt} loading="lazy" />
        </figure>
    );
}

export default HotelImage;
