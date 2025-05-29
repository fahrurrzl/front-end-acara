import useChangeUrl from "@/hooks/useChangeUrl";
import orderService from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useTransaction = () => {
  const router = useRouter();
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    if (router.isReady) setIsClientReady(true);
  }, [router.isReady]);

  const getTransactionMember = async () => {
    const { data } = await orderService.getOrderHistory(
      `limit=${currentLimit}&page=${currentPage}`,
    );
    return data;
  };

  const { data: dataTransaction, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ["transactions", currentPage, currentLimit],
    queryFn: getTransactionMember,
    enabled: router.isReady,
  });

  return {
    dataTransaction,
    isLoadingTransaction,
    isClientReady,
  };
};

export default useTransaction;
