import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/views/Member/Profile";

const ProfilePage = () => {
  return (
    <DashboardLayout
      title="Your Profile"
      description="Manage your profile"
      type="member"
    >
      <Profile />
    </DashboardLayout>
  );
};
export default ProfilePage;
