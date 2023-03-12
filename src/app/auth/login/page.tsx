"use client";

import { useAlertBar } from "@/components/AlertBar/AlertBar";
import { Button } from "@/components/Button/Button";
import { FormikForm } from "@/components/FormikForm/FormikForm";
import TextField from "@/components/TextField/TextField";
import FormPageLayout from "@/layouts/FormPageLayout";
import { LoginArgs } from "@/pages/api/auth";
import api from "@/services/sdk";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";

export default function Login() {
  const [initValues] = useState({
    username: "",
    password: "",
  });
  const mutation = useMutation(
    (values: LoginArgs) => {
      return api.login(values);
    },
    {
      onSuccess: (data) => {
        alertBar.success("Congratulation! Login successfully!");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          if (status === 401) {
            alertBar.error("Invalid username or password, please try again!");
          }
        }
      },
    }
  );

  const [alertBar, AlertBar] = useAlertBar();
  const router = useRouter();

  const handleSubmit = async (values: typeof initValues) => {
    mutation.mutate(values);
  };

  return (
    <FormPageLayout title="Sign in" description="Sign in to your account">
      <FormikForm
        initValues={initValues}
        onSubmit={handleSubmit}
        className="mt-5"
        yupSchema={(yup) => ({
          username: yup.string().required("Username is required"),
          password: yup.string().required("Password is required"),
        })}
      >
        {({ fieldProps }) => (
          <>
            {AlertBar}
            <TextField
              {...fieldProps.username}
              label="Username"
              placeholder="username"
            />
            <TextField
              {...fieldProps.password}
              label="Password"
              placeholder="••••••"
              type="password"
            />
            <div className="flex flex-row justify-end">
              <a tabIndex={-1} href="#" className="text-sm">
                Forgot password?
              </a>
            </div>
            <Button
              loading={mutation.isLoading}
              type="submit"
              className="w-full !mt-7"
            >
              Login
            </Button>
          </>
        )}
      </FormikForm>
    </FormPageLayout>
  );
}
