import { useForm } from "react-hook-form";

import { Input, Button } from "../ui";

import useLogin from "../../hooks/useLogin";

import { LoginFormData } from "../../app/types";

import { patterns } from "../../constants";

const LoginForm = () => {
  const { fetchLogin, isLoading } = useLogin();

  const { control, handleSubmit, reset } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    fetchLogin(data);
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="authForm">
        <Input
          name="email"
          placeholder="Email*"
          control={control}
          type="email"
          pattern={patterns.email.regex}
          patternErrorMessage={patterns.email.errorMessage}
        />
        <Input
          name="password"
          placeholder="Password*"
          control={control}
          type="password"
          pattern={patterns.password.regex}
          patternErrorMessage={patterns.password.errorMessage}
        />
        <Button text="Sign In" type="submit" isLoading={isLoading} />
      </form>
    </>
  );
};
export default LoginForm;
