import Button from "../button/Button.jsx";
import styles from "./Toolbar.module.css";

function Toolbar({ editor }) {
    return (
        <div className={styles.toolbar}>
            <Button
                variant="small"
                className={editor.isActive("bold") ? styles.activeTab : ""}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                Bold
            </Button>

            <Button
                variant="small"
                className={editor.isActive("italic") ? styles.activeTab : ""}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                Italic
            </Button>

            <Button
                variant="small"
                className={editor.isActive("underline") ? styles.activeTab : ""}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                Underline
            </Button>
        </div>
    );
}

export default Toolbar;