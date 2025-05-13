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
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import useAddTicketModal from "./useAddTicketModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchTicket } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddTicket,
    isPendingAddTicket,
    isSuccessAddTicket,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessAddTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessAddTicket]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Ticket</ModalHeader>
          <ModalBody>
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
                    isInvalid={errors.name !== undefined}
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
                    isInvalid={errors.price !== undefined}
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
                    isInvalid={errors.quantity !== undefined}
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
                    isInvalid={errors.description !== undefined}
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
              disabled={isPendingAddTicket}
              onPress={() => onClose()}
            >
              Cancel
            </Button>

            <Button color="danger" type="submit" disabled={isPendingAddTicket}>
              {isPendingAddTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Ticket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddCategoryModal;
