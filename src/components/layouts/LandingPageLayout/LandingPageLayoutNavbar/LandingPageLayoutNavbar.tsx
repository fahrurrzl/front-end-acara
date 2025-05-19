import {
  Button,
  ButtonVariantProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
  User,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BUTTON_ITEMS, NAVBAR_ITEMS } from "../LandingPageLayout.constant";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useLandingPageLayoutNavbar();

  return (
    <Navbar maxWidth="full" isBlurred={false} isBordered shouldHideOnScroll>
      <div className="flex items-center gap-8">
        <NavbarBrand as={Link} href="/">
          <Image
            src="/images/general/logo.svg"
            width={100}
            height={80}
            alt="Logo"
            className="cursor-pointer"
          />
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex">
          {NAVBAR_ITEMS.map((item) => (
            <NavbarItem
              key={`nav-${item.name}`}
              as={Link}
              href={item.href}
              className={cn(
                "text-sm font-medium text-default-700 transition-all hover:text-danger",
                {
                  "font-bold text-danger": router.pathname === item.href,
                },
              )}
            >
              {item.name}
            </NavbarItem>
          ))}
        </NavbarContent>
      </div>
      <NavbarContent justify="end">
        <NavbarMenuToggle className="lg:hidden" />
        <NavbarItem className="hidden lg:relative lg:flex">
          <Input
            isClearable
            placeholder="Search Event"
            className="w-[300px]"
            startContent={<CiSearch />}
            onClear={() => {}}
            onChange={() => {}}
          />
        </NavbarItem>
        <NavbarItem>
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            {session.status === "authenticated" ? (
              <Dropdown>
                <DropdownTrigger>
                  <Skeleton className="rounded-lg" isLoaded={!!dataProfile}>
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        src: `${dataProfile?.profilePicture.startsWith("https://res.cloudinary.com") ? dataProfile?.profilePicture : ""}`,
                      }}
                      className="transition-transform"
                      description={`@${dataProfile?.username}`}
                      name={dataProfile?.fullName}
                    />
                  </Skeleton>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="admin"
                    href="/admin/dashboard"
                    className={cn({
                      hidden: dataProfile?.role !== "admin",
                    })}
                  >
                    Admin
                  </DropdownItem>
                  <DropdownItem key="profile" href="/member/profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem key="signout" onPress={() => signOut()}>
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              BUTTON_ITEMS.map((item) => (
                <Button
                  key={`button-${item.name}`}
                  as={Link}
                  href={item.href}
                  color="danger"
                  variant={item.variant as ButtonVariantProps["variant"]}
                >
                  {item.name}
                </Button>
              ))
            )}
          </div>
        </NavbarItem>

        {/* Mobile nav start */}
        <NavbarMenu className="gap-4">
          {NAVBAR_ITEMS.map((item) => (
            <NavbarMenuItem
              key={`nav-${item.name}`}
              className={cn(
                "text-sm font-medium text-default-700 transition-all hover:text-danger",
                {
                  "font-bold text-danger": router.pathname === item.href,
                },
              )}
            >
              <Link href={item.href}>{item.name}</Link>
            </NavbarMenuItem>
          ))}
          {session.status === "authenticated" ? (
            dataProfile?.role === "admin" ? (
              <Fragment>
                <NavbarMenuItem
                  className={cn(
                    "text-sm font-medium text-default-700 transition-all hover:text-danger",
                    {
                      "font-bold text-danger":
                        router.pathname === "/admin/dashboard",
                    },
                  )}
                >
                  <Link href="/admin/dashboard">Admin</Link>
                </NavbarMenuItem>
                <NavbarMenuItem
                  as={Link}
                  href="/member/profile"
                  className={cn(
                    "text-sm font-medium text-default-700 transition-all hover:text-danger",
                    {
                      "font-bold text-danger":
                        router.pathname === "/member/profile",
                    },
                  )}
                >
                  <Link href="/member/profile">Profile</Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Button
                    variant="bordered"
                    color="danger"
                    className="w-full"
                    onPress={() => signOut()}
                  >
                    Log out
                  </Button>
                </NavbarMenuItem>
              </Fragment>
            ) : (
              <NavbarMenuItem
                className={cn(
                  "text-sm font-medium text-default-700 transition-all hover:text-danger",
                  {
                    "font-bold text-danger":
                      router.pathname === "/member/dashboard",
                  },
                )}
              >
                <Link href="/member/dashboard">My Dashboard</Link>
              </NavbarMenuItem>
            )
          ) : (
            <Fragment>
              <NavbarMenuItem>
                <Button
                  as={Link}
                  href="/auth/register"
                  variant="bordered"
                  color="danger"
                  className="w-full"
                >
                  Register
                </Button>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Button
                  as={Link}
                  href="/auth/login"
                  variant="solid"
                  color="danger"
                  className="w-full"
                >
                  Login
                </Button>
              </NavbarMenuItem>
            </Fragment>
          )}
        </NavbarMenu>
        {/* Mobile nav end */}
      </NavbarContent>
    </Navbar>
  );
};
export default LandingPageLayoutNavbar;
