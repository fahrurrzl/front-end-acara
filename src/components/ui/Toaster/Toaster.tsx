import { IToaster } from "@/context/ToasterContext";
import { ReactNode } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const iconList: { [key: string]: ReactNode } = {
  success: <CiCircleCheck className="text-3xl text-success-500" />,
  error: <CiCircleRemove className="text-3xl text-danger-500" />,
};

const Toaster = (props: IToaster) => {
  const { type, message } = props;

  return (
    <div
      role="alert"
      aria-labelledby="toaster-label"
      className="fixed right-8 top-8 max-w-xs rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-center gap-2 p-4">
        {iconList[type]}
        <p id="toaster-label" className="text-sm text-gray-700">
          {message}
        </p>
      </div>
    </div>
  );
};
export default Toaster;
