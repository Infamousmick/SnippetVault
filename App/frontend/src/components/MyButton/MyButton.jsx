import "./MyButton.css";

const MyButton = ({ children, className, onClick, type }) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`my-btn d-flex align-items-center justify-content-center gap-2 ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default MyButton;
