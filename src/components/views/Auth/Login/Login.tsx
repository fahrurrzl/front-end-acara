import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";
import useLogin from "./useLogin";
import { cn } from "@/utils/cn";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const {
    control,
    handleSubmit,
    handleLogin,
    errors,
    isPendingLogin,
    visiblePassword,
    toggleVisiblePassword,
  } = useLogin();
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
          <h2 className="mb-2 text-2xl font-bold text-danger-500">Login</h2>
          <p className="mb-4 text-sm text-gray-500">
            Don{"'"}t have an account?&nbsp;
            <Link
              href="/auth/register"
              className="font-semibold text-danger-500"
            >
              Register here
            </Link>
          </p>
          {errors.root && (
            <p className="mb-2 text-medium text-danger">
              {errors?.root?.message}
            </p>
          )}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className={cn(
              "flex w-80 flex-col gap-4",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
          >
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  name="identifier"
                  label="Username / password"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword ? "text" : "password"}
                  name="password"
                  label="Password"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      onClick={toggleVisiblePassword}
                      type="button"
                      className="focus:outline-none"
                    >
                      {visiblePassword ? (
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
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Login;
