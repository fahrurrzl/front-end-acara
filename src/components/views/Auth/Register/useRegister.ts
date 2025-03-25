import { useContext, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import { authServices } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ToasterContext } from "@/context/ToasterContext";

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
  const { setToaster } = useContext(ToasterContext);
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
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Register successfully",
      });
      router.push("/auth/register/success");
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
