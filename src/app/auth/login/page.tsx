"use client";

import { useAlertBar } from "@/components/AlertBar/AlertBar";
import { Button } from "@/components/Button/Button";
import { FormikForm } from "@/components/FormikForm/FormikForm";
import TextField from "@/components/TextField/TextField";
import FormPageLayout from "@/layouts/FormPageLayout";
import { LoginArgs } from "@/pages/api/auth";
import api from "@/services/sdk";
import { sleep } from "@/utils/sleep.utils";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "react-query";

export default function Login() {
  const [initValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertBar, AlertBar] = useAlertBar();
  const router = useRouter();

  const handleSubmit = async (values: typeof initValues) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (!response.ok && response?.status === 401) {
        return alertBar.error(
          "Invalid username or password, please try again!"
        );
      }

      if (response.ok) {
        alertBar.success("Congratulation! Login successfully!");
        sleep(1000).then(() => {
          router.push("/", {
            forceOptimisticNavigation: true,
          });
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
            <Button loading={loading} type="submit" className="w-full !mt-7">
              Login
            </Button>
          </>
        )}
      </FormikForm>
    </FormPageLayout>
  );
}
