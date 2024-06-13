"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const EndCallButton = () => {
  const { toast } = useToast();
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localparticipant = useLocalParticipant();
  const isMeetingOwner =
    localparticipant &&
    call?.state.createdBy &&
    localparticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      className="bg-red-500"
      onClick={async () => {
        toast({ title: "Ending Meet" });
        await call.endCall();

        router.push("/");

        toast({ title: "Meet Ended", duration: 1000 });
      }}
    >
      End Meeting
    </Button>
  );
};

export default EndCallButton;
