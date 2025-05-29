import { Tab, Tabs } from "@heroui/react";
import PictureTab from "./PictureTab";
import { FaRegImage, FaRegUser } from "react-icons/fa6";
import useProfile from "./useProfile";

const Profile = () => {
  const {
    dataProfile,
    isLoadingDataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfilePicture,
    isSuccessUpdateProfile,
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
            isPendingUpdate={isPendingMutateUpdateProfilePicture}
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
          Info
        </Tab>
      </Tabs>
    </div>
  );
};
export default Profile;
