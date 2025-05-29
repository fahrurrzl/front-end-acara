import { ToasterContext } from "@/context/ToasterContext";
import { authServices } from "@/services/auth.service";
import { IPassword, IProfile } from "@/types/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const useProfile = () => {
  const { setToaster } = useContext(ToasterContext);

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data;
  };

  const {
    data: dataProfile,
    isLoading: isLoadingDataProfile,
    refetch: refetchDataProfile,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const updateProfile = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingMutateUpdateProfile,
    isSuccess: isSuccessUpdateProfile,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      refetchDataProfile();
      setToaster({
        type: "success",
        message: "Update profile successfully",
      });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
  });

  const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data);

  const updatePassword = async (payload: IPassword) => {
    const { data } = await authServices.updatePassword(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdatePassword,
    isPending: isPendingMutateUpdatePassword,
    isSuccess: isSuccessUpdatePassword,
  } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Update password successfully",
      });
    },
    onError: (error: any) => {
      setToaster({
        type: "error",
        message: error.response?.data.meta.message,
      });
    },
  });

  const handleUpdatePassword = (data: IPassword) => mutateUpdatePassword(data);

  return {
    dataProfile,
    isLoadingDataProfile,

    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessUpdateProfile,

    handleUpdatePassword,
    isPendingMutateUpdatePassword,
    isSuccessUpdatePassword,
  };
};

export default useProfile;
