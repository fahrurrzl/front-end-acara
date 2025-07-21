import ticketService from "@/services/ticket.service";
import { IEvent } from "@/types/Event";
import { ITicket } from "@/types/Ticket";
import { cn } from "@/utils/cn";
import { convertIDR } from "@/utils/currency";
import { convertTime } from "@/utils/date";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { IoCalendarSharp } from "react-icons/io5";

interface PropTypes {
  event?: IEvent;
  className?: string;
  isLoading?: boolean;
}
const CardEvent = (props: PropTypes) => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isTicketLoading, setIsTicketLoading] = useState(false);

  const { event, className, isLoading } = props;

  useEffect(() => {
    const fetchTickets = async () => {
      if (!event?._id) return;
      setIsTicketLoading(true);
      try {
        const { data } = await ticketService.getTicketByEvent(event?._id);
        setTickets(data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsTicketLoading(false);
      }
    };

    fetchTickets();
  }, [event?._id]);

  return (
    <Fragment>
      {!isLoading ? (
        event?.startDate && new Date(event?.startDate) > new Date() ? (
          <Card
            shadow="sm"
            className={cn(className, "group cursor-pointer rounded-sm")}
            isPressable
            as={Link}
            href={`/event/${event?.slug}`}
          >
            <CardBody>
              <Image
                src={event?.banner as string}
                alt="cover"
                width={1920}
                height={1080}
                className="aspect-video w-full rounded-sm object-cover transition-all duration-300 group-hover:scale-105 lg:aspect-square"
              />
            </CardBody>
            <CardFooter className="flex flex-col items-start gap-2">
              <h2 className="line-clamp-1 text-xl font-bold text-danger">
                {event?.name}
              </h2>
              <p className="flex items-center gap-2 text-sm">
                <IoCalendarSharp size={16} className="hidden lg:block" />
                {convertTime(event?.startDate as string)}
              </p>
              <p className="text-foreground-500">{event?.location?.address}</p>
              <div className="flex w-full items-center justify-between gap-2 border-t pt-3 text-sm">
                <p className="text-foreground-500">Start From</p>
                {isTicketLoading ? (
                  <Skeleton className="h-4 w-1/3 rounded-lg" />
                ) : (
                  <p className="font-bold">
                    {convertIDR(tickets[0]?.price as number)}
                  </p>
                )}
              </div>
            </CardFooter>
          </Card>
        ) : null
      ) : (
        <Card shadow="sm" className="rounded-lg">
          <CardBody>
            <Skeleton className="aspect-video w-full rounded-lg" />
          </CardBody>
          <CardFooter className="flex flex-col items-start gap-2">
            <Skeleton className="h-4 w-2/3 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </CardFooter>
        </Card>
      )}
    </Fragment>
  );
};
export default CardEvent;
