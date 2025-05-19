import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const NAVBAR_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
  { name: "Register", href: "/auth/register", variant: "bordered" },
  { name: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_ITEMS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: <FaInstagram />,
  },
  { name: "Facebook", href: "https://www.facebook.com/", icon: <FaFacebook /> },
  { name: "Twitter", href: "https://twitter.com/", icon: <FaTwitter /> },
  { name: "Tiktok", href: "https://tiktok.com/", icon: <FaTiktok /> },
  { name: "Youtube", href: "https://youtube.com/", icon: <FaYoutube /> },
];

export { NAVBAR_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };
