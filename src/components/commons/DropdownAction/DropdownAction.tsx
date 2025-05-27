import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
  onPressDetail: () => void;
  onPressDelete?: () => void;
  hideDelete?: boolean;
}

const DropdownAction = (props: PropTypes) => {
  const { onPressDetail, onPressDelete, hideDelete } = props;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <CiMenuKebab className="text-default-700" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="detail-category-button" onPress={onPressDetail}>
          Detail
        </DropdownItem>
        {!hideDelete ? (
          <DropdownItem
            key="delete-category-button"
            className="text-danger-500"
            onPress={onPressDelete}
          >
            Delete
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </Dropdown>
  );
};
export default DropdownAction;
