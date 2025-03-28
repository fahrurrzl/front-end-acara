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
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, refetchCategory } = props;

  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    handleUploadIcon,
    handleDeleteIcon,
    isPendingDeleteFile,
    isPendingAddCategory,
    isSuccessAddCategory,
    isPendingUploadFile,
    preview,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessAddCategory]);

  const disabledSubmit =
    isPendingAddCategory || isPendingUploadFile || isPendingDeleteFile;

  return (
    <Modal isOpen={isOpen} placement="center" scrollBehavior="inside">
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
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

              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteIcon(onChange)}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isDeleting={isPendingDeleteFile}
                    isUploading={isPendingUploadFile}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    preview={typeof preview === "string" ? preview : ""}
                    isDroppable
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              color="danger"
              onPress={onClose}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>

            <Button color="danger" type="submit" disabled={disabledSubmit}>
              {isPendingAddCategory ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddCategoryModal;
