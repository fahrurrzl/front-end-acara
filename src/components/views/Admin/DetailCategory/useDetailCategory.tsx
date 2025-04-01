import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();
  console.log(query);

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getCategoryById(id);
    return data.data;
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategoryById(`${query.id}`),
    enabled: isReady,
  });

  return {
    dataCategory,
  };
};

export default useDetailCategory;
