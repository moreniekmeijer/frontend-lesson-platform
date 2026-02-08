import Button from "../button/Button.jsx";
import styles from "./Toolbar.module.css";
import {useEffect, useState} from "react";

function Toolbar({ editor }) {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        if (!editor) return;

        const updateHandler = () => {
            forceUpdate(prev => prev + 1);
        };

        editor.on("selectionUpdate", updateHandler);
        editor.on("transaction", updateHandler);

        return () => {
            editor.off("selectionUpdate", updateHandler);
            editor.off("transaction", updateHandler);
        };
    }, [editor]);

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