import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import useLocationTab from "./useLocationTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEventForm, IRegency } from "@/types/Event";

interface PropTypes {
  dataLocation: IEventForm;
  defaultRegion: string;
  isPendingDefaultRegion: boolean;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const LocationTab = (props: PropTypes) => {
  const {
    dataLocation,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
    defaultRegion,
    isPendingDefaultRegion,
  } = props;
  const {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    resetUpdateLocation,
    dataRegion,
    handleSearchRegency,
    searchRegency,
  } = useLocationTab();

  useEffect(() => {
    if (dataLocation) {
      resetUpdateLocation({
        address: `${dataLocation?.location?.address}`,
        isOnline: `${dataLocation?.isOnline}`,
        region: `${dataLocation?.location?.region}`,
        latitude: `${dataLocation?.location?.coordinates?.[0]}`,
        longitude: `${dataLocation?.location?.coordinates?.[1]}`,
      });
    }
  }, [dataLocation]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdate]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Location Info</h1>
        <p className="w-full text-sm text-default-400">
          Manage location of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <p className="text-sm font-medium text-default-700">Location</p>

          <Skeleton isLoaded={!!dataLocation} className="rounded-lg">
            <Controller
              name="isOnline"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Online / Offline"
                  variant="bordered"
                  defaultSelectedKeys={[
                    dataLocation?.isOnline ? "true" : "false",
                  ]}
                  isInvalid={errorsUpdateLocation.isOnline !== undefined}
                  errorMessage={errorsUpdateLocation.isOnline?.message}
                  disallowEmptySelection
                >
                  <SelectItem key="true" textValue="Online">
                    Online
                  </SelectItem>
                  <SelectItem key="false" textValue="Offline">
                    Offline
                  </SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={
              !!dataLocation?.location?.region && !isPendingDefaultRegion
            }
            className="rounded-lg"
          >
            {!isPendingDefaultRegion ? (
              <Controller
                name="region"
                control={controlUpdateLocation}
                render={({ field: { onChange, ...field } }) => (
                  <Controller
                    name="region"
                    control={controlUpdateLocation}
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={
                          dataRegion?.data.data && searchRegency !== ""
                            ? dataRegion.data.data
                            : []
                        }
                        label="City"
                        variant="bordered"
                        defaultInputValue={defaultRegion}
                        onInputChange={(search) => handleSearchRegency(search)}
                        isInvalid={errorsUpdateLocation.region !== undefined}
                        errorMessage={errorsUpdateLocation.region?.message}
                        onSelectionChange={(value) => onChange(value)}
                        placeholder="Search city here..."
                      >
                        {(regency: IRegency) => (
                          <AutocompleteItem key={regency.id}>
                            {regency.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                )}
              />
            ) : (
              <div className="h-14 w-full" />
            )}
          </Skeleton>

          <Skeleton
            isLoaded={!!dataLocation?.location?.address}
            className="rounded-lg"
          >
            <Controller
              name="address"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Address"
                  variant="bordered"
                  isInvalid={errorsUpdateLocation.address !== undefined}
                  errorMessage={errorsUpdateLocation.address?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataLocation?.location?.coordinates?.[0]}
            className="rounded-lg"
          >
            <Controller
              name="latitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Latitude"
                  variant="bordered"
                  isInvalid={errorsUpdateLocation.latitude !== undefined}
                  errorMessage={errorsUpdateLocation.latitude?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataLocation?.location?.coordinates?.[1]}
            className="rounded-lg"
          >
            <Controller
              name="longitude"
              control={controlUpdateLocation}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Longitude"
                  variant="bordered"
                  isInvalid={errorsUpdateLocation.longitude !== undefined}
                  errorMessage={errorsUpdateLocation.longitude?.message}
                />
              )}
            />
          </Skeleton>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingUpdate || !dataLocation?._id}
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
export default LocationTab;
