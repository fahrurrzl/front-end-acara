import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    errors,
    handleRegister,
    handleSubmit,
    isPendingRegister,
  } = useRegister();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-2/3 flex-col items-center justify-center gap-10 lg:w-1/3">
        <Image
          className="w-2/4 lg:w-1/2"
          src="/images/general/logo.svg"
          alt="Logo"
          width={180}
          height={180}
        />
        <Image
          className="w-full"
          src="/images/illustrations/login.svg"
          alt="Logo"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody>
          <h2 className="text-2xl font-bold text-danger-500">
            Create account!
          </h2>
          <p className="mb-4 text-sm text-gray-500">
            Have an account?&nbsp;
            <Link href="/auth/login" className="font-semibold text-danger-500">
              Login here
            </Link>
          </p>
          {errors.root && (
            <p className="mb-2 text-medium text-danger">
              {errors?.root?.message}
            </p>
          )}
          <form
            onSubmit={handleSubmit(handleRegister)}
            className={cn(
              "flex w-80 flex-col gap-4",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
          >
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  name="fullName"
                  label="Full Name"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.fullName !== undefined}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  name="username"
                  label="Username"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  name="email"
                  label="Email"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.password ? "text" : "password"}
                  name="password"
                  label="Password"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
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
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  name="password_confirm"
                  label="Password Confirmation"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
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

            <Button type="submit" size="lg" color="danger">
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Register;
