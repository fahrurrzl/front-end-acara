import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import useEventDetail from "./useEventDetail";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import DescriptionTab from "./DescriptionTab";
import TicketTab from "./TicketTab";
import DetailEventCart from "@/components/views/Event/EventDetail/DetailEventCart";

const EventDetail = () => {
  const {
    dataEvent,
    dataTicket,
    cart,
    handleAddToCart,
    handleChangeQuantity,
    dataTicketInCart,
  } = useEventDetail();

  return (
    <div className="px-8 md:px-0">
      <Skeleton
        isLoaded={!!dataEvent?.name}
        className="h-5 w-full rounded-lg lg:w-1/2"
      >
        <Breadcrumbs aria-label="Breadcrumb detail event">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <section className="mt-4 lg:col-span-8">
          <Skeleton
            isLoaded={!!dataEvent?.name}
            className="mb-3 h-8 w-full rounded-lg lg:w-1/2"
          >
            <h1 className="text-xl font-semibold text-danger lg:text-2xl">
              {dataEvent?.name}
            </h1>
          </Skeleton>
          <div className="flex w-full flex-col gap-2 text-foreground-500">
            <Skeleton
              isLoaded={!!dataEvent?.name}
              className="h-6 w-full rounded-lg lg:w-1/2"
            >
              <p className="flex items-center gap-2">
                <FaClock size={18} />
                {convertTime(dataEvent?.startDate)}
                {" - "}
                {convertTime(dataEvent?.endDate)}
              </p>
            </Skeleton>
            <Skeleton
              isLoaded={!!dataEvent?.name}
              className="h-6 w-full rounded-lg lg:w-1/2"
            >
              <p className="flex items-center gap-2">
                <FaLocationDot size={20} />
                {dataEvent?.isOnline ? "Online" : "Offline"}
                {dataEvent?.isOnline ? "" : ` | ${dataEvent?.location.address}`}
              </p>
            </Skeleton>
          </div>
          <div className="mt-4">
            <Skeleton isLoaded={!!dataEvent?.banner} className="rounded-lg">
              <Image
                src={dataEvent?.banner}
                width={1920}
                height={1080}
                alt={dataEvent?.name}
                className="aspect-video w-full rounded-lg object-cover"
              />
            </Skeleton>
          </div>

          <Tabs aria-label="Tab Detail Event" className="mt-4" fullWidth>
            <Tab key="description" title="Description">
              <DescriptionTab description={dataEvent?.description} />
            </Tab>
            <Tab key="ticket" title="Ticket">
              <TicketTab
                tickets={dataTicket}
                cart={cart}
                handleAddToCart={handleAddToCart}
              />
            </Tab>
          </Tabs>
        </section>
        <section className="lg:col-span-4">
          <DetailEventCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
          />
        </section>
      </div>
    </div>
  );
};
export default EventDetail;
