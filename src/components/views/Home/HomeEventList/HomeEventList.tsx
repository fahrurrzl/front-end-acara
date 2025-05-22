import CardEvent from "@/components/ui/CardEvent";
import { IEvent } from "@/types/Event";
import Link from "next/link";

interface PropTypes {
  title: string;
  events: IEvent[];
  isLoading: boolean;
  urlMore?: string;
}

const HomeEventList = (props: PropTypes) => {
  const { title, events, isLoading, urlMore } = props;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-6 lg:px-0">
        <h2 className="text-2xl font-bold text-danger">{title}</h2>
        <Link
          href={`${urlMore}`}
          className="font-semibold text-default-700 transition-all hover:text-default-900"
        >
          See More
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-2 px-4 py-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:px-0">
        {!isLoading
          ? events.map((event) => <CardEvent key={event?._id} event={event} />)
          : Array.from({ length: 4 }).map((_, index) => (
              <CardEvent key={index} isLoading={isLoading} />
            ))}
      </div>
    </div>
  );
};
export default HomeEventList;
