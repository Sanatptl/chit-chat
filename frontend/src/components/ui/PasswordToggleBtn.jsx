import { Eye, EyeOff } from "lucide-react";

const PasswordToggelBtn = ({ onToggle, showPassword }) => {
  return (
    <button type="button" onClick={onToggle}>
      {showPassword ? (
        <Eye size={16} strokeWidth={1.17} />
      ) : (
        <EyeOff size={16} strokeWidth={1.17} />
      )}
    </button>
  );
};

export default PasswordToggelBtn;
