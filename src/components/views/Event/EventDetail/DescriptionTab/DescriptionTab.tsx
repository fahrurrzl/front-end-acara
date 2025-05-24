import { Skeleton } from "@heroui/react";

interface PropTypes {
  description: string;
}

const DescriptionTab = ({ description }: PropTypes) => {
  return (
    <div>
      <Skeleton isLoaded={!!description} className="rounded-lg">
        <h2 className="mb-3 text-2xl font-semibold">About Event</h2>
        <p className="leading-relaxed text-foreground-500">{description}</p>
      </Skeleton>
    </div>
  );
};
export default DescriptionTab;
