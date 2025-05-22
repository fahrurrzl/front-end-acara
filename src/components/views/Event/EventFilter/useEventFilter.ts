import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  category: yup.string(),
  isFeatured: yup.string(),
  isOnline: yup.string(),
});

const useEventFilter = () => {
  const { control, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const getCategories = async () => {
    const { data } = await categoryServices.getCategories();
    return data;
  };

  const {
    data: dataCategories,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessGetCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return {
    control,
    dataCategories,
    isLoadingCategories,
    isSuccessGetCategories,
    setValue,
    reset,
  };
};

export default useEventFilter;
