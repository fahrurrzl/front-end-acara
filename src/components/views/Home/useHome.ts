import {
  BANNER_LIMIT,
  CATEGORY_LIMIT,
  EVENT_LIMIT,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import bannerServices from "@/services/banner.service";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
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

  const eventParams = `limit=${EVENT_LIMIT}&page=${PAGE_DEFAULT}&isPublished=true`;
  const categoryParams = `limit=${CATEGORY_LIMIT}&page=${PAGE_DEFAULT}`;

  const getFeaturedEvents = async (params: string) => {
    const { data } = await eventServices.getEvents(params);
    return data;
  };

  const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
    useQuery({
      queryKey: ["featuredEvents"],
      queryFn: () => getFeaturedEvents(`${eventParams}&isFeatured=true`),
    });

  const getLatestEvents = async (params: string) => {
    const { data } = await eventServices.getEvents(params);
    return data;
  };

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["latestEvents"],
      queryFn: () => getLatestEvents(`${eventParams}`),
    },
  );

  const getCategories = async (params: string) => {
    const { data } = await categoryServices.getCategories(params);
    return data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(`${categoryParams}`),
  });

  return {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  };
};

export default useHome;
