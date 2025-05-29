import { ToasterContext } from "@/context/ToasterContext";
import { authServices } from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
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

  const updateProfilePicture = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfilePicture,
    isPending: isPendingMutateUpdateProfilePicture,
    isSuccess: isSuccessUpdateProfile,
  } = useMutation({
    mutationFn: updateProfilePicture,
    onSuccess: () => {
      refetchDataProfile();
      setToaster({
        type: "success",
        message: "Update profile picture successfully",
      });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
  });

  const handleUpdateProfile = (data: IProfile) =>
    mutateUpdateProfilePicture(data);

  return {
    dataProfile,
    isLoadingDataProfile,

    handleUpdateProfile,
    isPendingMutateUpdateProfilePicture,
    isSuccessUpdateProfile,
  };
};

export default useProfile;
