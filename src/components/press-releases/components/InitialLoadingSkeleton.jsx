import { ArticleCard } from "../../ui/article-card/ArticleCard";

export function InitialLoadingSkeleton() {
    return (
        <>
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
            <ArticleCard showSkeleton title="a" description="b" source="c" newspaper="d" tags={["1"]} />
        </>
    );
}
