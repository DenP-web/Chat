import { useForm } from "react-hook-form";

import { Input, Button } from "../ui";

import { useRegister } from "../../hooks";

import { RegistrationFormData } from "../../app/types";
import { patterns } from "../../constants";

const RegistrationForm = () => {
  const { fetchRegistration, isLoading } = useRegister();

  const { control, handleSubmit, reset } = useForm<RegistrationFormData>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    fetchRegistration(data, () => {
      reset();
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="authForm">
        <Input
          name="fullName"
          placeholder="Full Name*"
          control={control}
          type="text"
          pattern={patterns.fullName.regex}
          patternErrorMessage={patterns.fullName.errorMessage}
        />
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
        <Button text="Sign Up" type="submit" isLoading={isLoading} />
      </form>
    </>
  );
};

export default RegistrationForm;
