import { FaNewspaper, FaCalendarDays } from "react-icons/fa6";

import { SkeletonH2, SkeletonParagraph, SkeletonTag } from "../skeleton/Skeleton";

import styles from "./ArticleCard.module.css";

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = date.toLocaleString("hu-HU", { month: "long" });
    const day = date.getDate();

    return `${year} ${month} ${day}.`;
}

export function ArticleCard({ title, description, newspaper, source, tags, timestamp, showSkeleton = false, ...props }) {
    return (
        <article className={styles.articleCard} {...props}>
            {showSkeleton && <SkeletonH2 />}

            {!showSkeleton && (
                <h2 className={styles.heading}>
                    <a href={source} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h2>
            )}

            {newspaper && source && (
                <div className={styles.source}>
                    {showSkeleton && <SkeletonTag style={{ width: "100px" }} />}

                    {!showSkeleton && (
                        <>
                            <span className={styles.meta}>
                                <FaNewspaper /> {newspaper}
                            </span>
                            <time className={styles.meta} datetime={new Date(timestamp).toISOString()}>
                                <FaCalendarDays /> {formatTimestamp(timestamp)}
                            </time>
                        </>
                    )}
                </div>
            )}

            {showSkeleton && description && <SkeletonParagraph />}

            {!showSkeleton && description && <p className={styles.description}>{description}</p>}

            {tags && tags.length > 0 && (
                <ul className={`resetList ${styles.tags}`}>
                    {showSkeleton && (
                        <>
                            <SkeletonTag style={{ flex: "0 0 80px", maxWidth: "80px" }} />
                            <SkeletonTag style={{ flex: "0 0 110px", maxWidth: "110px" }} />
                            <SkeletonTag style={{ flex: "0 0 60px", maxWidth: "60px" }} />
                            <SkeletonTag style={{ flex: "0 0 120px", maxWidth: "120px" }} />
                        </>
                    )}

                    {!showSkeleton &&
                        tags.map((tag, i) => (
                            <li key={`${tag.name}-${i}`}>
                                <a href={tag.url} className={styles.tag} target="_blank" rel="noopener noreferrer">
                                    {tag.name}
                                </a>
                            </li>
                        ))}
                </ul>
            )}
            {!showSkeleton && (
                <a aria-hidden className={styles.anchor} href={source} target="_blank" rel="noopener noreferrer">
                    <span style={{ display: "none" }}>{title}</span>
                </a>
            )}
        </article>
    );
}
