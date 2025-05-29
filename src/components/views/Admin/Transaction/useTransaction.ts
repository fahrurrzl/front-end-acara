import useChangeUrl from "@/hooks/useChangeUrl";
import orderService from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useAdminTransaction = () => {
  const router = useRouter();
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    if (router.isReady) setIsClientReady(true);
  }, [router.isReady]);

  const getOrders = async () => {
    const { data } = await orderService.getOrders(
      `limit?${currentLimit}&page=${currentPage}`,
    );
    return data;
  };

  const {
    data: dataOrders,
    isLoading: isLoadingDataOrders,
    refetch: refetchTransaction,
  } = useQuery({
    queryKey: ["orders", currentLimit, currentPage],
    queryFn: getOrders,
    enabled: router.isReady,
  });

  return {
    dataOrders,
    isLoadingDataOrders,
    refetchTransaction,
    isClientReady,
  };
};

export default useAdminTransaction;
