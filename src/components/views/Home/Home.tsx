import HomeSlider from "./HomeSlider";
import useHome from "./useHome";

const Home = () => {
  const { dataBanners, isLoadingBanners } = useHome();

  return (
    <div>
      <HomeSlider banners={dataBanners?.data} isLoading={isLoadingBanners} />
    </div>
  );
};
export default Home;
