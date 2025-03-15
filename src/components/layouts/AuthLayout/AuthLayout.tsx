import PageHead from "@/components/commons/PageHead";

interface PropTypes {
  title?: string;
  children: React.ReactNode;
}

export default function AuthLayout(props: PropTypes) {
  const { title, children } = props;

  return (
    <>
      <PageHead title={title} />
      <section className="mx-auto max-w-screen-2xl p-6 2xl:container">
        {children}
      </section>
    </>
  );
}
