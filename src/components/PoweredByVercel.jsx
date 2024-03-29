import styles from "./PoweredByVercel.module.css";
import { SmartLink } from "./SmartLink";

function PoweredByVercel(props) {
    return (
        <SmartLink to={props.link} className={styles.poweredByVercel}>
            Powered by ▲ Vercel
        </SmartLink>
    );
}

export default PoweredByVercel;
