import { authServices } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const profileInfoSchema = yup.object({
  username: yup.string().required("Please input username"),
  email: yup
    .string()
    .email("Please input valid email")
    .required("Please input email"),
  fullName: yup.string().required("Please input full name"),
  role: yup.string().required("Please input role"),
});

const useInfoTab = () => {
  const {
    control: controlInfo,
    handleSubmit: handleSubmitInfo,
    formState: { errors: errorsInfo },
    reset: resetInfo,
    getValues: getValuesInfo,
  } = useForm({
    resolver: yupResolver(profileInfoSchema),
  });

  const getProfileInfo = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const {
    data: dataProfile,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["profile-info"],
    queryFn: getProfileInfo,
  });

  return {
    controlInfo,
    errorsInfo,
    resetInfo,
    handleSubmitInfo,

    dataProfile,
    isLoadingProfile,
    refetchProfile,
  };
};

export default useInfoTab;
