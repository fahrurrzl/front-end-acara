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
import { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constans";
import { LIMIT_LISTS } from "@/constants/list.constants";

const Category = () => {
  const { push } = useRouter();
  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={100} />
          );
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
      <DataTable
        renderCell={renderCell}
        buttonTopContentLabel="Create New Category"
        columns={COLUMN_LIST_CATEGORY}
        emptyContent="Category is empty"
        data={[
          {
            _id: "123",
            name: "Category 1",
            description: "Category 1 description",
            icon: "/images/general/logo.svg",
          },
        ]}
        onChangeSearch={() => {}}
        onClearSearch={() => {}}
        onClickButtonTopContent={() => {}}
        currentPage={1}
        limit={LIMIT_LISTS[0].label}
        totalPages={2}
        onChangeLimit={() => {}}
        onChangePage={() => {}}
      />
    </section>
  );
};
export default Category;
