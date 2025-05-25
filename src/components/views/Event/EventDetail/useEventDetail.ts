import eventServices from "@/services/event.service";
import ticketService from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { defaultCart } from "./eventDetail.constant";

const useEventDetail = () => {
  const router = useRouter();

  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataEvent } = useQuery({
    queryKey: ["eventBySlug"],
    queryFn: getEventBySlug,
    enabled: router.isReady,
  });

  const getTicketByEvent = async () => {
    const { data } = await ticketService.getTicketByEvent(`${dataEvent?._id}`);
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["ticketByEvent"],
    queryFn: getTicketByEvent,
    enabled: router.isReady && !!dataEvent?._id,
  });

  const [cart, setCart] = useState<ICart>(defaultCart);

  // ambil data ticket yang ada di cart
  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket);
    }
  }, [dataTicket, cart]);

  // handle untuk menambahkan ticket ke cart
  const handleAddToCart = (ticket: string) => {
    setCart({
      event: dataEvent?._id as string,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  return {
    dataEvent,
    dataTicket,
    cart,
    dataTicketInCart,
    handleAddToCart,
    handleChangeQuantity,
  };
};

export default useEventDetail;
