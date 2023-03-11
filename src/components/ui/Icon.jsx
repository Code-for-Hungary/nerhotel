import styles from "./Icon.module.css";

function Icon(props) {
    return (
        <div className={[styles.iconWrapper, styles[props.size]].join(" ") + " " + (props.className || "")}>
            <img src={props.img} alt={props.alt ? props.alt : ""} />
        </div>
    );
}

export default Icon;
