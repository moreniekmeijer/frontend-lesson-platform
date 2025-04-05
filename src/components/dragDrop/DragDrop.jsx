import React, { useState, useRef } from "react";
import styles from "./DragDrop.module.css";

const DragDrop = ({ onFileSelect }) => {
    const [dragging, setDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (isValidFile(file)) {
                setSelectedFile(file);
                onFileSelect(file);
            } else {
                alert("Unsupported file type");
            }
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            if (isValidFile(file)) {
                setSelectedFile(file);
                onFileSelect(file);
            } else {
                alert("Unsupported file type");
            }
        }
    };

    const isValidFile = (file) => {
        const validExtensions = [".pdf", ".mp4"];
        const fileExtension = file.name.split(".").pop();
        return validExtensions.includes(`.${fileExtension}`);
    };


    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div
            className={`${styles.dragDropContainer} ${dragging ? styles.dragging : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <span>➕</span>
            <p>{selectedFile ? selectedFile.name : "Click or drop a file here"}</p>
        </div>
    );
};

export default DragDrop;
