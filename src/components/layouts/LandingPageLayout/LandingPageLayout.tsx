import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar";
import LandingPageLayoutFooter from "./LandingPageLayoutFooter";

interface PropLayout {
  title: string;
  children: ReactNode;
}

const LandingPageLayout = (props: PropLayout) => {
  const { title, children } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <LandingPageLayoutNavbar />
      <div className="max-w-screen-2xl py-10 2xl:container md:p-6">
        {children}
      </div>
      <LandingPageLayoutFooter />
    </Fragment>
  );
};
export default LandingPageLayout;
