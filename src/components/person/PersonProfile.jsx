import styles from "./PersonProfile.module.css";
import TextCropper from "../ui/TextCropper";

function PersonProfile({ profileImage, text, name }) {
    return (
        <article className={styles.PersonProfile}>
            {profileImage ? (
                <figure className={styles["PersonProfile-figure"]}>
                    <div className={styles["PersonProfile-image"]} style={{ backgroundImage: `url(${profileImage})` }} aria-label={name} />
                </figure>
            ) : null}
            <div className={styles["PersonProfile-body"]}>
                <TextCropper openTextLabel="Tovább..." closeTextLabel="Bezár">
                    <div dangerouslySetInnerHTML={{ __html: text }} />
                </TextCropper>
            </div>
        </article>
    );
}

export default PersonProfile;
