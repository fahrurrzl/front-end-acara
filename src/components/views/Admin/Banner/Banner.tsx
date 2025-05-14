import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.constans";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useBanner from "./useBanner";

const Banner = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataBanners,
    isLoadingBanners,
    isRefetchingBanners,

    refetchBanners,
    selectedId,
    setSelectedId,
  } = useBanner();
  console.log(dataBanners);
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="Banner Image"
              width={300}
              height={200}
            />
          );
        case "isShow":
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
              onPressDetail={() => push(`/admin/banner/${banner._id}`)}
              onPressDelete={() => {
                setSelectedId(`${banner._id}`);
                deleteBannerModal.onOpen();
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
          columns={COLUMN_LIST_BANNER}
          emptyContent="Category is empty"
          isLoading={isLoadingBanners || isRefetchingBanners}
          data={dataBanners?.data || []}
          onClickButtonTopContent={addBannerModal.onOpen}
          totalPages={dataBanners?.pagination.totalPage}
        />
      )}
    </section>
  );
};
export default Banner;
