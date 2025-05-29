import InputFile from "@/components/ui/InputFile";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import usePictureTab from "./usePictureTab";
import { IProfile } from "@/types/Auth";
import { useEffect } from "react";

interface PropTypes {
  currentPicture: string;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const PictureTab = ({
  currentPicture,
  isPendingUpdate,
  onUpdate,
  isSuccessUpdate,
}: PropTypes) => {
  const {
    controlUpdatePicture,
    handleUploadPicture,
    handleDeletePicture,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    preview,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdateProfile,
  } = usePictureTab();

  useEffect(() => {
    resetUpdateProfile();
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full lg:w-2/4">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-xl font-bold lg:text-2xl">Profile Picture</h2>
        <p className="text-foreground-500">Manage picture for your profile</p>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={handleSubmitUpdatePicture(onUpdate)}
          className="flex flex-col gap-4"
        >
          <div>
            <p className="mb-3 text-sm font-medium text-default-700">
              Current Picture
            </p>
            <div className="mb-3 flex items-center justify-center">
              <Avatar
                aria-label="Profile Picture"
                src={
                  currentPicture?.startsWith("https://res.cloudinary.com")
                    ? currentPicture
                    : "/images/user.png"
                }
                className="h-2/3 w-2/3 object-cover"
              />
            </div>

            <Controller
              name="profilePicture"
              control={controlUpdatePicture}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeletePicture(onChange)}
                  onUpload={(files) => handleUploadPicture(files, onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdatePicture.profilePicture !== undefined}
                  errorMessage={errorsUpdatePicture.profilePicture?.message}
                  isDroppable
                  label={
                    <p className="mb-2 text-sm font-medium text-default-700">
                      Upload new icon
                    </p>
                  }
                  preview={typeof preview === "string" ? preview : ""}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Change"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default PictureTab;
