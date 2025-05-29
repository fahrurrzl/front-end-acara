import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const passwordSchema = yup.object({
  oldPassword: yup.string().required("Please input your password"),
  password: yup
    .string()
    .required("Please input your password")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Please input your password")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

const useSecurityTab = () => {
  const [visiblePassword, setVisiblePassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (
    type: "password" | "oldPassword" | "confirmPassword",
  ) => {
    setVisiblePassword({
      ...visiblePassword,
      [type]: !visiblePassword[type],
    });
  };

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    setValue: setValuePassword,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  return {
    controlPassword,
    errorsPassword,
    handleSubmitPassword,
    setValuePassword,
    handleVisiblePassword,
    visiblePassword,
  };
};

export default useSecurityTab;
