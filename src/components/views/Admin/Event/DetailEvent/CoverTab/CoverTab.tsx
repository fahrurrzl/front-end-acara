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
import useCoverTab from "./useCoverTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEvent } from "@/types/Event";

interface propTypes {
  currentCover: string;
  onUpdate: (data: IEvent) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const CoverTab = (props: propTypes) => {
  const { currentCover, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    handleDeleteCover,
    isPendingMutateDeleteFile,
    handleUploadCover,
    isPendingMutateUploadFile,

    controlUpdateCover,
    errorsUpdateCover,
    handleSubmitUpdateCover,
    resetUpdateCover,

    preview,
  } = useCoverTab();

  useEffect(() => {
    resetUpdateCover();
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Cover Event</h1>
        <p className="w-full text-sm text-default-400">
          Manage cover of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateCover(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Cover
            </p>
            <Skeleton
              isLoaded={!!currentCover}
              className="aspect-video rounded-lg"
            >
              <Image
                src={currentCover}
                alt="Cover"
                fill
                className="!relative rounded-lg"
              />
            </Skeleton>
            <Controller
              name="banner"
              control={controlUpdateCover}
              render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  onDelete={() => handleDeleteCover(onChange)}
                  onUpload={(files) => handleUploadCover(files, onChange)}
                  isUploading={isPendingMutateUploadFile}
                  isDeleting={isPendingMutateDeleteFile}
                  isInvalid={errorsUpdateCover.banner !== undefined}
                  errorMessage={errorsUpdateCover.banner?.message}
                  isDroppable
                  label={
                    <p className="mb-2 text-sm font-medium text-default-700">
                      Upload new cover
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
export default CoverTab;
