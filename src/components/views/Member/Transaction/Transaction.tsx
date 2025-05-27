import DataTable from "@/components/ui/DataTable";
import { Chip } from "@heroui/react";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constant";
import useTransaction from "./useTransaction";
import DropdownAction from "@/components/commons/DropdownAction";
import { convertIDR } from "@/utils/currency";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useRouter } from "next/router";

const Transaction = () => {
  const { dataTransaction, isLoadingTransaction } = useTransaction();
  const { isReady, push } = useRouter();

  const { setUrl } = useChangeUrl();

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
              hideDelete
              onPressDetail={() =>
                push(`/member/transaction/${transaction.orderId}`)
              }
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
        isLoading={isLoadingTransaction}
        data={dataTransaction?.data || []}
        totalPages={dataTransaction?.pagination.totalPage}
      />
    </section>
  );
};
export default Transaction;
