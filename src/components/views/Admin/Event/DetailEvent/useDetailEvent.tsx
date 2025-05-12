import { ToasterContext } from "@/context/ToasterContext";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getEventById = async (id: string) => {
    const { data } = await eventServices.getEventById(id);
    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: () => getEventById(`${query.id}`),
    enabled: isReady,
  });

  const { data: defaultRegion, isPending: isPendingDefaultRegion } = useQuery({
    queryKey: ["defaultRegion"],
    queryFn: () => eventServices.getRegionById(dataEvent?.location?.region),
    enabled: !!dataEvent?.location?.region,
  });

  const updateEvent = async (payload: IEvent) => {
    const { data } = await eventServices.updateEvent(`${query.id}`, payload);

    return data.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: (payload: IEvent) => updateEvent(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchEvent();
      setToaster({
        type: "success",
        message: "Update event successfully",
      });
    },
  });

  const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

  const handleUpdateInfo = (data: IEventForm) => {
    const isFeatured =
      typeof data.isFeatured === "string"
        ? data.isFeatured.toLowerCase() === "true"
        : !!data.isFeatured;
    const isPublish =
      typeof data.isPublish === "string"
        ? data.isPublish.toLowerCase() === "true"
        : !!data.isPublish;

    const payload = {
      ...data,
      isFeatured,
      isPublish,
      startDate: data.startDate ? toDateStandard(data.startDate) : "",
      endDate: data.endDate ? toDateStandard(data.endDate) : "",
      banner: data.banner,
    };
    mutateUpdateEvent(payload);
  };

  const handleUpdateLocation = (data: IEventForm) => {
    const isOnline =
      typeof data.isOnline === "string"
        ? data.isOnline.toLowerCase() === "true"
        : !!data.isOnline;
    const payload = {
      isOnline,
      location: {
        address: data.address,
        region: data.region ? data.region : "",
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
    };
    mutateUpdateEvent(payload);
  };

  return {
    dataEvent,

    handleUpdateEvent,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    defaultRegion,
    isPendingDefaultRegion,
  };
};

export default useDetailEvent;
