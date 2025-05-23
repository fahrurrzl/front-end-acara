import { DELAY, EVENT_LIMIT, PAGE_DEFAULT } from "@/constants/list.constants";
import useDebounce from "@/hooks/useDebounce";
import { authServices } from "@/services/auth.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const useLandingPageLayoutNavbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const session = useSession();
  const debounce = useDebounce();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["profile", session.status === "authenticated"],
    queryFn: getProfile,
    enabled: router.isReady && session.status === "authenticated",
  });

  const getEventSearch = async () => {
    const params = `limit=${EVENT_LIMIT}&page=${PAGE_DEFAULT}&search=${search}&isPublish=true`;
    const { data } = await eventServices.getEvents(params);
    return data.data;
  };

  const {
    data: dataEventSearch,
    isLoading: isLoadingEventSearch,
    isRefetching: isRefetchingEventSearch,
  } = useQuery({
    queryKey: ["eventSearch", search],
    queryFn: getEventSearch,
    enabled: !!search,
  });

  const handleEventSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    dataProfile,
    dataEventSearch,
    isLoadingEventSearch,
    isRefetchingEventSearch,
    handleEventSearch,
    setSearch,
    search,
  };
};

export default useLandingPageLayoutNavbar;
