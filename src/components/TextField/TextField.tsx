"use client";

import { useField } from "formik";
import React from "react";
import { memo } from "react";
import BaseTextField, { IBaseTextFieldProps } from "./BaseTextField";

export interface ITextFieldProps
  extends Omit<IBaseTextFieldProps, "onChange" | "ref"> {
  name: string;
  required: boolean;
}

const TextFieldInner: React.FC<ITextFieldProps> = (props) => {
  const [field, meta] = useField(props.name);
  const isError = !!meta.touched && !!meta.error;

  return (
    <BaseTextField
      validate={() => (isError ? meta.error : "")}
      inputProps={field}
      {...props}
    />
  );
};

const TextField = memo(TextFieldInner);

export default TextField;
