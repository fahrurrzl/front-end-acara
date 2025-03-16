import { ActivationProps } from "@/types/Auth";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Activation = (props: ActivationProps) => {
  const router = useRouter();
  const { status } = props;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-2/3 flex-col items-center justify-center gap-10 lg:w-1/2">
        <Image
          className="w-2/4 lg:w-1/2"
          src="/images/general/logo.svg"
          alt="Logo"
          width={180}
          height={180}
        />
        <Image
          className="w-full"
          src={
            status === "success"
              ? "/images/illustrations/success.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="Success"
          width={300}
          height={300}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold text-danger-500">
          Activation {status === "success" ? "Success" : "Failed"}
        </h1>
        <p className="text-xl font-semibold text-default-500">
          {status === "success"
            ? "Thank you for registration account in Acara"
            : "Confirmation code is invalid"}
        </p>

        <Button
          variant="bordered"
          color="danger"
          onPress={() => router.push("/")}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default Activation;
