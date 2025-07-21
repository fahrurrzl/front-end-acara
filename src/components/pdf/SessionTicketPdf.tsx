import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { styles } from "./style";
import { convertTime } from "@/utils/date";

const SessionTicketPdf = ({
  qrImages,
  sessionTitle,
  date,
  dataDetailTransaction,
  dataTicket,
  dataEvent,
}: {
  qrImages: string[];
  sessionTitle: string;
  date: string;
  dataDetailTransaction: any;
  dataTicket: any;
  dataEvent: any;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ORDER</Text>
          <Text>Order ID: #{dataDetailTransaction?.orderId}</Text>
        </View>
        <View>
          <Text style={styles.title}>{sessionTitle}</Text>
          <Text>Ticket: {dataTicket?.name}</Text>
          <Text>Start Date: {date}</Text>
        </View>
      </View>
      <View style={styles.content}>
        {dataDetailTransaction?.vouchers?.map((voucher: any, idx: number) => (
          <View key={voucher.voucherId || idx} style={styles.voucher}>
            <View>
              <Image src={qrImages[idx]} style={{ width: 120, height: 120 }} />
            </View>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketTitle}>{dataEvent.name}</Text>
              <Text style={styles.ticketSubTitle}>Date</Text>
              <Text>
                {convertTime(dataEvent?.startDate)} -{" "}
                {convertTime(dataEvent?.endDate)}
              </Text>
              <Text style={styles.ticketSubTitle}>Location</Text>
              <Text>
                {dataEvent?.isOnline ? "Online" : dataEvent?.location?.address}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default SessionTicketPdf;
