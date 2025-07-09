import React from "react";
import Label from "./Label";
import Input from "./Input";

function LabeledIconInput({
  label,
  leftElement,
  rightElement,
  validatorElement,
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
      <div className="relative validator">
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
          className={`input validator ${leftElement && "pl-10"} ${
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
      {validatorElement && (
        <div className="validator-hint hidden">{validatorElement}</div>
      )}
    </div>
  );
}

LabeledIconInput.displayName = "LabeledIconInput";

export default React.memo(LabeledIconInput);
