import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

import Layout from "./Layout";
import { SmartLink } from "../components/SmartLink";
import { Wrapper } from "../components/ui/wrapper/Wrapper";
import { Content } from "../components/ui/content/Content";

const getContent = async (fileName, lang) => {
    try {
        const mdFilePath = await import(`../content/${lang}/${fileName}.md`);
        const mdFileContent = mdFilePath.html;

        return mdFileContent;
    } catch (e) {
        throw e;
    }
};

const ContentPageView = ({ history }) => {
    const [pageContent, setPageContent] = useState("");
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const location = useLocation();
    const { search } = location;
    const pathNameAsArray = Array.from(location.pathname);
    pathNameAsArray.shift();
    const pathNameWithoutSlash = pathNameAsArray.join("");

    useEffect(() => {
        let isSubscribed = true;

        getContent(pathNameWithoutSlash, resolvedLanguage)
            .then((data) => {
                if (isSubscribed) {
                    setPageContent(data);
                }
            })
            .catch((e) => {
                console.error(e);
                history.push(`/500${search}`);
            });

        return () => {
            isSubscribed = false;
        };
    }, [resolvedLanguage, pathNameWithoutSlash, history, search]);

    return (
        <Layout history={history}>
            <Helmet>
                <title>
                    {t(`staticPageTitles.${pathNameWithoutSlash}`)} - {t("general.siteName")}
                </title>
            </Helmet>
            <Wrapper>
                <Content>
                    <ReactMarkdown
                        children={pageContent}
                        components={{
                            a: ({ node, href, ...props }) => <SmartLink to={href} {...props} />,
                        }}
                        rehypePlugins={[rehypeRaw]}
                    />
                </Content>
            </Wrapper>
        </Layout>
    );
};

export default ContentPageView;
