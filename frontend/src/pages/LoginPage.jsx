import { useState } from "react";
import useZustandStore from "../hook/useZustandStore";
import LabeledIconInput from "../components/ui/LabeledIconInput";
import AuthFormWrapper from "../components/ui/AuthFormWrapper";
import { AtSign, LockKeyhole } from "lucide-react";
import PasswordToggelBtn from "../components/ui/PasswordToggleBtn";
import AuthImagePattern from "../components/ui/AuthImagePattern";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useZustandStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onPasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <AuthFormWrapper
        title="Login"
        onSubmit={onSubmit}
        isLoading={isLoggingIn}
        submitButtonTxt="Login"
        footerTxt="Create Account"
        footerLink={{ href: "/signup", label: "Signup" }}
      >
        <LabeledIconInput
          label="Email"
          leftElement={<AtSign size={15} strokeWidth={1.75} />}
          inputProps={{
            type: "email",
            name: "email",
            id: "email",
            value: formData.email,
            onChange: handleChange,
            required: true,
            placeholder: "johncena@example.com",
          }}
        />

        <LabeledIconInput
          label="Password"
          leftElement={<LockKeyhole size={15} strokeWidth={1.75} />}
          inputProps={{
            type: showPassword ? "text" : "password",
            id: "password",
            name: "password",
            value: formData.password,
            onChange: handleChange,
            required: true,
            placeholder: "********",
          }}
          rightElement={
            <PasswordToggelBtn
              onToggle={onPasswordToggle}
              showPassword={showPassword}
            />
          }
        />
      </AuthFormWrapper>
      {/* right side */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default LoginPage;
