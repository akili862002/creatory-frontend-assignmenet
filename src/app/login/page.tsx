"use client";

import { Button } from "@/components/Button/Button";
import { FormikForm } from "@/components/FormikForm/FormikForm";
import TextField from "@/components/TextField/TextField";

export default function Login() {
  return (
    <main>
      <div className="mt-11">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-sm">Login to continue</p>
          <FormikForm
            initValues={{ username: "", password: "" }}
            onSubmit={() => {}}
            className="mt-5"
            yupSchema={(yup) => ({
              username: yup.string().required("Username is required"),
              password: yup.string().required("Password is required"),
            })}
          >
            {({ fieldProps }) => (
              <>
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
                <Button type="submit" className="w-full !mt-7">
                  Submit
                </Button>
              </>
            )}
          </FormikForm>
        </div>
      </div>
    </main>
  );
}
