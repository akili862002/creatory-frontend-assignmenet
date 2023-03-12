"use client";

import { useAlertBar } from "@/components/AlertBar/AlertBar";
import { Button } from "@/components/Button/Button";
import { FormikForm } from "@/components/FormikForm/FormikForm";
import TextField from "@/components/TextField/TextField";
import {
  atLeastOneNumberAndSpecialCharacterRegex,
  vietnamesePhoneNumberRegex,
} from "@/constants/regexes";
import FormPageLayout from "@/layouts/FormPageLayout";
import { CreateUserArgs } from "@/pages/api/create";
import api from "@/services/sdk";
import { useState } from "react";
import { useMutation } from "react-query";

export default function CreateUser() {
  const [initValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [alertBar, AlertBar] = useAlertBar();

  const mutation = useMutation(
    (values: CreateUserArgs) => {
      return api.createUser(values);
    },
    {
      onSuccess: (data) => {
        alertBar.success("Congratulation! Create a user successfully!");
      },
      onError: (error) => {},
    }
  );

  const handleSubmit = (values: typeof initValues) => {
    mutation.mutate(values);
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
          phone: yup
            .string()
            .required("Phone number is required")
            .matches(vietnamesePhoneNumberRegex, "Phone number is not valid!"),
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
            {AlertBar}
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
            <Button
              loading={mutation.isLoading}
              type="submit"
              className="w-full !mt-5"
            >
              Create User
            </Button>
          </>
        )}
      </FormikForm>
    </FormPageLayout>
  );
}
