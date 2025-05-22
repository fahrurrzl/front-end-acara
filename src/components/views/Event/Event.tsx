import { IEvent } from "@/types/Event";
import useEvent from "./useEvent";
import CardEvent from "@/components/ui/CardEvent";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";
import { useRouter } from "next/router";
import EventFooter from "./EventFooter";
import EventFilter from "./EventFilter";
import NoData from "@/components/ui/NoData";

const Event = () => {
  const router = useRouter();
  const { dataEvents, isLoadingEvents, isRefetchingEvents } = useEvent();
  const { setUrlExplore } = useChangeUrl();

  useEffect(() => {
    if (router.isReady) {
      setUrlExplore();
    }
  }, [router.isReady]);

  return (
    <section className="flex flex-col gap-2 lg:flex-row">
      <div className="w-full lg:w-80">
        <EventFilter />
      </div>
      <div className="min-h-[70vh] w-full flex-1 px-2 lg:w-fit lg:px-0">
        {dataEvents?.data.length < 1 &&
          !isLoadingEvents &&
          !isRefetchingEvents && <NoData />}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {!isLoadingEvents && !isRefetchingEvents
            ? dataEvents?.data.map((event: IEvent) => (
                <CardEvent key={event?._id} event={event} />
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <CardEvent key={index} isLoading={true} />
              ))}
        </div>

        <EventFooter totalPages={dataEvents?.pagination.totalPage} />
      </div>
    </section>
  );
};
export default Event;
