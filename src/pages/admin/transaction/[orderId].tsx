import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Admin/Transaction/DetailTransaction";

const TransactionDetailPage = () => {
  return (
    <DashboardLayout
      title="Detail Transaction"
      description="Detail of transaction"
      type="admin"
    >
      <DetailTransaction />
    </DashboardLayout>
  );
};
export default TransactionDetailPage;
