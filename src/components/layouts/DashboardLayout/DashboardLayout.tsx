import PageHead from "@/components/commons/PageHead";
import { Fragment, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constant";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

interface PropTypes {
  title?: string;
  description?: string;
  children: React.ReactNode;
  type?: "member" | "admin";
}

const DashboardLayout = (props: PropTypes) => {
  const { title, children, type, description } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <PageHead title={title} />
      <div className="flex max-w-screen-2xl 2xl:container">
        <DashboardLayoutSidebar
          isOpen={open}
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
        />
        <div className="flex h-screen w-full flex-col overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            isBlurred={false}
            classNames={{ wrapper: "p-0" }}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            ></NavbarMenuToggle>
          </Navbar>
          <p className="mb-4 text-sm">{description}</p>
          {children}
        </div>
      </div>
    </Fragment>
  );
};
export default DashboardLayout;
