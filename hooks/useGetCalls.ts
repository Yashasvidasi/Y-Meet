import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setcalls] = useState<Call[]>([]);
  const client = useStreamVideoClient();
  const [isLoading, setisLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const loadcalls = async () => {
      if (!client || !user?.id) return;

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });
        setcalls(calls);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoading(false);
      }
    };
    loadcalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedcalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });
  const upcomingcalls = calls.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  return {
    endedcalls,
    upcomingcalls,
    recordingstape: calls,
    isLoading,
  };
};
