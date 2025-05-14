import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ITicket } from "@/types/Ticket";
import useUpdateTicketModal from "./useUpdateTicketModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
  selectedTicket: ITicket | null;
  setSelectedTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const UpdateTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTicket,
    selectedTicket,
    setSelectedTicket,
  } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleUpdateTicket,
    isPendingUpdateTicket,
    isSuccessUpdateTicket,
    setValueUpdateTicket,
  } = useUpdateTicketModal(`${selectedTicket?._id}`);

  useEffect(() => {
    if (isSuccessUpdateTicket) {
      onClose();
      refetchTicket();
      setSelectedTicket(null);
    }
  }, [isSuccessUpdateTicket]);

  useEffect(() => {
    if (selectedTicket) {
      setValueUpdateTicket("name", `${selectedTicket.name}`);
      setValueUpdateTicket("description", `${selectedTicket.description}`);
      setValueUpdateTicket("price", `${selectedTicket.price}`);
      setValueUpdateTicket("quantity", `${selectedTicket.quantity}`);
    }
  }, [selectedTicket]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      onClose={() => {
        onClose();
        setSelectedTicket(null);
      }}
    >
      <ModalContent className="flex max-h-[90vh] flex-col overflow-hidden">
        <form
          onSubmit={handleSubmitForm(handleUpdateTicket)}
          className="flex h-full flex-col"
        >
          <ModalHeader>Update Ticket</ModalHeader>

          <ModalBody className="flex-grow overflow-y-auto">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Name"
                    variant="bordered"
                    autoFocus
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Price"
                    variant="bordered"
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message}
                  />
                )}
              />

              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    label="Quantity"
                    variant="bordered"
                    isInvalid={!!errors.quantity}
                    errorMessage={errors.quantity?.message}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="flat"
              color="danger"
              type="button"
              disabled={isPendingUpdateTicket}
              onPress={() => {
                onClose();
                setSelectedTicket(null);
              }}
            >
              Cancel
            </Button>

            <Button
              color="danger"
              type="submit"
              disabled={isPendingUpdateTicket}
            >
              {isPendingUpdateTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Ticket"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTicketModal;
