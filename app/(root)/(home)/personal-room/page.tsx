"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetByCallId } from "@/hooks/useGetByCallId";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const Table = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}
      </h1>
      <h1 className="flex-wrap text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {desc}
      </h1>
    </div>
  );
};

const personal_room = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const meetingid = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingid}?personal=true`;
  const { call } = useGetByCallId(meetingid!);
  const client = useStreamVideoClient();
  const startroom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newcall = client.call("default", meetingid!);
      await newcall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingid}?personal=true`);
  };
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" desc={`${user?.username}'s meeting room`} />
        <Table title="Meeting ID" desc={meetingid!} />

        <Table title="Invite Link" desc={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startroom}>
          Start Meeting
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
              duration: 900,
            });
          }}
          className="bg-dark-4 px-4"
        >
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default personal_room;
