import Label from "./Label";
import Input from "./Input";

/**
 * LabeledIconInput - A reusable input component with an optional label, left/right icons, and validator hint.
 *
 * @param {string} label - The text label rendered above the input.
 * @param {ReactNode} leftElement - An optional icon or element displayed inside the input on the left.
 * @param {ReactNode} rightElement - An optional icon or element displayed inside the input on the right.
 * @param {string} labelClass - Custom class name(s) for the label element.
 * @param {string} inputClass - Custom class name(s) for the input element.
 * @param {Object} labelProps - Additional props to spread onto the label element.
 * @param {Object} inputProps - Additional props to spread onto the input element (e.g., id, name, type, value, onChange, etc.).
 */

function LabeledIconInput({
  label,
  leftElement,
  rightElement,
  labelClass = "",
  inputClass = "",
  labelProps = {},
  inputProps = {},
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label
        htmlFor={inputProps.id}
        className={`${labelClass}`}
        {...labelProps}
      >
        {label}
      </Label>
      <div className="relative">
        {leftElement && (
          <span
            className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            aria-hidden="true"
          >
            {/* <span className="absolute flex items-center inset-y-0 left-0 pl-3 text-gray-400 pointer-events-none"> */}
            {leftElement}
          </span>
        )}
        <Input
          className={`input ${leftElement && "pl-10"} ${
            rightElement && "pr-10"
          } ${inputClass}`}
          {...inputProps}
        />
        {rightElement && (
          <span className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightElement}
          </span>
        )}
      </div>
    </div>
  );
}

LabeledIconInput.displayName = "LabeledIconInput";

export default LabeledIconInput;
