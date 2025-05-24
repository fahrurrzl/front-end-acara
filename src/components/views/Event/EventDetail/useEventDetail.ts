import eventServices from "@/services/event.service";
import ticketService from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEventDetail = () => {
  const router = useRouter();

  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataEvent, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["eventBySlug"],
    queryFn: getEventBySlug,
    enabled: router.isReady,
  });

  const getTicketByEvent = async () => {
    const { data } = await ticketService.getTicketByEvent(`${dataEvent?._id}`);
    return data.data;
  };

  const { data: dataTicket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["ticketByEvent"],
    queryFn: getTicketByEvent,
    enabled: router.isReady && !!dataEvent?._id,
  });

  return {
    dataEvent,
    isLoadingEvent,
    dataTicket,
    isLoadingTicket,
  };
};

export default useEventDetail;
