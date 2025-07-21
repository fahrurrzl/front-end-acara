import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/DetailTransaction";

const TransactionDetailPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Detail of transaction"
      type="member"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};
export default TransactionDetailPage;
