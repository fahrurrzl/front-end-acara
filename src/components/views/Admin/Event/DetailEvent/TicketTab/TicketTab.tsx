import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Fragment, Key, ReactNode, useCallback, useState } from "react";
import { IEvent } from "@/types/Event";
import useTicketTab from "./useTicketTab";
import { convertIDR } from "@/utils/currency";
import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_TICKET } from "./Ticket.constant";
import AddTicketModal from "./AddTicketModal";
import { ITicket } from "@/types/Ticket";
import DeleteTicketModal from "./DeleteTicketModal";
import UpdateTicketModal from "./UpdateTicketModal";

interface propTypes {
  onUpdate: (data: IEvent) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const CoverTab = (props: propTypes) => {
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);

  const { dataTicket, isRefetchingTicket, isPendingTicket, refetchTicket } =
    useTicketTab();

  const addTicketModal = useDisclosure();
  const detailTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return convertIDR(cellValue as number);

        case "actions":
          return (
            <DropdownAction
              onPressDetail={() => {
                setSelectedTicket(ticket as ITicket);
                detailTicketModal.onOpen();
              }}
              onPressDelete={() => {
                setSelectedTicket(ticket as ITicket);
                deleteTicketModal.onOpen();
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
    <Fragment>
      <Card className="w-full p-4">
        <CardHeader className="flex items-center justify-between">
          <div className="flex w-full flex-col items-center">
            <h1 className="w-full text-xl font-bold">Ticket Event</h1>
            <p className="w-full text-sm text-default-400">
              Manage ticket of this event
            </p>
          </div>
          <Button onPress={addTicketModal.onOpen} color="danger">
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody>
          <DataTable
            renderCell={renderCell}
            columns={COLUMN_LIST_TICKET}
            emptyContent="Ticket is empty"
            isLoading={isPendingTicket || isRefetchingTicket}
            data={dataTicket ? dataTicket : []}
            totalPages={1}
            isShowLimit={false}
            isShowSearch={false}
          />
        </CardBody>
      </Card>

      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />

      <DeleteTicketModal
        {...deleteTicketModal}
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
        refetchTicket={refetchTicket}
      />

      <UpdateTicketModal
        {...detailTicketModal}
        refetchTicket={refetchTicket}
        selectedTicket={selectedTicket}
        setSelectedTicket={setSelectedTicket}
      />
    </Fragment>
  );
};
export default CoverTab;
