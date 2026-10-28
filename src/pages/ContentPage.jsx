import { useLoaderData } from "react-router";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

import Layout from "./Layout";
import { SmartLink } from "../components/SmartLink";
import { Wrapper } from "../components/ui/wrapper/Wrapper";
import { Content } from "../components/ui/content/Content";

import { OnePercentDonationBanner } from "../components/one-percent-donation-banner";
import { useBannerContext } from "../context/banner-provider";

export async function clientLoader({ params }) {
    const lang = params.lang || "hu";

    const pathSegments = new URL(location.href).pathname.split("/").filter(Boolean);
    const lastPathSegment = pathSegments.at(-1);

    try {
        const mdFilePath = await import(`../content/${lang}/${lastPathSegment}.md`);
        return { htmlContent: mdFilePath.html, pageKey: lastPathSegment };
    } catch (e) {
        console.error(e);
        // This will trigger React Router to render whatever is set for `errorElement` instead of `element`
        throw new Response("Content not found", { status: 404 });
    }
}

const ContentPage = () => {
    const { htmlContent, pageKey } = useLoaderData();
    const { t } = useTranslation();
    const { isVisible, onDismiss } = useBannerContext();

    return (
        <Layout>
            <Helmet>
                <title>
                    {t(`staticPageTitles.${pageKey}`)} - {t("general.siteName")}
                </title>
            </Helmet>
            <Wrapper>
                <Content>
                    {isVisible && <OnePercentDonationBanner onDismiss={onDismiss} isInline />}
                    <ReactMarkdown
                        components={{
                            a: ({ _node, href, ...props }) => <SmartLink to={href} {...props} />,
                        }}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {htmlContent}
                    </ReactMarkdown>
                </Content>
            </Wrapper>
        </Layout>
    );
};

export default ContentPage;
