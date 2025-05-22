import { ICategory } from "@/types/Category";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useEventFilter from "./useEventFilter";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useEffect } from "react";

const EventFilter = () => {
  const {
    control,
    dataCategories,
    isLoadingCategories,
    isSuccessGetCategories,
    setValue,
    reset,
  } = useEventFilter();
  const {
    handleChangeCategory,
    currentCategory,
    currentIsOnline,
    currentIsFeatured,
    handleChangeIsOnline,
    handleChangeIsFeatured,
  } = useChangeUrl();

  useEffect(() => {
    if (typeof currentIsOnline === "boolean") {
      setValue("isOnline", `${currentIsOnline}`);
    }

    if (currentCategory !== "") {
      setValue("category", `${currentCategory}`);
      setValue("isFeatured", `${currentIsFeatured}`);
    }
  }, [isSuccessGetCategories]);

  return (
    <div className="h-fit w-full rounded-xl border p-4 lg:sticky lg:top-20">
      <h2 className="mb-2 text-lg font-bold">Filter</h2>
      <div className="flex flex-col gap-2">
        {isSuccessGetCategories ? (
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <Autocomplete
                {...field}
                defaultItems={dataCategories?.data || []}
                label="Category"
                variant="bordered"
                defaultSelectedKey={currentCategory as string}
                isLoading={isLoadingCategories}
                onSelectionChange={(value) => {
                  onChange(value);
                  handleChangeCategory(value !== null ? `${value}` : "");
                }}
                placeholder="Search category here..."
              >
                {(category: ICategory) => (
                  <AutocompleteItem key={category._id}>
                    {category.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
        ) : (
          <Skeleton className="h-14 w-full rounded-lg" />
        )}

        <Controller
          name="isOnline"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="Online / Offline"
              variant="bordered"
              disallowEmptySelection
              selectedKeys={[`${currentIsOnline}`]}
              onChange={(e) => handleChangeIsOnline(`${e.target.value}`)}
            >
              <SelectItem key="true">Online</SelectItem>
              <SelectItem key="false">Offline</SelectItem>
            </Select>
          )}
        />

        <Controller
          name="isFeatured"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="Featured"
              variant="bordered"
              disallowEmptySelection
              selectedKeys={[`${currentIsFeatured}`]}
              onChange={(e) => handleChangeIsFeatured(e.target.value)}
            >
              <SelectItem key="true">Yes</SelectItem>
              <SelectItem key="false">No</SelectItem>
            </Select>
          )}
        />
      </div>
    </div>
  );
};
export default EventFilter;
