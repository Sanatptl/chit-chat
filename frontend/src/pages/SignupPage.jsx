import { useState } from "react";
import { Link } from "react-router";
import {
  CircleUser,
  AtSign,
  LockKeyhole,
  User,
  EyeOff,
  Eye,
  Loader,
} from "lucide-react";
import useZustandStore from "../hook/useZustandStore";
import Button from "../components/ui/Button";
import LabeledIconInput from "../components/ui/LabeledIconInput";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  const { signup, isSigningUp } = useZustandStore();
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2">
      {/* left side */}
      <div className="flex items-center justify-center flex-col min-h-screen bg-gray-800">
        <div className="flex items-center flex-col w-full  space-y-4 max-w-md  p-6 sm:p-8 shadow-2xl md:p-10 overflow-hidden">
          <CircleUser strokeWidth={1.5} size={48} className="text-primary" />
          <h1 className="text-2xl font-semibold text-primary">
            Create Account
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full space-y-8"
          >
            <LabeledIconInput
              label="Name"
              leftElement={<User size={16} strokeWidth={1.75} />}
              inputProps={{
                type: "text",
                id: "name",
                name: "name",
                value: formData.name,
                onChange: handleChange,
                placeholder: "John Cena",
                pattern: "[A-Za-z][A-Za-z0-9-]*",
                minlength: "3",
                required: true,
              }}
            />

            <LabeledIconInput
              label="Email"
              leftElement={<AtSign size={16} strokeWidth={1.75} />}
              validatorElement={<p>Enter valid email address</p>}
              inputProps={{
                value: formData.email,
                type: "email",
                id: "email",
                name: "email",
                onChange: handleChange,
                placeholder: "johncena@example.com",
                required: true,
              }}
            />

            <LabeledIconInput
              label="Password"
              leftElement={<LockKeyhole size={16} strokeWidth={1.75} />}
              validatorElement={
                <p>
                  Must be more than 7 characters, including
                  <br />
                  At least one number
                  <br />
                  At least one lowercase letter
                  <br />
                  At least one uppercase letter
                </p>
              }
              rightElement={
                <button
                  className=""
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff size={16} strokeWidth={1.75} />
                  ) : (
                    <Eye size={16} strokeWidth={1.75} />
                  )}
                </button>
              }
              inputProps={{
                type: showPassword ? "text" : "password",
                value: formData.password,
                onChange: handleChange,
                name: "password",
                id: "password",
                placeholder: "*******",
                minlength: "7",
                pattern:
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*_=+-]).{8,}$",
                title:
                  "Must be more than 7 characters, including number, lowercase letter, uppercase letter",
              }}
            />

            {/* <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Name</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <User size={16} strokeWidth={1.75} />
              </span>
              <Input
                type="text"
                className={`pl-10`}
                placeholder="enter your name here"
              />
            </div>
          </div> */}
            {/* <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Email</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <AtSign size={16} strokeWidth={1.75} />
              </span>
              <Input
                type="email"
                className="pl-10"
                placeholder="yourname@example.com"
              />
            </div>
          </div> */}
            {/* <div className="grid w-full max-w-sm items-center gap-3">
            <Label>Password</Label>
            <div className="relative">
              <span className="absolute flex items-center inset-y-0 left-0 pl-3 text-gray-400 pointer-events-none">
                <LockKeyhole size={16} strokeWidth={1.75} />
              </span>
              <Input type="password" className="pl-10" placeholder="****" />
            </div>
          </div> */}

            <Button
              className={"btn btn-primary hover:bg-primary/80 w-full"}
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <Loader
                  size={16}
                  strokeWidth={0.75}
                  className="animate-spin-pulse"
                ></Loader>
              ) : (
                "Create Account"
              )}
            </Button>
            {/* <div className="flex items-center justify-between w-full  bg-amber-300 flex-col sm:flex-row gap-3">
              <Button
                className={
                  "relative overflow-hidden group w-[50%] sm:w-38 border border-red-400 text-red-400 px-6 py-2 rounded-md transition-all duration-300"
                }
              >
                <span className="absolute inset-0 bg-red-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Cancel
                </span>
              </Button>
            </div> */}
          </form>
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <span>
              <Link to={"/login"} className="underline text-primary">
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
