import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constans";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/InputFile";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    setURL,
    dataCategory,
    isLoadingCategory,
    currentPage,
    currentLimit,
    isRefetchingCategory,
    handleChangeLimit,
    handleChangePage,
    handleChangeSearch,
    handleClearSearch,
  } = useCategory();

  useEffect(() => {
    setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={100} />
        //   );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-button"
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key="delete-category-button"
                  className="text-danger-500"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );
  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          renderCell={renderCell}
          buttonTopContentLabel="Create New Category"
          columns={COLUMN_LIST_CATEGORY}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          data={dataCategory?.data || []}
          onChangeSearch={handleChangeSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={() => {}}
          currentPage={Number(currentPage)}
          limit={String(currentLimit)}
          totalPages={dataCategory?.pagination.totalPage}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
        />
      )}
      <InputFile name="test" isDroppable />
    </section>
  );
};
export default Category;
