import "./CustomAlert.css";

const CustomAlert = ({ text, type }) => {
  return (
    <div className={`auth-alert alert alert-${type} p-2 text-center`}>
      {text}
    </div>
  );
};
export default CustomAlert;
