import { useRef } from "react";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

import styles from "./PersonProfile.module.css";
import TextCropper from "../ui/TextCropper";
import { SmartLink } from "../SmartLink";

function PersonProfile({ profileImage, text, name }) {
    const imageContainerRef = useRef(null);

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

export default PersonProfile;
