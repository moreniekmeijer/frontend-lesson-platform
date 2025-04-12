import styles from "./Button.module.css";

function Button({ variant = "primary", className, onClick, children }) {
    let variantClass;

    if (variant === "secondary") {
        variantClass = styles.secondary;
    } else if (variant === "danger") {
        variantClass = styles.danger;
    }

    const buttonClass = `${styles.button} ${variantClass} ${className || ""}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
