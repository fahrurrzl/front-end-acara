import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Member/Dashboard";
import Transaction from "@/components/views/Member/Transaction";

const TransactionMemberPage = () => {
  return (
    <DashboardLayout
      title="Transaction"
      description="Member Transaction"
      type="member"
    >
      <Transaction />
    </DashboardLayout>
  );
};
export default TransactionMemberPage;
