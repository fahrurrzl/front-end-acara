import { Skeleton } from "@heroui/react";
import HomeList from "./HomeList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
  } = useHome();

  return (
    <div>
      <HomeSlider banners={dataBanners?.data} isLoading={isLoadingBanners} />
      <HomeList
        title="Featured Event"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingFeaturedEvents}
      />
      <Skeleton
        isLoaded={!isLoadingBanners}
        className="mx-4 mt-4 h-[24vw] rounded-lg lg:mx-0 lg:mt-8"
      >
        <Image
          src={dataBanners ? dataBanners?.data[0]?.image : ""}
          alt="Banner"
          width={1920}
          height={1080}
          className="h-[80%] w-full rounded-xl object-cover lg:h-[90%]"
        />
      </Skeleton>
      <HomeList
        title="Latest Event"
        events={dataLatestEvents?.data}
        isLoading={isLoadingLatestEvents}
      />
    </div>
  );
};
export default Home;
