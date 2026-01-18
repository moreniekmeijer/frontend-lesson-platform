import {useState, useRef, forwardRef, useImperativeHandle} from "react";
import styles from "./DragDrop.module.css";

const DragDrop = forwardRef(({ onFileSelect }, ref) => {
    const [dragging, setDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const isValidFile = (file) => {
        const validExtensions = [".pdf", ".mp4", ".mov", ".mp3", ".jpg", ".jpeg", ".png"];
        const ext = "." + file.name.split(".").pop().toLowerCase();
        return validExtensions.includes(ext);
    };

    const handleFile = (file) => {
        if (!isValidFile(file)) {
            alert("Unsupported file type");
            return;
        }
        setSelectedFile(file);
        onFileSelect?.(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    useImperativeHandle(ref, () => ({
        getFile: () => selectedFile,
        reset: () => {
            setSelectedFile(null);
            onFileSelect?.(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        }
    }));

    return (
        <div
            className={`${styles.dragDropContainer} ${dragging ? styles.dragging : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
        >
            <input
                type="file"
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
            />
            <span>➕</span>
            <p>{selectedFile ? selectedFile.name : "Klik of sleep hier een bestand heen"}</p>
        </div>
    );
});

export default DragDrop;
