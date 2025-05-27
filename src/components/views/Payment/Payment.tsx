import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import usePayment from "./usePayment";

const Payment = () => {
  const router = useRouter();
  const { order_id, status } = router.query;
  const { mutateUpdateOrderStatus } = usePayment();

  useEffect(() => {
    if (router.isReady) {
      mutateUpdateOrderStatus();
    }
  }, [router.isReady]);

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
        <h1 className="text-3xl font-bold capitalize text-danger-500">
          Transaction {status}
        </h1>

        <Button
          variant="bordered"
          color="danger"
          onPress={() => router.push(`/member/transaction`)}
        >
          Check your transaction here
        </Button>
      </div>
    </div>
  );
};
export default Payment;
