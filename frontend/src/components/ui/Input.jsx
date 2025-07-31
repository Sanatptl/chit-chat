//before React 19, we used React.forwardRef to forward refs to DOM elements or class components. In React 18, you can still use it, but it's not always necessary for functional components that don't need to access refs directly.
// const Input = React.forwardRef(function ({ className, ...props }, ref) {
//   return <input className={`${className || " "}`} />;
// });

// React 19+ pattern, no forwardRef needed
const Input = ({ ref, className, ...props }) => {
  return (
    <input
      ref={ref}
      className={`flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
        className || ""
      }`}
      {...props}
    />
  );
};

Input.displayName = "Input"; //"Input" will appear in DevTools and error messages instead of "Anonymous'..When errors occur, React uses displayName in error messages, making it easier to identify which component is causing the issue. Without it, React may use a generic or less informative name, especially for components created using higher-order functions or anonymous functions

export default Input;
