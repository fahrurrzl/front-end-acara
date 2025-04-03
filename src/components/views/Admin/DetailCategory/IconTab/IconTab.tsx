import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";

interface propTypes {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const IconTab = (props: propTypes) => {
  const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleUploadIcon,
    isPendingMutateUploadFile,

    controlUpdateIcon,
    errorsUpdateIcon,
    handleSubmitUpdateIcon,
    resetUpdateIcon,

    preview,
  } = useIconTab();

  useEffect(() => {
    resetUpdateIcon();
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-sm text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="icon" fill className="!relative" />
            </Skeleton>
            <Controller
              name="icon"
              control={controlUpdateIcon}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteIcon(onChange)}
                  onUpload={(files) => handleUploadIcon(files, onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateIcon.icon !== undefined}
                  errorMessage={errorsUpdateIcon.icon?.message}
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
export default IconTab;
