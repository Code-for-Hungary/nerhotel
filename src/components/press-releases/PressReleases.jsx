import { Wrapper } from "../ui/wrapper/Wrapper";
import { Content } from "../ui/content/Content";
import { VStack } from "../ui/v-stack/VStack";
import { ArticleCard } from "../ui/article-card/ArticleCard";
import Button from "../ui/Button";
import buttonStyles from "../ui/Button.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";

import { InitialLoadingSkeleton } from "./components/InitialLoadingSkeleton";
import { ButtonRow } from "./components/button-row/ButtonRow";
import { PAGE_SIZE } from "./api";
import { usePressReleases } from "./hooks/use-press-releases";

// This screen is only available in Hungarian, if we choose to translate it, we should add this message to Tolgee
const ERROR_MESSAGE = "Hiba történt az adatok betöltése közben, kérlek próbáld újratölteni az oldalt!";

export const PressReleases = () => {
    const { initialItemsLoading, results, total, loadMoreHandler, nextPageLoading } = usePressReleases(ERROR_MESSAGE, PAGE_SIZE);

    return (
        <Wrapper narrow>
            <Content>
                <h1>#NERHotel</h1>
            </Content>
            <VStack>
                {initialItemsLoading && <InitialLoadingSkeleton />}
                {!initialItemsLoading && results.length > 0 && (
                    <>
                        {results.map((result) => (
                            <ArticleCard
                                key={result.id}
                                title={result.title}
                                description={result.description}
                                source={result.source}
                                newspaper={result.newspaper}
                                url={result.url}
                            />
                        ))}
                    </>
                )}
            </VStack>

            {total > PAGE_SIZE && results.length < total && (
                <ButtonRow>
                    <Button onClick={loadMoreHandler} disabled={nextPageLoading} loading={nextPageLoading}>
                        Mutass még cikkeket!
                        <LoadingSpinner color="#fff" size="32px" className={buttonStyles.buttonLoader} />
                    </Button>
                </ButtonRow>
            )}
        </Wrapper>
    );
};
