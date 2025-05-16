import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanners: () => void;
}

const AddBannerModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchBanners } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddBanner,
    isPendingAddBanner,
    isSuccessAddBanner,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    preview,
    handleOnClose,
  } = useAddBannerModal();

  const disabledSubmit =
    isPendingAddBanner ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  useEffect(() => {
    if (isSuccessAddBanner) {
      onClose();
      refetchBanners();
    }
  }, [isSuccessAddBanner]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
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
                name="isShow"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={errors.isShow !== undefined}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" textValue="Publish">
                      Publish
                    </SelectItem>
                    <SelectItem key="false" textValue="Draft">
                      Draft
                    </SelectItem>
                  </Select>
                )}
              />

              <p className="text-sm font-bold">Image</p>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteImage(onChange)}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
                    isDroppable
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              color="danger"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>

            <Button color="danger" type="submit" disabled={disabledSubmit}>
              {isPendingAddBanner ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
export default AddBannerModal;
