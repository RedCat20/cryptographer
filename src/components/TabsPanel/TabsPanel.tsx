import { FC } from 'react';
import styles from "./TabsPanel.module.scss";

interface ITAb {
    id: number;
    name: string;
}

const TABS: ITAb[] = [
    { id: 1, name: 'Encode' },
    { id: 2, name: 'Decode' }
]

interface Props {
    activeTab: number;
    setActiveTab: (value: number) => void;
}

const TabsPanel:FC<Props> = ({activeTab, setActiveTab}) => {
    return (
        <div className={styles.tabsPanel}>

            {TABS.map((tab: ITAb) => {
                return (
                    <div key={tab.id}
                         className={`${styles.tab} ${tab.id === activeTab ? styles.tabActive : ''}`}
                         onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.name}
                    </div>
                )
            })}

        </div>
    );
};

export default TabsPanel;