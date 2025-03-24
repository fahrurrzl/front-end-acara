import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { JSX } from "react";
import { FiLogOut } from "react-icons/fi";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen } = props;
  const router = useRouter();

  return (
    <div
      className={cn(
        "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r border-r-default bg-white px-2 py-6 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
        { "translate-x-0": isOpen },
      )}
    >
      <div>
        <div className="flex items-center justify-center">
          <Image
            src="/images/general/logo.svg"
            width={180}
            height={60}
            alt="Logo"
            className="mb-6 w-32 cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        <Listbox items={sidebarItems} aria-label="Sidebar">
          {(item) => (
            <ListboxItem
              key={item.key}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              className={cn("my-1 h-12 text-2xl", {
                "bg-danger-500 text-white": router.pathname.startsWith(
                  item.href,
                ),
              })}
              as={Link}
              href={item.href}
            >
              <p className="text-sm">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex items-center p-1">
        <Button
          color="danger"
          variant="light"
          fullWidth
          className="flex items-center justify-start gap-2 rounded-lg px-4 py-2"
          onPress={() => signOut()}
        >
          <FiLogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};
export default DashboardLayoutSidebar;
