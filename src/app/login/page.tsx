"use client";

import { useAlertBar } from "@/components/AlertBar/AlertBar";
import { Button } from "@/components/Button/Button";
import { FormikForm } from "@/components/FormikForm/FormikForm";
import TextField from "@/components/TextField/TextField";
import api from "@/services/sdk";
import { sleep } from "@/utils/sleep.utils";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [initValues, setInitValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [alertBar, AlertBar] = useAlertBar();
  const router = useRouter();

  const handleSubmit = async (values: typeof initValues) => {
    try {
      setLoading(true);
      const { data } = await api.login(values);

      if (data.auth) {
        alertBar.success("Login successful!");
        sleep(1000).then(() => {
          router.push("/");
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            alertBar.error("Invalid username or password, please try again!");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="mt-11">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-600">Please, Sign in to continue</p>
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
                  loading={loading}
                  type="submit"
                  className="w-full !mt-7"
                >
                  Login
                </Button>
              </>
            )}
          </FormikForm>
        </div>
      </div>
    </main>
  );
}
