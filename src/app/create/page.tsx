"use client";

import { Button } from "@/components/Button/Button";
import { FormikForm } from "@/components/FormikForm/FormikForm";
import TextField from "@/components/TextField/TextField";
import { atLeastOneNumberAndSpecialCharacterRegex } from "@/constants/regexes";
import FormPageLayout from "@/layouts/FormPageLayout";
import { useState } from "react";

export default function Create() {
  const [initValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (values: typeof initValues) => {
    console.log({ values });
  };

  return (
    <FormPageLayout title="Create user" description="Create a new user account">
      <FormikForm
        initValues={initValues}
        onSubmit={handleSubmit}
        className="mt-5"
        yupSchema={(yup) => ({
          name: yup
            .string()
            .required("Name is required")
            .min(2, "Min length of name is 2 characters")
            .max(1000, "Max length is 1000 characters"),
          email: yup
            .string()
            .required("Email is required")
            .email("Email is not valid!"),
          phone: yup.string().required("Phone number is required"),
          password: yup
            .string()
            .required("Password is required")
            .min(8, "Min length of password is 8 characters")
            .matches(
              atLeastOneNumberAndSpecialCharacterRegex,
              "Password must contain at least 1 number and 1 special character"
            ),
        })}
      >
        {({ fieldProps }) => (
          <>
            <TextField
              {...fieldProps.name}
              label="Name"
              placeholder="John Wick"
            />
            <TextField
              {...fieldProps.phone}
              label="Phone number"
              placeholder="0123456789"
            />
            <TextField
              {...fieldProps.email}
              label="Email"
              placeholder="example@gmail.com"
            />
            <TextField
              {...fieldProps.password}
              label="Password"
              placeholder="••••••"
              type="password"
            />
            <Button type="submit" className="w-full !mt-5">
              Create User
            </Button>
          </>
        )}
      </FormikForm>
    </FormPageLayout>
  );
}
