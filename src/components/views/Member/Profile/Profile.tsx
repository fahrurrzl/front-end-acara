import { Tab, Tabs } from "@heroui/react";
import PictureTab from "./PictureTab";
import { FaRegImage, FaRegUser } from "react-icons/fa6";
import useProfile from "./useProfile";
import InfoTab from "./InfoTab";
import { IoKeyOutline } from "react-icons/io5";
import SecurityTab from "./SecurityTab";

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessUpdateProfile,
    handleUpdatePassword,
    isPendingMutateUpdatePassword,
    isSuccessUpdatePassword,
  } = useProfile();

  return (
    <div>
      <Tabs aria-label="Tabs profile">
        <Tab
          key="picture"
          title={
            <div className="flex items-center space-x-2">
              <FaRegImage size={18} />
              <span>Picture</span>
            </div>
          }
        >
          <PictureTab
            currentPicture={dataProfile?.data.profilePicture}
            onUpdate={handleUpdateProfile}
            isPendingUpdate={isPendingMutateUpdateProfile}
            isSuccessUpdate={isSuccessUpdateProfile}
          />
        </Tab>
        <Tab
          key="info"
          title={
            <div className="flex items-center space-x-2">
              <FaRegUser size={18} />
              <span>Info</span>
            </div>
          }
        >
          <InfoTab />
        </Tab>
        <Tab
          key="security"
          title={
            <div className="flex items-center space-x-2">
              <IoKeyOutline size={18} />
              <span>Security</span>
            </div>
          }
        >
          <SecurityTab
            onUpdate={handleUpdatePassword}
            isPendingUpdatePassword={isPendingMutateUpdatePassword}
            isSuccessUpdatePassword={isSuccessUpdatePassword}
          />
        </Tab>
      </Tabs>
    </div>
  );
};
export default Profile;
