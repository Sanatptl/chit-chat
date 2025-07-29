import { CircleUser, Loader } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";

/**
 * AuthFormWrapper - A generic authentication form layout component.
 *
 * @param {string} title        - Main heading/title of the card (e.g., "Login" or "Sign Up").
 * @param {function} onSubmit   - Handler for form submission.
 * @param {ReactNode} children  - Form fields and custom content to display inside the form.
 * @param {boolean} isLoading   - Controls loading state for the submit button.
 * @param {string} submitButtonTxt  - Text to display on the primary submit button.
 * @param {string} footerTxt - Message displayed below the form (e.g., "No account yet?").
 * @param {Object} footerLink - Action link below the form (e.g., { href: "/signup", label: "Sign Up" }).
 */

const AuthFormWrapper = ({
  onSubmit,
  title,
  isLoading,
  submitButtonTxt,
  footerTxt,
  footerLink: { href, label },
  children,
}) => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-background">
      <div className="flex items-center flex-col w-full bg-background-card space-y-4 max-w-md  p-6 sm:p-8 shadow-2xl md:p-10 overflow-hidden box-border">
        <CircleUser strokeWidth={1.5} size={48} className="text-main" />
        <h1 className="text-2xl font-semibold text-main">{title}</h1>
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center w-full space-y-8"
        >
          {children}
          <Button
            className={`btn ${
              isLoading ? "bg-main/80" : "bg-main"
            } hover:bg-main/80 w-full text-foreground`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader
                size={16}
                strokeWidth={2.5}
                className="animate-spin-pulse text-foreground"
              ></Loader>
            ) : (
              submitButtonTxt
            )}
          </Button>
        </form>
        <p className="text-sm text-gray-400">
          {footerTxt}{" "}
          <span>
            <Link to={href} className="underline text-main hover:font-semibold">
              {label}
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthFormWrapper;
