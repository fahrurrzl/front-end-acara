import eventServices from "@/services/event.service";
import orderService from "@/services/order.service";
import ticketService from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
  const { query } = useRouter();
  const getOrderByOrderId = async () => {
    const { data } = await orderService.getOrderByOrderId(`${query.orderId}`);
    return data.data;
  };

  const { data: dataDetailTransaction, isLoading: isLoadingDetailTransaction } =
    useQuery({
      queryKey: ["detail-transaction"],
      queryFn: getOrderByOrderId,
      enabled: !!query.orderId,
    });

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(
      `${dataDetailTransaction?.events}`,
    );
    return data.data;
  };

  const { data: dataEvent, isLoading: isLoadingDataEvent } = useQuery({
    queryKey: ["event-by-id"],
    queryFn: getEventById,
    enabled: !!dataDetailTransaction?.events,
  });

  const getTicketById = async () => {
    const { data } = await ticketService.getTicketById(
      `${dataDetailTransaction?.ticket}`,
    );
    return data.data;
  };

  const { data: dataTicket, isLoading: isLoadingDataTicket } = useQuery({
    queryKey: ["ticket-by-id"],
    queryFn: getTicketById,
    enabled: !!dataDetailTransaction?.ticket,
  });

  return {
    dataDetailTransaction,
    isLoadingDetailTransaction,
    dataEvent,
    isLoadingDataEvent,
    dataTicket,
    isLoadingDataTicket,
  };
};

export default useDetailTransaction;
