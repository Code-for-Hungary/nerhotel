import { useRef, use } from "react";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

import styles from "./PersonProfile.module.css";
import TextCropper from "../ui/TextCropper";
import { SmartLink } from "../SmartLink";

import { getCachedPersonProfile } from "../../utils/person/get-person-profile";
import { SkeletonParagraph } from "../ui/skeleton/Skeleton";

function PersonProfile({ id }) {
    const imageContainerRef = useRef(null);

    const { profileImage, text, name } = use(getCachedPersonProfile(id));

    return (
        <article className={styles.PersonProfile}>
            {profileImage ? (
                <figure className={styles["PersonProfile-figure"]} ref={imageContainerRef}>
                    <img
                        className={styles["PersonProfile-image"]}
                        src={profileImage}
                        alt={name}
                        loading="lazy"
                        onError={(e) => {
                            console.error(e);
                            imageContainerRef.current.style.display = "none";
                        }}
                    />
                </figure>
            ) : null}
            <div className={styles["PersonProfile-body"]}>
                <TextCropper openTextLabel="Tovább..." closeTextLabel="Bezár">
                    <ReactMarkdown
                        components={{
                            a: ({ _node, href, ...props }) => <SmartLink to={href} {...props} />,
                        }}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {text}
                    </ReactMarkdown>
                </TextCropper>
            </div>
        </article>
    );
}

export function PersonProfileSkeleton() {
    return (
        <article className={styles.PersonProfile}>
            <figure className={styles["PersonProfile-figure"]}>
                <div className={styles["PersonProfile-image"]} />
            </figure>

            <div className={styles["PersonProfile-body"]}>
                <SkeletonParagraph />
            </div>
        </article>
    );
}

export default PersonProfile;
