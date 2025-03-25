import { LIMIT_LISTS } from "@/constants/list.constants";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  limit: string;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  onChangePage: (page: number) => void;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onClearSearch: () => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}

const DataTable = (props: PropTypes) => {
  const {
    columns,
    data,
    emptyContent,
    buttonTopContentLabel,
    limit,
    totalPages,
    currentPage,
    isLoading,
    onChangePage,
    onChangeLimit,
    onClickButtonTopContent,
    onClearSearch,
    onChangeSearch,
    renderCell,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse justify-between gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          className="w-full sm:w-[24%]"
          placeholder="Search by name..."
          startContent={<CiSearch />}
          onClear={onClearSearch}
          onChange={onChangeSearch}
        />
        {buttonTopContentLabel && (
          <Button color="danger" onPress={onClickButtonTopContent}>
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    onClickButtonTopContent,
    onChangeSearch,
    onClearSearch,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        <Select
          className="hidden max-w-32 lg:block"
          size="md"
          selectedKeys={[limit]}
          selectionMode="single"
          onChange={onChangeLimit}
          startContent={<p className="text-small">Show:</p>}
          disallowEmptySelection
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>

        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={currentPage}
            total={totalPages}
            onChange={onChangePage}
            loop
          />
        )}
      </div>
    );
  }, [limit, currentPage, onChangeLimit, onChangePage]);

  return (
    <Table
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={
          <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner color="danger" />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default DataTable;
