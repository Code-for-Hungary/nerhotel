import "./Skeleton.css";

export function SkeletonH2(props) {
    return (
        <div className="SkeletonLines SkeletonLinesH2" {...props}>
            <div className="Skeleton SkeletonText SkeletonTextH2" />
            <div className="Skeleton SkeletonText SkeletonTextH2" style={{ width: "33%" }} />
        </div>
    );
}

export function SkeletonParagraph(props) {
    return (
        <div className="SkeletonLines SkeletonLinesParagraph" {...props}>
            <div className="Skeleton SkeletonText SkeletonTextP" />
            <div className="Skeleton SkeletonText SkeletonTextP" />
            <div className="Skeleton SkeletonText SkeletonTextP" style={{ width: "50%" }} />
        </div>
    );
}

export function SkeletonTag(props) {
    return <div className="Skeleton SkeletonTag" {...props} />;
}
