import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import { authServices } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const registerSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Email format not valid")
    .required("Email is required"),
  password: Yup.string()
    .required("Please input your password")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Please input your password")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerService,
    onError(error) {
      setError("root", { message: error.message });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);

  const handleVisiblePassword = (type: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [type]: !visiblePassword[type],
    });
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
