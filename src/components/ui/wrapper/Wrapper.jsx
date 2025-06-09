import styles from "./Wrapper.module.css";

export const Wrapper = ({ children, ...props }) => {
    return (
        <main className={styles.wrapper} {...props}>
            {children}
        </main>
    );
};
