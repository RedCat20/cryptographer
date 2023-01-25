import { FC, useState } from 'react';
import styles from './App.module.scss';
import DataBlock from "./DataBlock/DataBlock";
import ResultBlock from "./ResultBlock/ResultBlock";
import TabsPanel from "./TabsPanel/TabsPanel";

const App:FC = () => {

    const [codedText,setCodedText] = useState('');
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div className={styles.appWrapper}>

            <div className={styles.cryptoWrapper}>

                <TabsPanel activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className={styles.cryptographer}>

                    <DataBlock activeTab={activeTab} codedText={codedText} setCodedText={setCodedText}/>

                    <ResultBlock codedText={codedText} />

                </div>
            </div>


        </div>
    );
};

export default App;