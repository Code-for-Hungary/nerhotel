import { useTranslation } from "react-i18next";

import Button from "./ui/Button";
import { Wrapper } from "./ui/wrapper/Wrapper";
import { Content } from "./ui/content/Content";
import image from "../assets/nh-main.svg";

function ErrorScreen(props) {
    const { t } = useTranslation();

    return (
        <Wrapper>
            <Content>
                <h1>{t("error.heading")}</h1>
                <p>{t("error.text")}</p>
                <p style={{ textAlign: "center" }}>
                    {!props.standAlone ? (
                        <Button to="/">{t("error.buttonText")}</Button>
                    ) : (
                        <Button href="/" isPlainAnchor>
                            {t("error.buttonText")}
                        </Button>
                    )}
                </p>

                <div style={{ margin: "0 auto", maxWidth: "480px" }}>
                    <img src={image} alt="" style={{ display: "block", margin: "0 auto" }} />
                </div>
            </Content>
        </Wrapper>
    );
}

export default ErrorScreen;
