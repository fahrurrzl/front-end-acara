import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_BANNER } from "./Banner.constans";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import useBanner from "./useBanner";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";

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
              className="rounded-lg"
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
          buttonTopContentLabel="Create New Banner"
          columns={COLUMN_LIST_BANNER}
          emptyContent="Banner is empty"
          isLoading={isLoadingBanners || isRefetchingBanners}
          data={dataBanners?.data || []}
          onClickButtonTopContent={addBannerModal.onOpen}
          totalPages={dataBanners?.pagination.totalPage}
        />
      )}

      <AddBannerModal {...addBannerModal} refetchBanners={refetchBanners} />

      <DeleteBannerModal
        {...deleteBannerModal}
        refetchBanner={refetchBanners}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};
export default Banner;
