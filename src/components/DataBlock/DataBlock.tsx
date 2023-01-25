import { MouseEvent, ChangeEvent, useState, FC } from 'react';
import styles from "./DataBlock.module.scss";

interface Props {
    activeTab: number;
    codedText: string;
    setCodedText: (value: string) => void;
}

const DataBlock:FC<Props> = ({activeTab, codedText, setCodedText}) => {

    const [text, setText] = useState('');
    const [textError, setTextError] = useState('');

    const [offset, setOffset] = useState<number>(1);
    const [offsetError, setOffsetError] = useState('');

    const [repetitions, setRepetitions] = useState<number>(1);
    const [repetitionsError, setRepetitionsError] = useState('');

    const isValidForm = () => {
        return !textError && !offsetError && !repetitionsError;
    }

    const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let regExpr = /^[A-Z]+$/;
        let value = e.target.value;
        let isValid = regExpr.test(value);

        setText(value);

        if (value.length === 0 || value.length > 256) {
            setTextError('Not valid text length (1 - 256)');
        } else if (!isValid) {
            setTextError('Not valid text value (big latin words only)');
        } else {
            setTextError('');
        }
    }

    const onChangeOffsetHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        setOffset(value);

        if (value < 1 || value > 9) {
            setOffsetError('Not valid value (1 - 9)');
        } else {
            setOffsetError('');
        }
    }

    const onChangeRepetitionsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);
        setRepetitions(value);

        if (value < 1 || value > 5) {
            setRepetitionsError('Not valid value (1 - 5)');
        } else {
            setRepetitionsError('');
        }
    }

    const encodeButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {

        let newStr = '';

        for (let i = 0; i < text.length; i++) {
            let codedSymbol = text.charCodeAt(i);

            // Code
            if (activeTab === 1) {
                newStr += String.fromCharCode(codedSymbol + offset);
            }
            // Decode
            if (activeTab === 2) {
                newStr += String.fromCharCode(codedSymbol - offset);
            }
        }

        newStr = newStr.repeat(repetitions);

        const isValid = isValidForm();

        if (isValid) {
            setCodedText(newStr);
        } else {
            setCodedText('');
        }
    }

    return (
        <div className={styles.dataBlock}>

            <div className={styles.textAreaWrapper}>
                <textarea placeholder="Text" value={text} onChange={onChangeTextHandler} />

                <span className={styles.error}>
                    {textError}
                </span>
            </div>

            <div className={styles.fields}>

                <div className={styles.inputWrapper}>
                    <input placeholder="Shift" value={offset} onChange={onChangeOffsetHandler}/>
                    <span className={styles.error}>
                        {offsetError}
                    </span>
                </div>

                <div className={styles.inputWrapper}>
                    <input placeholder="Number of repeats" value={repetitions} onChange={onChangeRepetitionsHandler}/>

                    <span className={styles.error}>
                        {repetitionsError}
                    </span>
                </div>
            </div>

            <div className={styles.buttonWrapper}>

                <button onClick={encodeButtonHandler} disabled={!text.length || !isValidForm()}>
                    {activeTab === 1 && 'Encode this text'}
                    {activeTab === 2 && 'Decode this text'}
                </button>

            </div>

        </div>
    );
};

export default DataBlock;