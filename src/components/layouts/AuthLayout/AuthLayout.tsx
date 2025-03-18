import PageHead from "@/components/commons/PageHead";
import { Fragment } from "react";

interface PropTypes {
  title?: string;
  children: React.ReactNode;
}

export default function AuthLayout(props: PropTypes) {
  const { title, children } = props;

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10">
      <PageHead title={title} />
      <section className="mx-auto max-w-screen-2xl p-6 2xl:container">
        {children}
      </section>
    </div>
  );
}
