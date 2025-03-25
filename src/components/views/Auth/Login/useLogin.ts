import { ToasterContext } from "@/context/ToasterContext";
import { ILogin } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  identifier: Yup.string().required("Pease input your username or email"),
  password: Yup.string().required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { setToaster } = useContext(ToasterContext);

  const toggleVisiblePassword = () => setVisiblePassword((visible) => !visible);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const callbackUrl: string = (router.query.callbackUrl as string) || "/";

  const loginService = async (payload: ILogin) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result?.status === 401) {
      throw new Error("Login failed");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginService,
    onError: () => {
      setToaster({
        type: "error",
        message: "Your credential is wrong",
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Login successfully",
      });
      router.push(callbackUrl || "/");
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    visiblePassword,
    toggleVisiblePassword,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
