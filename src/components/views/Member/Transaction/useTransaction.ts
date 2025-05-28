import useChangeUrl from "@/hooks/useChangeUrl";
import orderService from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
  const query = useRouter();
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();

  const getTransactionMember = async () => {
    const { data } = await orderService.getOrderHistory(
      `limit=${currentLimit}&page=${currentPage}`,
    );
    return data;
  };

  const { data: dataTransaction, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ["transactions", currentPage, currentLimit],
    queryFn: getTransactionMember,
    enabled: query.isReady,
  });

  return {
    dataTransaction,
    isLoadingTransaction,
  };
};

export default useTransaction;
