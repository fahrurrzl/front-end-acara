import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useSecurityTab from "./useSecurityTab";
import { IPassword } from "@/types/Auth";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useEffect } from "react";

interface PropTypes {
  onUpdate: (data: IPassword) => void;
  isPendingUpdatePassword: boolean;
  isSuccessUpdatePassword: boolean;
}

const SecurityTab = ({
  onUpdate,
  isPendingUpdatePassword,
  isSuccessUpdatePassword,
}: PropTypes) => {
  const {
    controlPassword,
    errorsPassword,
    handleSubmitPassword,
    setValuePassword,
    handleVisiblePassword,
    visiblePassword,
  } = useSecurityTab();

  useEffect(() => {
    if (isSuccessUpdatePassword) {
      setValuePassword("oldPassword", "");
      setValuePassword("password", "");
      setValuePassword("confirmPassword", "");
    }
  }, [isSuccessUpdatePassword]);

  return (
    <Card className="w-full lg:w-2/4">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-xl font-bold lg:text-2xl">Security</h2>
        <p className="text-foreground-500">Update your account security</p>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={handleSubmitPassword(onUpdate)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="oldPassword"
            control={controlPassword}
            render={({ field }) => (
              <Input
                {...field}
                type={visiblePassword.oldPassword ? "text" : "password"}
                label="Old Password"
                autoComplete="off"
                variant="bordered"
                isInvalid={errorsPassword.oldPassword !== undefined}
                errorMessage={errorsPassword.oldPassword?.message}
                endContent={
                  <button
                    onClick={() => handleVisiblePassword("oldPassword")}
                    type="button"
                    className="focus:outline-none"
                  >
                    {visiblePassword.oldPassword ? (
                      <FaEye className="pointer-events-none text-xl text-default-500" />
                    ) : (
                      <FaEyeSlash className="pointer-events-none text-xl text-default-500" />
                    )}
                  </button>
                }
              />
            )}
          />

          <Controller
            name="password"
            control={controlPassword}
            render={({ field }) => (
              <Input
                {...field}
                type={visiblePassword.password ? "text" : "password"}
                name="password"
                label="Password"
                autoComplete="off"
                variant="bordered"
                isInvalid={errorsPassword.password !== undefined}
                errorMessage={errorsPassword.password?.message}
                endContent={
                  <button
                    onClick={() => handleVisiblePassword("password")}
                    type="button"
                    className="focus:outline-none"
                  >
                    {visiblePassword.password ? (
                      <FaEye className="pointer-events-none text-xl text-default-500" />
                    ) : (
                      <FaEyeSlash className="pointer-events-none text-xl text-default-500" />
                    )}
                  </button>
                }
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={controlPassword}
            render={({ field }) => (
              <Input
                {...field}
                type={visiblePassword.confirmPassword ? "text" : "password"}
                label="Confirm Password"
                autoComplete="off"
                variant="bordered"
                isInvalid={errorsPassword.confirmPassword !== undefined}
                errorMessage={errorsPassword.confirmPassword?.message}
                endContent={
                  <button
                    onClick={() => handleVisiblePassword("confirmPassword")}
                    type="button"
                    className="focus:outline-none"
                  >
                    {visiblePassword.confirmPassword ? (
                      <FaEye className="pointer-events-none text-xl text-default-500" />
                    ) : (
                      <FaEyeSlash className="pointer-events-none text-xl text-default-500" />
                    )}
                  </button>
                }
              />
            )}
          />

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingUpdatePassword}
          >
            {isPendingUpdatePassword ? (
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
export default SecurityTab;
