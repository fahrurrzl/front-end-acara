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

const InfoTab = () => {
  const { controlInfo, errorsInfo, dataProfile, resetInfo, handleSubmitInfo } =
    useInfoTab();
  const { isPendingMutateUpdateProfile, handleUpdateProfile } = useProfile();

  useEffect(() => {
    if (dataProfile) {
      resetInfo({
        username: dataProfile?.username,
        email: dataProfile?.email,
        fullName: dataProfile?.fullName,
        role: dataProfile?.role,
      });
    }
  }, [dataProfile]);

  return (
    <Card className="w-full lg:w-2/4">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-xl font-bold lg:text-2xl">Profile Info</h2>
        <p className="text-foreground-500">
          Manage information for your account
        </p>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={handleSubmitInfo(handleUpdateProfile)}
          className="flex flex-col gap-4"
        >
          <p className="text-sm font-medium text-default-700">Info Profile</p>
          <Skeleton isLoaded={!!dataProfile?.username} className="rounded-lg">
            <Controller
              name="username"
              control={controlInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Username"
                  variant="bordered"
                  isInvalid={errorsInfo.username !== undefined}
                  errorMessage={errorsInfo.username?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataProfile?.email} className="rounded-lg">
            <Controller
              name="email"
              control={controlInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Email"
                  variant="bordered"
                  isInvalid={errorsInfo.email !== undefined}
                  errorMessage={errorsInfo.email?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataProfile?.role} className="rounded-lg">
            <Controller
              name="role"
              control={controlInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Role"
                  variant="bordered"
                  disabled
                  isInvalid={errorsInfo.role !== undefined}
                  errorMessage={errorsInfo.role?.message}
                />
              )}
            />
          </Skeleton>

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
                  isInvalid={errorsInfo.fullName !== undefined}
                  errorMessage={errorsInfo.fullName?.message}
                />
              )}
            />
          </Skeleton>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUpdateProfile || !dataProfile?._id}
          >
            {isPendingMutateUpdateProfile ? (
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
