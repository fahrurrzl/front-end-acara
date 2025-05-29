import eventServices from "@/services/event.service";
import ticketService from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { defaultCart } from "./eventDetail.constant";
import orderService from "@/services/order.service";
import { ToasterContext } from "@/context/ToasterContext";

const useEventDetail = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

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
      events: dataEvent?._id,
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

  const createOrder = async () => {
    const { data } = await orderService.createOrder(cart);
    return data.data;
  };

  const [isSnapLoaded, setIsSnapLoaded] = useState(false);

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: createOrder,
      onError(error) {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
      onSuccess(result) {
        const transactionToken = result.payment.token;

        if (
          isSnapLoaded &&
          typeof window !== "undefined" &&
          (window as any).snap
        ) {
          (window as any).snap.pay(transactionToken);
        } else {
          console.error("❌ Snap belum siap. Tidak bisa panggil snap.pay()");
        }
      },
    });

  return {
    dataEvent,
    dataTicket,
    cart,
    dataTicketInCart,
    handleAddToCart,
    handleChangeQuantity,
    mutateCreateOrder,
    isPendingCreateOrder,
    isSnapLoaded,
    setIsSnapLoaded,
  };
};

export default useEventDetail;
