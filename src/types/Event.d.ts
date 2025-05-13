import { DateValue } from "@heroui/react";

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  isPublish?: boolean | string;
  isFeatured?: boolean | string;
  description?: string;
  isOnline?: boolean | string;
  banner?: string | FileList;
  location?: {
    region?: string;
    address?: string;
    coordinates?: number[];
  };
}

interface IEventForm extends IEvent {
  address?: string;
  region?: string;
  startDate?: DateValue;
  endDate?: DateValue;
  latitude?: string;
  longitude?: string;
}

interface IRegency {
  name: string;
  id: string;
}

export { IEvent, IRegency, IEventForm };
