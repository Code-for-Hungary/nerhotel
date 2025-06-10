import styles from "./Wrapper.module.css";

export const Wrapper = ({ children, narrow = false, ...props }) => {
    return (
        <main className={`${styles.wrapper} ${narrow ? styles.narrow : ""}`} {...props}>
            {children}
        </main>
    );
};
