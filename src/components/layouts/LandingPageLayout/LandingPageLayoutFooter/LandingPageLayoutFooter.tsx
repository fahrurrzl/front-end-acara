import Image from "next/image";
import Link from "next/link";
import { NAVBAR_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constant";

const LandingPageLayoutFooter = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 bg-slate-800 p-8 text-center lg:flex-row lg:items-start lg:gap-8 lg:p-16 lg:text-start">
      <div className="my-auto">
        <Image
          src="/images/general/logo.svg"
          alt="Logo"
          width={180}
          height={180}
          className="w-32 lg:w-40"
        />
      </div>

      <div className="flex flex-col gap-2 lg:gap-4">
        <div>
          <h2 className="text-white">Customer Service</h2>
          <Link
            href="mailto:hello@acara.co.id"
            className="text-sm text-slate-600 hover:text-white"
          >
            Hello@acara.id {" | "}
          </Link>
          <Link
            href="tel:+62821-0000-0000"
            className="text-sm text-slate-600 hover:text-white"
          >
            +62821-0000-0000
          </Link>
        </div>
        <div>
          <h2 className="text-white">Office</h2>
          <p className="text-sm text-slate-600 hover:text-white">
            Jl. Jend. Sudirman No. 1, Jakarta Pusat, 10110
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-white">Menu</h2>
        <nav className="flex flex-col">
          {NAVBAR_ITEMS.map((item) => (
            <Link
              key={`nav-footer-${item.name}`}
              href={item.href}
              className="text-sm text-slate-600 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col items-center gap-2 lg:gap-4">
        <div className="flex gap-4 lg:gap-8">
          {SOCIAL_ITEMS.map((item) => (
            <Link
              key={`social-${item.name}`}
              href={item.href}
              className="text-xl text-slate-600 hover:text-white lg:text-2xl"
            >
              {item.icon}
            </Link>
          ))}
        </div>

        <p className="text-sm text-slate-600">
          Copyright &copy; 2025 Acara. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default LandingPageLayoutFooter;
