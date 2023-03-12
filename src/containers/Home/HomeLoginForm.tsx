"use client";

import { FormikForm } from "@/components/FormikForm/FormikForm";
import TextField from "@/components/TextField/TextField";

interface IHomeLoginProps {}

const HomeLoginForm: React.FC<IHomeLoginProps> = (props) => {
  return (
    <div>
      <FormikForm
        initValues={{ username: "", password: "" }}
        onSubmit={() => {}}
        className="max-w-xl"
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
          </>
        )}
      </FormikForm>
    </div>
  );
};

export default HomeLoginForm;
