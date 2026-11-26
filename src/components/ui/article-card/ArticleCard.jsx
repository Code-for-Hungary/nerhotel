import { FaNewspaper, FaCalendarDays } from "react-icons/fa6";

import styles from "./ArticleCard.module.css";

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = date.toLocaleString("hu-HU", { month: "long" });
    const day = date.getDate();

    return `${year} ${month} ${day}.`;
}

export function ArticleCard({ title, description, newspaper, source, tags, timestamp, ...props }) {
    return (
        <article className={styles.articleCard} {...props}>
            <h2 className={styles.heading}>
                <a href={source} target="_blank" rel="noopener noreferrer">
                    {title}
                </a>
            </h2>

            {newspaper && source && (
                <div className={styles.source}>
                    <span className={styles.meta}>
                        <FaNewspaper /> {newspaper}
                    </span>
                    <time className={styles.meta} dateTime={new Date(timestamp).toISOString()}>
                        <FaCalendarDays /> {formatTimestamp(timestamp)}
                    </time>
                </div>
            )}
            {description && <p className={styles.description}>{description}</p>}

            {tags && tags.length > 0 && (
                <ul className={`resetList ${styles.tags}`}>
                    {tags.map((tag) => (
                        <li key={`${tag.name}`}>
                            <a href={tag.url} className={styles.tag} target="_blank" rel="noopener noreferrer">
                                {tag.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <a aria-hidden className={styles.anchor} href={source} target="_blank" rel="noopener noreferrer">
                <span style={{ display: "none" }}>{title}</span>
            </a>
        </article>
    );
}
