import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import EventDetail from "@/components/views/Event/EventDetail";

const EventDetailPage = () => {
  return (
    <LandingPageLayout title="Event">
      <EventDetail />
    </LandingPageLayout>
  );
};
export default EventDetailPage;
