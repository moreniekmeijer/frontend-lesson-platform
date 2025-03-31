import MaterialForm from "../../components/forms/materialForm/materialForm.jsx";
import StyleForm from "../../components/forms/styleForm/StyleForm.jsx";
import LessonForm from "../../components/forms/LessonForm/LessonForm.jsx";
import {useState} from "react";
import styles from "./UploadPage.module.css";
import Button from "../../components/button/Button.jsx";

function UploadPage() {
    const [activeTab, setActiveTab] = useState('material');

    const getTabClass = (tabName) =>
        activeTab === tabName ? styles.activeTab : "";

    return (
        <section className={styles.uploadPage}>
            <h3>Wat wil je toevoegen?</h3>
            <div className={styles.tabs}>
                <Button
                    className={getTabClass('material')}
                    onClick={() => setActiveTab('material')}
                >
                    Materiaal
                </Button>
                <Button
                    className={getTabClass('style')}
                    onClick={() => setActiveTab('style')}
                >
                    Stijl
                </Button>
                <Button
                    className={getTabClass('lesson')}
                    onClick={() => setActiveTab('lesson')}
                >
                    Les
                </Button>
            </div>
            {activeTab === 'material' && <MaterialForm/>}
            {activeTab === 'style' && <StyleForm/>}
            {activeTab === 'lesson' && <LessonForm setActiveTab={setActiveTab}/>}
        </section>
    );
}

export default UploadPage;