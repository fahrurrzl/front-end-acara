import { Key, ReactNode, useCallback, useEffect, useState } from "react";
import useAdminTransaction from "./useTransaction";
import { convertIDR } from "@/utils/currency";
import { Chip, useDisclosure } from "@heroui/react";
import DropdownAction from "@/components/commons/DropdownAction";
import { useRouter } from "next/router";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constant";
import useChangeUrl from "@/hooks/useChangeUrl";
import DeleteTransactionModal from "./DeleteTransactionModal";

const AdminTransaction = () => {
  const [selectedId, setSelectedId] = useState("");

  const { push, isReady } = useRouter();
  const { setUrl } = useChangeUrl();
  const { dataOrders, isLoadingDataOrders, refetchTransaction } =
    useAdminTransaction();

  const deleteTransactionModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "total":
          return convertIDR(Number(cellValue));
        case "status":
          return (
            <Chip
              variant="flat"
              color={
                cellValue === "completed"
                  ? "success"
                  : cellValue === "pending"
                    ? "warning"
                    : "danger"
              }
            >
              {cellValue as string}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressDetail={() =>
                push(`/member/transaction/${transaction.orderId}`)
              }
              onPressDelete={() => {
                setSelectedId(transaction?.orderId as string);
                deleteTransactionModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <section>
      <DataTable
        renderCell={renderCell}
        columns={COLUMN_LIST_TRANSACTION}
        emptyContent="Transaction is empty"
        isLoading={isLoadingDataOrders}
        data={dataOrders?.data || []}
        totalPages={dataOrders?.pagination.totalPage}
      />

      <DeleteTransactionModal
        {...deleteTransactionModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchTransaction={refetchTransaction}
      />
    </section>
  );
};
export default AdminTransaction;
