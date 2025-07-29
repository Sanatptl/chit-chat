function Button({ children, className, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border px-10 py-2 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
Button.displayName = "Button";

export default Button;
