import ticketService from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTicketTab = () => {
  const { query, isReady } = useRouter();

  const getTicketByEvent = async () => {
    const res = await ticketService.getTicketByEvent(`${query.id}`);
    return res.data.data;
  };

  const {
    data: dataTicket,
    isRefetching: isRefetchingTicket,
    isPending: isPendingTicket,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: ["ticket"],
    queryFn: getTicketByEvent,
    enabled: isReady,
  });

  return {
    dataTicket,
    isRefetchingTicket,
    isPendingTicket,
    refetchTicket,
  };
};

export default useTicketTab;
