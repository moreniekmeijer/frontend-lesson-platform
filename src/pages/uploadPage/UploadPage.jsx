import MaterialForm from "../../components/materialForm/materialForm.jsx";
import StyleForm from "../../components/styleForm/StyleForm.jsx";
import LessonForm from "../../components/LessonForm/LessonForm.jsx";

function UploadPage() {
    return (
        <section className="upload-page">
            <MaterialForm/>
            <StyleForm/>
            <LessonForm/>
        </section>
    )
}

export default UploadPage;