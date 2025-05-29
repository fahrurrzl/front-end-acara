import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useInfoTab from "./useInfotTab";
import { useEffect } from "react";
import useProfile from "../useProfile";
import { IProfile } from "@/types/Auth";

interface PropTypes {
  onUpdate: (payload: IProfile) => void;
  isPendingUpdate: boolean;
}

const InfoTab = ({ onUpdate, isPendingUpdate }: PropTypes) => {
  const { controlInfo, errorsInfo, dataProfile, resetInfo, handleSubmitInfo } =
    useInfoTab();

  useEffect(() => {
    if (dataProfile) {
      resetInfo({
        fullName: dataProfile?.fullName,
      });
    }
  }, [dataProfile]);

  return (
    <Card className="w-full lg:w-2/4">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-xl font-bold lg:text-2xl">Profile Information</h2>
        <p className="text-foreground-500">
          Manage information for your account
        </p>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={handleSubmitInfo(onUpdate)}
          className="flex flex-col gap-4"
        >
          <p className="text-sm font-medium text-default-700">Info Profile</p>

          <Skeleton isLoaded={!!dataProfile?.fullName} className="rounded-lg">
            <Controller
              name="fullName"
              control={controlInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Full Name"
                  variant="bordered"
                  placeholder="Please input your full name"
                  isInvalid={errorsInfo.fullName !== undefined}
                  errorMessage={errorsInfo.fullName?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataProfile?.username} className="rounded-lg">
            <Input
              type="text"
              label="Username"
              variant="flat"
              disabled
              value={dataProfile?.username}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
            <Input
              type="text"
              label="Email"
              variant="flat"
              disabled
              value={dataProfile?.email}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
            <Input
              type="text"
              label="Role"
              variant="flat"
              disabled
              value={dataProfile?.role}
            />
          </Skeleton>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingUpdate || !dataProfile?._id}
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
