import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login";

const index = () => {
  return (
    <AuthLayout title="Acara | Login">
      <Login />
    </AuthLayout>
  );
};
export default index;
