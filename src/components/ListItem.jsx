import Icon from "./Icon";
import horseIcon from "../assets/horse-icon.svg";
import pinIcon from "../assets/pin-icon.svg";
import styles from "../css/list-item.module.css";

const ListItem = ({ item, ...props }) => {
    const oligarchs = item.properties.mainOligarch.length > 0 ? item.properties.mainOligarch : item.properties.oligarchs;

    return (
        <div className={styles.listItem} {...props}>
            <h1>{item.properties.name}</h1>
            <div className={styles.listItemRow}>
                <div className={styles.listItemCol}>
                    <Icon img={horseIcon} size="small" />
                    <div className={styles.oligarchList}>
                        {oligarchs.map((oligarch, key) => (
                            <p key={key}>
                                {oligarch.link ? (
                                    <a href={oligarch.link} target="_blank" rel="noopener noreferrer">
                                        {oligarch.name}
                                    </a>
                                ) : (
                                    oligarch.name
                                )}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={styles.listItemCol}>
                    <Icon img={pinIcon} size="small" />
                    <p>{item.properties.address}</p>
                </div>
            </div>
        </div>
    );
};

export default ListItem;
