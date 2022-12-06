import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown'
import Layout from './Layout';
import styles from '../css/about.module.css';
import rehypeRaw from 'rehype-raw';

const AboutView = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageContent, setPageContent] = useState('');
  const { i18n } = useTranslation();
  const { resolvedLanguage } = i18n;

  const getContent = async (fileName, lang) => {
    const mdFilePath = await import(`../content/${lang}/${fileName}.md`);
    const mdFileResponse = await fetch(mdFilePath.default);
    const mdFileContent = await mdFileResponse.text();

    return mdFileContent;
  }

  useEffect(() => {
    try {
      setIsLoading(true);
      
      getContent('about', resolvedLanguage).then(data => setPageContent(data));
    } catch(e) {
      console.error(e);
      // TODO: Do some error handling...
    } finally {
      setIsLoading(false);
    }
  }, [resolvedLanguage]);

  return (
    <Layout history={props.history}>
      <div className={styles.about}>
        {isLoading ? <span>Loading...</span> : <ReactMarkdown children={pageContent} rehypePlugins={[rehypeRaw]} />}
      </div>
    </Layout>
  );
};

export default AboutView;
