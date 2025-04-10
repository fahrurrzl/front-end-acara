import { DateValue } from "@heroui/react";

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  isPublished?: boolean | string;
  isFeatured?: boolean | string;
  description?: string;
  isOnline?: boolean | string;
  banner?: string | FileList;
  location?: {
    region?: string;
    coordinates?: number[];
  };
}

interface IEventForm extends IEvent {
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
