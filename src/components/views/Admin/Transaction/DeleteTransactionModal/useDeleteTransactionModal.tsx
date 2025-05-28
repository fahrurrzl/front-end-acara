import { ToasterContext } from "@/context/ToasterContext";
import orderService from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteTransactionModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteTransaction = async (orderId: string) => {
    const res = await orderService.deleteOrder(orderId);
    return res;
  };

  const {
    mutate: mutateDeleteTransaction,
    isPending: isPendingMutateDeleteTransaction,
    isSuccess: isSuccessMutateDeleteTransaction,
  } = useMutation({
    mutationFn: deleteTransaction,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete transaction successfully",
      });
    },
  });

  return {
    mutateDeleteTransaction,
    isPendingMutateDeleteTransaction,
    isSuccessMutateDeleteTransaction,
  };
};

export default useDeleteTransactionModal;
