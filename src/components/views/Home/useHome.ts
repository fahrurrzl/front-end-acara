import { BANNER_LIMIT, PAGE_DEFAULT } from "@/constants/list.constants";
import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getBanners = async () => {
    const params = `limit=${BANNER_LIMIT}&page=${PAGE_DEFAULT}`;
    const { data } = await bannerServices.getBanners(params);
    return data;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });
  return { dataBanners, isLoadingBanners };
};

export default useHome;
