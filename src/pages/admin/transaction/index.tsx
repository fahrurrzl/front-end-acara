import DashboardLayout from "@/components/layouts/DashboardLayout";
import AdminTransaction from "@/components/views/Admin/Transaction";

const AdminTransactionPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      description="List of all transactions"
      type="admin"
    >
      <AdminTransaction />
    </DashboardLayout>
  );
};
export default AdminTransactionPage;
