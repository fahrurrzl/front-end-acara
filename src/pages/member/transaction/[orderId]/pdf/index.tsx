import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SessionTicketPdf from "@/components/pdf/SessionTicketPdf";
import { generateSessionPDFQrCode } from "@/utils/generateSessionPDFQrCode";
import useDetailTransaction from "@/components/views/Member/DetailTransaction/useDetailTransaction";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false },
);

const Page = () => {
  const [qrImages, setQrImages] = useState<string[]>([]);

  const { dataDetailTransaction, dataEvent, dataTicket } =
    useDetailTransaction();

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
    <div className="h-screen w-full">
      {qrImages.length > 0 && (
        <PDFViewer width="100%" height="100%">
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
        </PDFViewer>
      )}
    </div>
  );
};

export default Page;
