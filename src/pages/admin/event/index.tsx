import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Event"
      description="List of all event, Create new event, and manage existing event"
      type="admin"
    >
      <Event />
    </DashboardLayout>
  );
};
export default AdminCategoryPage;
