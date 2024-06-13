"use client";

import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./homecard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "./input";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calldetails, setcalldetails] = useState<Call>();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    desc: "",
    link: "",
  });
  const createMeeting = async () => {
    if (!client || !user) return;
    if (!values.dateTime) {
      toast({
        title: "please select Date and time",
      });
      return;
    }
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.desc || "instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setcalldetails(call);

      if (!values.desc) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting Created", duration: 1000 });
    } catch (error) {
      console.log("errror");
      toast({
        title: "Something Went Wrong",
      });
    }
  };
  const [MeetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calldetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        desc="Start a Instatn Meeting"
        handleclick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        desc="Plan Your Meeting"
        handleclick={() => setMeetingState("isScheduleMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recording"
        desc="Check Out Your Recording"
        handleclick={() => router.push("/Recordings")}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        desc="Via Invitation Link"
        handleclick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-1"
      />
      {!calldetails ? (
        <MeetingModal
          isOpen={MeetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-center"
          desc="Schedule Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Add a Description
            </label>
            <Textarea
              className="bg-dark-3 border-none focus-visible:ring-1 focus-visible:ring-offset-0"
              onChange={(e) => {
                setvalues({ ...values, desc: e.target.value });
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => {
                setvalues({ ...values, dateTime: date! });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={MeetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          desc="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
              duration: 900,
            });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}
      <MeetingModal
        isOpen={MeetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start instant meeting"
        className="text-center"
        desc="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={MeetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Enter Link Here"
        className="text-center"
        desc="Join Meeting"
        handleClick={() => {
          router.push(values.link);
          toast({
            title: "Joing Room...",
            duration: 900,
          });
        }}
      >
        <Input
          className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Paste Link Here"
          onChange={(e) => {
            setvalues({ ...values, link: e.target.value });
          }}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
