import { useState } from "react";
import useZustandStore from "../hook/useZustandStore.js";
import LabeledIconInput from "../components/ui/LabeledIconInput";
import AuthFormWrapper from "../components/ui/AuthFormWrapper";
import { User, AtSign, LockKeyhole, Eye, EyeOff } from "lucide-react";
import PasswordToggelBtn from "../components/ui/PasswordToggleBtn";
import AuthImagePattern from "../components/ui/AuthImagePattern";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Fullname is required!");
    if (!formData.email.trim()) return toast.error("Email is required!");
    if (!formData.password.trim()) return toast.error("Password is required!");
    if (formData.password.length < 6)
      return toast.error("Password must be atleast 6 cahracters");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Invalid email");

    return true;
  };

  const { signup, isSigningUp } = useZustandStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };

  const onPasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* left side */}
      <AuthFormWrapper
        title="Create Account"
        onSubmit={onSubmit}
        isLoading={isSigningUp}
        submitButtonTxt="Sign Up"
        footerTxt="Already have an account?"
        footerLink={{ href: "/login", label: "Login" }}
      >
        <LabeledIconInput
          label="Fullname"
          leftElement={<User size={16} strokeWidth={1.75} />}
          inputProps={{
            type: "text",
            name: "name",
            id: "name",
            value: formData.name,
            onChange: handleChange,
            minlenght: "3",
            required: true,
            placeholder: "John Cena",
          }}
        />

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
          leftElement={<LockKeyhole size={16} strokeWidth={1.75} />}
          inputProps={{
            type: showPassword ? "text" : "password",
            name: "password",
            id: "password",
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
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignupPage;
