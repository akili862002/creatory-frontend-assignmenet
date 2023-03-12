"use client";

import { PropsWithChildren } from "react";
import { FieldMetaProps, useField } from "formik";
import { cn } from "../../utils/classnames.utils";
import React from "react";

export interface IFormControlProps {
  name?: string;
  label?: string | null;
  className?: string;
  labelClassName?: string;
  required?: boolean | undefined;
  disabled?: boolean;
}

const FormControl = ({
  name = "",
  label,
  labelClassName = "",
  className = "",
  required,
  disabled = false,
  children,
}: PropsWithChildren<IFormControlProps>) => {
  let meta: Partial<FieldMetaProps<any>> = { touched: false, error: undefined };
  let _;

  if (name) {
    [_, meta] = useField(name);
  }

  const isError: boolean = !!meta.touched && !!meta.error;

  return (
    <div
      className={cn(
        "font-medium relative block w-full",
        isError ? "text-red-500" : "text-gray-900",
        disabled && "pointer-events-none opacity-50 select-none",
        className
      )}
      data-required={required}
      data-label={label}
      data-name={name}
      data-disable={disabled}
    >
      {label && (
        <label
          className={"text-sm block font-medium mb-[2px]" + labelClassName}
        >
          {label}
        </label>
      )}
      {children}
      {isError && typeof meta.error === "string" && (
        <FormControl.Error errorMessage={meta.error} />
      )}
    </div>
  );
};

FormControl.Error = ({ errorMessage }: { errorMessage: string }) =>
  errorMessage ? <p className="text-xs pl-0.5">{errorMessage}</p> : null;

export default FormControl;

export const getBaseFieldClassName = (args: {
  isError?: boolean;
  active?: boolean;
}) => {
  return cn(
    "w-full px-2 border rounded-lg h-8 placeholder:font-medium text-sm truncate",
    args.isError ? " bg-red-50" : " bg-gray-50",
    args.isError
      ? "placeholder-red-500 [&>.placeholder]:text-red-500"
      : " placeholder:text-gray-400  [&>.placeholder]:text-gray-500",
    " focus:ring-blue-700 focus:outline-none focus:border-blue-700 focus:ring-1",
    args.active && "ring-blue-500 ring-1 border-blue-500",
    !!args.isError && "border-red-500"
  );
};
