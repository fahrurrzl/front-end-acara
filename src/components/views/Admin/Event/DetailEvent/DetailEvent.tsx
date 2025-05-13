import { Tab, Tabs } from "@heroui/react";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab";

const DetailEvent = () => {
  const {
    dataEvent,
    handleUpdateEvent,
    handleUpdateInfo,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    handleUpdateLocation,
    defaultRegion,
    isPendingDefaultRegion,
  } = useDetailEvent();
  return (
    <Tabs>
      <Tab key="cover" title="Cover">
        <CoverTab
          currentCover={dataEvent?.banner}
          onUpdate={handleUpdateEvent}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateInfo}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="location" title="Location">
        <LocationTab
          dataLocation={dataEvent}
          onUpdate={handleUpdateLocation}
          defaultRegion={defaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="ticket" title="Ticket">
        <TicketTab
          onUpdate={() => {}}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
        />
      </Tab>
    </Tabs>
  );
};
export default DetailEvent;
