import { IBanner } from "@/types/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { Skeleton } from "@heroui/react";

import "swiper/css";
import "swiper/css/pagination";

interface PropTypes {
  banners: IBanner[];
  isLoading: boolean;
}

const HomeSlider = (props: PropTypes) => {
  const { banners, isLoading } = props;

  return (
    <div className="mx-6 mb-6 h-[25vw] lg:mx-0 lg:mb-16">
      {!isLoading ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {banners.map(
            (banner: IBanner) =>
              banner?.isShow && (
                <SwiperSlide key={banner?._id}>
                  <Image
                    src={`${banner?.image}`}
                    alt={`${banner?.name}`}
                    width={1920}
                    height={1080}
                    className="h-[80%] w-full rounded-xl object-cover lg:h-[90%]"
                  />
                </SwiperSlide>
              ),
          )}
        </Swiper>
      ) : (
        <Skeleton className="h-[80%] w-full rounded-xl object-cover lg:h-[90%]" />
      )}
    </div>
  );
};
export default HomeSlider;
