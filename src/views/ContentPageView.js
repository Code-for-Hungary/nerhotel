import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import Layout from './Layout';
import styles from '../css/content-page.module.css';
import rehypeRaw from 'rehype-raw';
import { SmartLink } from '../components/SmartLink';

const ContentPageView = ({history, ...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageContent, setPageContent] = useState('');
  const { i18n } = useTranslation();
  const { resolvedLanguage } = i18n;
  const location = useLocation();
  const { search } = location;
  const pathNameAsArray = Array.from(location.pathname);
  pathNameAsArray.shift();
  const pathNameWithoutSlash = pathNameAsArray.join('');

  const getContent = async (fileName, lang) => {
    try {
      const mdFilePath = await import(`../content/${lang}/${fileName}.md`);
      const mdFileResponse = await fetch(mdFilePath.default);
      const mdFileContent = await mdFileResponse.text();
  
      return mdFileContent;
    } catch(e) {
      throw e;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    let isSubscribed = true;
    
    getContent(pathNameWithoutSlash, resolvedLanguage)
      .then(data => {
        if (isSubscribed) {
          setPageContent(data)
        }
      })
      .catch(e => {
        console.error(e);
        history.push(`/500${search}`);
      })
      .finally(() => {
        if (isSubscribed) {
          setIsLoading(false);
        }
      });

      return () => {
        isSubscribed = false;
      }
  }, [resolvedLanguage, pathNameWithoutSlash, history, search]);

  return (
    <Layout history={history}>
      <div className={styles.contentPage}>
        {isLoading ? 
          <span>Loading...</span>
            :
          <ReactMarkdown
            children={pageContent}
            components={{
              a: ({node, href, ...props}) => <SmartLink to={href} {...props} />
            }}
            rehypePlugins={[rehypeRaw]} 
          />
        }
      </div>
    </Layout>
  );
};

export default ContentPageView;