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
  onPressDelete: () => void;
}

const DropdownAction = (props: PropTypes) => {
  const { onPressDetail, onPressDelete } = props;

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
        <DropdownItem
          key="delete-category-button"
          className="text-danger-500"
          onPress={onPressDelete}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default DropdownAction;
