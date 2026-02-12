import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "../toolbar/Toolbar.jsx";
import styles from "./ArrangementEditor.module.css";


function ArrangementEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: true,
                orderedList: true,
            }),

            Placeholder.configure({
                placeholder: "Typ hier het arrangement..."
            }),
        ],
        content,

        editorProps: {
            handleKeyDown(view, event) {
                if (event.key === "Tab") {
                    event.preventDefault();

                    const { state, dispatch } = view;
                    dispatch(state.tr.insertText("    "));

                    return true;
                }
                return false;
            }
        },

        onUpdate: ({ editor }) => {
            const html = editor.getHTML();

            const preservedHtml = html.replace(/ {2,}/g, spaces =>
                '&nbsp;'.repeat(spaces.length)
            );

            onChange(preservedHtml);
        }
    });

    if (!editor) return null;

    return (
        <div>
            <Toolbar editor={editor}/>
            <EditorContent className={styles.contentContainer} editor={editor}/>
        </div>
    );
}

export default ArrangementEditor;