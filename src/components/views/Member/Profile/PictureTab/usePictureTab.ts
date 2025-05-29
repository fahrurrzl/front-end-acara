import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const profilePictureSchema = yup.object({
  profilePicture: yup
    .mixed<FileList | string>()
    .required("Please input profile picture"),
});

const usePictureTab = () => {
  const {
    handleUploadFile,
    handleDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorsUpdatePicture },
    watch: watchUpdatePicture,
    setValue: setValueUpdatePicture,
    getValues: getValuesUpdatePicture,
    reset: resetUpdateProfile,
  } = useForm({
    resolver: yupResolver(profilePictureSchema),
  });

  const preview = watchUpdatePicture("profilePicture");
  const fileUrl = getValuesUpdatePicture("profilePicture");

  const handleUploadPicture = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdatePicture("profilePicture", fileUrl);
      }
    });
  };

  const handleDeletePicture = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    controlUpdatePicture,
    handleSubmitUpdatePicture,
    errorsUpdatePicture,
    resetUpdateProfile,

    handleUploadPicture,
    handleDeletePicture,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    preview,
  };
};

export default usePictureTab;
