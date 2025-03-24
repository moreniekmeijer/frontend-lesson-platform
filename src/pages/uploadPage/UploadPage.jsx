import MaterialForm from "../../components/materialForm/materialForm.jsx";
import StyleForm from "../../components/styleForm/StyleForm.jsx";
import LessonForm from "../../components/LessonForm/LessonForm.jsx";
import {useState} from "react";
import "./UploadPage.css";

function UploadPage() {
    const [activeTab, setActiveTab] = useState('material');

    const getTabClass = (tabName) =>
        activeTab === tabName ? 'active-tab' : 'inactive-tab';

    return (
        <section className="upload-page">
            <h3>Wat wil je toevoegen?</h3>
            <div className="tabs">
                <button
                    className={getTabClass('material')}
                    onClick={() => setActiveTab('material')}
                >
                    Materiaal
                </button>
                <button
                    className={getTabClass('style')}
                    onClick={() => setActiveTab('style')}
                >
                    Stijl
                </button>
                <button
                    className={getTabClass('lesson')}
                    onClick={() => setActiveTab('lesson')}
                >
                    Les
                </button>
            </div>
            {activeTab === 'material' && <MaterialForm/>}
            {activeTab === 'style' && <StyleForm/>}
            {activeTab === 'lesson' && <LessonForm setActiveTab={setActiveTab}/>}
        </section>
    );
}

export default UploadPage;