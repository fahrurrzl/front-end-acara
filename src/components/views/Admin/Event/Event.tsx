import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_EVENT } from "./Event.constant";
import useEvent from "./useEvent";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Event = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataEvents,
    isLoadingEvents,
    isRefetchingEvents,

    refetchEvents,
    selectedId,
    setSelectedId,
  } = useEvent();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="w-36 rounded-lg object-cover"
              src={`${cellValue}`}
              alt="banner"
              width={200}
              height={100}
            />
          );
        case "isPublish":
          return (
            <Chip
              size="sm"
              color={cellValue ? "success" : "warning"}
              variant="flat"
            >
              {cellValue ? "Published" : "Unpublished"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressDetail={() => push(`/admin/event/${event.id}`)}
              onPressDelete={() => {
                setSelectedId(event.id as string);
                deleteEventModal.onOpen();
              }}
            />
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
          columns={COLUMN_LIST_EVENT}
          emptyContent="Category is empty"
          isLoading={isLoadingEvents || isRefetchingEvents}
          data={dataEvents?.data || []}
          onClickButtonTopContent={addEventModal.onOpen}
          totalPages={dataEvents?.pagination.totalPage}
        />
      )}
    </section>
  );
};
export default Event;
