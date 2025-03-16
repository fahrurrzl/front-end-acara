import PageHead from "@/components/commons/PageHead";
import { Fragment } from "react";

interface PropTypes {
  title?: string;
  children: React.ReactNode;
}

export default function AuthLayout(props: PropTypes) {
  const { title, children } = props;

  return (
    <Fragment>
      <PageHead title={title} />
      <section className="mx-auto max-w-screen-2xl p-6 2xl:container">
        {children}
      </section>
    </Fragment>
  );
}
