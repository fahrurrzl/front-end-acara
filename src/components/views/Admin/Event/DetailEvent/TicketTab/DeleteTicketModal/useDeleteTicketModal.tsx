import { ToasterContext } from "@/context/ToasterContext";
import ticketService from "@/services/ticket.service";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";

const useDeleteTicketModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteTicket = async (id: string) => {
    const res = await ticketService.deleteTicket(id);
    return res;
  };

  const {
    mutate: mutateDeleteTicket,
    isPending: isPendingMutateDeleteTicket,
    isSuccess: isSuccessMutateDeleteTicket,
  } = useMutation({
    mutationFn: deleteTicket,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete ticket successfully",
      });
    },
  });

  return {
    mutateDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessMutateDeleteTicket,
  };
};

export default useDeleteTicketModal;
