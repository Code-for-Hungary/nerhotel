import { useNavigation } from "react-router";

import styles from "./LoadingBar.module.css";

export function LoadingBar() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return <div className={`${styles.progressBar} ${isLoading ? styles.loading : styles.idle}`} />;
}
