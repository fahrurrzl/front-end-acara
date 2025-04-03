import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataCategory: ICategory;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    resetUpdateInfo();
  }, [isSuccessUpdate]);

  useEffect(() => {
    setValueUpdateInfo("name", `${dataCategory?.name}`);
    setValueUpdateInfo("description", `${dataCategory?.description}`);
  }, [dataCategory]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Info</h1>
        <p className="w-full text-sm text-default-400">
          Manage info of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <p className="text-sm font-medium text-default-700">Current Icon</p>
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Name"
                  variant="bordered"
                  autoFocus
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingUpdate}
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
export default InfoTab;
