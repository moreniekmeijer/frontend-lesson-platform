import MaterialForm from "../../components/forms/materialForm/MaterialForm.jsx";
import StyleForm from "../../components/forms/styleForm/StyleForm.jsx";
import LessonForm from "../../components/forms/LessonForm/LessonForm.jsx";
import styles from "./UploadPage.module.css";
import Button from "../../components/button/Button.jsx";
import {useNavigate, useParams} from "react-router-dom";

function UploadPage() {
    const { tab } = useParams();
    const navigate = useNavigate();

    const tabMap = {
        materiaal: "material",
        stijl: "style",
        les: "lesson",
    };

    const reverseTabMap = {
        material: "materiaal",
        style: "stijl",
        lesson: "les",
    };

    const activeTab = tabMap[tab] || "material";

    const getTabClass = (tabName) =>
        activeTab === tabName ? styles.activeTab : "";

    const handleTabChange = (newTab) => {
        navigate(`/toevoegen/${reverseTabMap[newTab]}`);
    };

    return (
        <section className="leftContainer" >
            <h2>Wat wil je toevoegen?</h2>
            <div className={styles.tabs}>
                <Button
                    variant="simple"
                    className={getTabClass("material")}
                    onClick={() => handleTabChange("material")}
                >
                    Materiaal
                </Button>
                <Button
                    variant="simple"
                    className={getTabClass("style")}
                    onClick={() => handleTabChange("style")}
                >
                    Stijl
                </Button>
                <Button
                    variant="simple"
                    className={getTabClass("lesson")}
                    onClick={() => handleTabChange("lesson")}
                >
                    Les
                </Button>
            </div>
            {activeTab === 'material' && <MaterialForm/>}
            {activeTab === 'style' && <StyleForm/>}
            {activeTab === 'lesson' && <LessonForm setActiveTab={handleTabChange}/>}
        </section>
    );
}

export default UploadPage;