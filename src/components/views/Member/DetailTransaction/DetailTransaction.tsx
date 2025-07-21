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
import Script from "next/script";
import environment from "@/config/environments";
import { FiDownload, FiEye } from "react-icons/fi";
import { useRouter } from "next/router";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SessionTicketPdf from "@/components/pdf/SessionTicketPdf";
import { useEffect, useState } from "react";
import { generateSessionPDFQrCode } from "@/utils/generateSessionPDFQrCode";

const DetailTransaction = () => {
  const [qrImages, setQrImages] = useState<string[]>([]);
  const { dataDetailTransaction, dataEvent, dataTicket } =
    useDetailTransaction();
  const router = useRouter();
  const pdfUrl = `${router.asPath}/pdf`;

  useEffect(() => {
    const loadQRs = async () => {
      if (!dataDetailTransaction?.vouchers || !dataEvent?.startDate) return;

      const qrs = await Promise.all(
        dataDetailTransaction.vouchers.map(async (voucher: any) => {
          const voucherUrl = `${voucher.voucherId}`;
          return await generateSessionPDFQrCode(voucherUrl);
        }),
      );
      setQrImages(qrs);
    };

    loadQRs();
  }, [dataDetailTransaction, dataEvent]);

  return (
    <div>
      <Script
        src={environment.NEXT_PUBLIC_MIDTRANS_SANP_URL}
        data-client-key={environment.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
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
            <div className="flex items-center justify-between">
              <h3 className="mb-3 font-bold">Ticket: </h3>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  color="primary"
                  as={Link}
                  href={pdfUrl}
                  target="_blank"
                >
                  <FiEye />
                  View PDF
                </Button>
                <PDFDownloadLink
                  document={
                    <SessionTicketPdf
                      qrImages={qrImages}
                      sessionTitle={
                        dataDetailTransaction?.vouchers.length > 1
                          ? "Your Tickets"
                          : "Your Ticket"
                      }
                      date={dataEvent?.startDate}
                      dataDetailTransaction={dataDetailTransaction}
                      dataTicket={dataTicket}
                      dataEvent={dataEvent}
                    />
                  }
                  fileName={`ticket-${dataDetailTransaction?.orderId}.pdf`}
                >
                  <Button size="sm" color="danger">
                    <FiDownload />
                    Download
                  </Button>
                </PDFDownloadLink>
              </div>
            </div>
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
        {dataDetailTransaction?.status === "pending" && (
          <Button
            className="w-fit"
            color="danger"
            onPress={() =>
              (window as any).snap.pay(dataDetailTransaction?.payment?.token)
            }
          >
            Pay Now
          </Button>
        )}
      </Card>
    </div>
  );
};
export default DetailTransaction;
