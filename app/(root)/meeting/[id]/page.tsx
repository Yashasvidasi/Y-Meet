"use client";
import MeetingRoom from "@/components/ui/MeetingRoom";
import MeetingSetup from "@/components/ui/MeetingSetup";
import Loader from "@/components/ui/loader";
import { useGetByCallId } from "@/hooks/useGetByCallId";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [issetupcomplete, setissetupcomplete] = useState(false);

  const { call, isCallLoading } = useGetByCallId(id);
  console.log(call, isCallLoading);
  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!issetupcomplete ? (
            <MeetingSetup handlecomplete={setissetupcomplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
