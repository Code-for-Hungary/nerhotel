import React from 'react';
import styles from '../css/content-page.module.css';
import Button from '../components/Button';
import image from '../assets/nh-main.svg';
import { useTranslation } from 'react-i18next';
import buttonStyles from '../css/button.module.css';

function ErrorScreen(props) {
    const { t } = useTranslation();

    return (
        <div className={styles.contentPage}>
            <h1>{t('error:heading')}</h1>
            <p>{t('error:text')}</p>
            <p style={{textAlign: 'center'}}>
                {
                    !props.standAlone ? (
                        <Button to="/">
                            {t('error:buttonText')}
                        </Button>
                    ) : (
                        <a href="/" className={buttonStyles.button}>
                            {t('error:buttonText')}
                        </a>
                    )
                }
                
            </p>
            
            <div style={{margin: '0 auto', maxWidth: '480px'}}>
                <img
                    src={image}
                    alt=""
                    style={{display: 'block', margin: '0 auto'}}
                />
            </div>
        </div>
    );
}

export default ErrorScreen;