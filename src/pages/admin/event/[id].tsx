import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/Event/DetailEvent";

const AdminDetailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Event"
      description="Manage information for this event"
      type="admin"
    >
      <DetailEvent />
    </DashboardLayout>
  );
};
export default AdminDetailCategoryPage;
