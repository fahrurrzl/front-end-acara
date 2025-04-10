import { ICategory } from "@/types/Category";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm } from "@/types/Event";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    dataCategory,
  } = useInfoTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateInfo("name", `${dataEvent?.name}`);
      setValueUpdateInfo("description", `${dataEvent?.description}`);
      setValueUpdateInfo("slug", `${dataEvent?.slug}`);
      setValueUpdateInfo("category", `${dataEvent?.category}`);
      setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
      setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
      setValueUpdateInfo("isPublished", `${dataEvent?.isPublished}`);
      setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Info</h1>
        <p className="w-full text-sm text-default-400">
          Manage info of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <p className="text-sm font-medium text-default-700">Information</p>
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Controller
              name="name"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Name"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Slug"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  variant="bordered"
                  defaultSelectedKey={dataEvent?.category}
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Search category here..."
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={category._id}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
            <Controller
              name="startDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  defaultValue={toInputDate(`${dataEvent?.startDate}`)}
                  isInvalid={errorsUpdateInfo.startDate !== undefined}
                  errorMessage={errorsUpdateInfo.startDate?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
            <Controller
              name="endDate"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  defaultValue={toInputDate(`${dataEvent?.endDate}`)}
                  isInvalid={errorsUpdateInfo.endDate !== undefined}
                  errorMessage={errorsUpdateInfo.endDate?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isPublished"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  defaultSelectedKeys={[
                    dataEvent?.isPublished ? "true" : "false",
                  ]}
                  isInvalid={errorsUpdateInfo.isPublished !== undefined}
                  errorMessage={errorsUpdateInfo.isPublished?.message}
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
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isFeatured"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Featured"
                  variant="bordered"
                  defaultSelectedKeys={[
                    dataEvent?.isFeatured ? "true" : "false",
                  ]}
                  isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                  errorMessage={errorsUpdateInfo.isFeatured?.message}
                  disallowEmptySelection
                >
                  <SelectItem key="true" textValue="Yes">
                    Yes
                  </SelectItem>
                  <SelectItem key="false" textValue="No">
                    No
                  </SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Controller
              name="description"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingUpdate || !dataEvent?._id}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Change"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
export default InfoTab;
