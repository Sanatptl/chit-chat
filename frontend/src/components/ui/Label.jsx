function Label({ className, children, ref, ...props }) {
  return (
    <label
      ref={ref}
      {...props}
      className={`text-sm font-medium leading-none ${className || ""}`}
    >
      {children}
    </label>
  );
}

Label.displayName = "Label";

export default Label;
