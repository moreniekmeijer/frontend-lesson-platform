import styles from "./Button.module.css";

function Button({ variant = "primary", className, onClick, children }) {
    const buttonClass = `${styles.button} ${variant === "secondary" ? styles.secondary : ""} ${className || ""}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
