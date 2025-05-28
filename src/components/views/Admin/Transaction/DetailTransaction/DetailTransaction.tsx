import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Skeleton,
} from "@heroui/react";
import useDetailTransaction from "./useDetailTransaction";
import { convertIDR } from "@/utils/currency";
import { QRCodeSVG } from "qrcode.react";
import { convertTime } from "@/utils/date";
import Link from "next/link";

const DetailTransaction = () => {
  const { dataDetailTransaction, dataEvent, dataTicket } =
    useDetailTransaction();

  return (
    <div>
      <Card className="p-4">
        <h3 className="font-bold">Order: </h3>
        <CardHeader className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
          <Skeleton
            isLoaded={!!dataDetailTransaction}
            className="h-14 rounded-lg"
          >
            <div>
              <h3 className="font-bold">Order ID: </h3>
              <p>{dataDetailTransaction?.orderId}</p>
            </div>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataDetailTransaction}
            className="h-14 rounded-lg"
          >
            <div>
              <h3 className="font-bold">Ticket: </h3>
              <p>
                {dataTicket?.name}({convertIDR(dataTicket?.price)}) x{" "}
                {dataDetailTransaction?.quantity}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataDetailTransaction}
            className="h-14 rounded-lg"
          >
            <div>
              <h3 className="font-bold">Total: </h3>
              <p>{convertIDR(dataDetailTransaction?.total)}</p>
            </div>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataDetailTransaction}
            className="h-14 rounded-lg"
          >
            <div>
              <h3 className="font-bold">Status: </h3>
              <Chip
                variant="flat"
                color={
                  dataDetailTransaction?.status === "completed"
                    ? "success"
                    : dataDetailTransaction?.status === "pending"
                      ? "warning"
                      : "danger"
                }
              >
                {dataDetailTransaction?.status as string}
              </Chip>
            </div>
          </Skeleton>
        </CardHeader>
        {dataDetailTransaction?.status === "completed" && (
          <div className="flex flex-col gap-2">
            <h3 className="mb-3 font-bold">Ticket: </h3>
            <div>
              {dataDetailTransaction?.vouchers?.map(
                (voucher: { voucherId: string }) => (
                  <Card shadow="sm" key={voucher.voucherId} className="mb-4">
                    <CardBody className="flex flex-col items-center gap-8 p-4 lg:flex-row lg:items-start">
                      <div className="mx-auto w-2/4 lg:m-0 lg:w-1/4">
                        <QRCodeSVG
                          value={voucher.voucherId}
                          className="!h-full !w-full"
                        />
                      </div>
                      <div>
                        <h1 className="mb-3 text-2xl font-bold text-danger lg:text-3xl">
                          {dataEvent?.name}
                        </h1>
                        <div className="mb-3">
                          <p className="font-semibold text-foreground-500">
                            Date
                          </p>
                          <p className="text-sm font-semibold text-danger lg:text-base">
                            {convertTime(dataEvent?.startDate)} -{" "}
                            {convertTime(dataEvent?.endDate)}
                          </p>
                        </div>
                        <div className="mb-3">
                          <p className="font-semibold text-foreground-500">
                            Location
                          </p>
                          <p className="mb-3 text-sm font-semibold text-danger lg:text-base">
                            {dataEvent?.isOnline
                              ? "Online"
                              : dataEvent?.location?.address}
                          </p>
                          {dataEvent?.isOnline ? (
                            <Button
                              variant="bordered"
                              color="danger"
                              as={Link}
                              href={`${dataEvent?.location?.address}`}
                            >
                              Join Now
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ),
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
export default DetailTransaction;
