import { useState } from "react";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { useLoaderData } from "react-router";

import Layout from "./Layout";
import { SmartLink } from "../components/SmartLink";
import { Wrapper } from "../components/ui/wrapper/Wrapper";
import { Content } from "../components/ui/content/Content";
import { VStack } from "../components/ui/v-stack/VStack";
import { ArticleCard } from "../components/ui/article-card/ArticleCard";
import Button from "../components/ui/Button";
import buttonStyles from "../components/ui/Button.module.css";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ButtonRow } from "../components/press-releases/components/button-row/ButtonRow";
import { PAGE_SIZE, fetchPressReleases } from "../components/press-releases/api";
import { html as intro } from "../components/press-releases/content/intro.md";
import { OnePercentDonationBanner } from "../components/one-percent-donation-banner";

import { useBannerContext } from "../context/banner-provider";

const ERROR_MESSAGE = "Hiba történt az adatok betöltése közben, kérlek próbáld újratölteni az oldalt!";

export async function clientLoader() {
    return await fetchPressReleases(0);
}

const PressReleasesPage = () => {
    const { isVisible, onDismiss } = useBannerContext();

    const initialData = useLoaderData();

    const [results, setResults] = useState(initialData.results);
    const [total] = useState(initialData.total);
    const [nextPageLoading, setNextPageLoading] = useState(false);

    const loadMoreHandler = async () => {
        setNextPageLoading(true);
        try {
            const offset = results.length;
            const data = await fetchPressReleases(offset);
            setResults((prev) => [...prev, ...data.results]);
        } catch (error) {
            console.error(error);
            alert(ERROR_MESSAGE);
        } finally {
            setNextPageLoading(false);
        }
    };

    return (
        <Layout>
            <Wrapper narrow>
                {isVisible && <OnePercentDonationBanner isInline onDismiss={onDismiss} />}
                <Content style={{ paddingBottom: "1rem" }}>
                    <h1>#NERHotel</h1>

                    <ReactMarkdown
                        components={{
                            a: ({ _node, href, ...props }) => <SmartLink to={href} {...props} />,
                        }}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {intro}
                    </ReactMarkdown>
                </Content>
                <VStack>
                    {results.map((result) => (
                        <ArticleCard
                            key={result.id}
                            title={result.title}
                            description={result.description}
                            source={result.source}
                            newspaper={result.newspaper}
                            timestamp={result.timestamp}
                        />
                    ))}
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
        </Layout>
    );
};

export default PressReleasesPage;
