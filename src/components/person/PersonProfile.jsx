import styles from "./PersonProfile.module.css";

function PersonProfile({ profileImage, text, name }) {
    return (
        <article className={styles.PersonProfile}>
            {profileImage ? (
                <figure className={styles["PersonProfile-figure"]}>
                    <img src={profileImage} alt={name} width="53" height="53" />
                </figure>
            ) : null}
            <div className={styles["PersonProfile-body"]}>
                <div dangerouslySetInnerHTML={{ __html: text }} />
            </div>
        </article>
    );
}

export default PersonProfile;
