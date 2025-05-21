import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import { convertTime } from "@/utils/date";
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface PropTypes {
  event?: IEvent;
  className?: string;
  isLoading?: boolean;
}
const CardEvent = (props: PropTypes) => {
  const { event, className, isLoading } = props;

  return (
    <Fragment>
      {!isLoading ? (
        <Card
          shadow="sm"
          className={cn(className, "group cursor-pointer rounded-lg")}
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
              className="aspect-video w-full rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
            />
          </CardBody>
          <CardFooter className="flex flex-col items-start gap-2">
            <h2 className="line-clamp-1 text-xl font-bold text-danger">
              {event?.name}
            </h2>
            <p className="line-clamp-2 text-default-700">
              {event?.description}
            </p>
            <p className="text-foreground-500">
              {convertTime(event?.startDate as string)}
            </p>
          </CardFooter>
        </Card>
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
