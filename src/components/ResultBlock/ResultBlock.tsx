import React, { FC, useState } from 'react';
import styles from "./ResultBlock.module.scss";
import copyImg from "../../assets/copy.svg";

interface Props {
    codedText: string;
}

const ResultBlock:FC<Props> = ({codedText}) => {

    const [isMessage, setIsMessage] = useState(false);

    const copyToClipboardHandler = () => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            setIsMessage(true);
            setTimeout(() => {
                setIsMessage(false);
            },2000);
            return navigator.clipboard.writeText(codedText);
        }
        return Promise.reject('The Clipboard API is not available.');
    }

    return (
        <div className={styles.resultBlock}>

            <div className={styles.block}>

                <h2>Result</h2>

                <p>
                    {codedText}
                </p>

            </div>

            <div className={styles.block}>

                <button onClick={copyToClipboardHandler} disabled={!codedText.length}>
                    <img src={copyImg} alt="Copy"/>

                    <span>Copy to clipboard</span>
                </button>

                {isMessage && <span className={styles.message}>Text is copied</span>}

            </div>
        </div>
    );
};

export default ResultBlock;