import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    color: "#262626",
    fontFamily: "Helvetica",
    fontSize: "12px",
    padding: "24px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  content: {
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  voucher: {
    display: "flex",
    gap: "20px",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    marginBottom: "6px",
  },
  ticketInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  ticketTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  ticketSubTitle: {
    fontSize: "12px",
  },
});
