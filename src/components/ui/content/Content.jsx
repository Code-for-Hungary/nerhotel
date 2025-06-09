import styles from "./Content.module.css";

export const Content = ({ children, ...props }) => {
    return (
        <article className={styles.Content} {...props}>
            {children}
        </article>
    );
};
