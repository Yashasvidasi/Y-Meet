"use client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { LayoutList, User, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./loader";

type calllayouts = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const ispersonalroom = !!searchParams.get("personal");
  const [layout, setlayout] = useState<calllayouts>("speaker-left");
  const [showparticipants, setshowparticipants] = useState(false);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <AnimatePresence>
          {showparticipants && (
            <motion.div
              className="absolute h-[calc(100vh-86px)] ml-5 bg-dark-1 p-5 rounded-l-3xl right-0"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              <CallParticipantsList
                onClose={() => setshowparticipants(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-3 flex-wrap mb-3">
        <CallControls
          onLeave={() => {
            router.push("/");
          }}
        />
        <DropdownMenu>
          <div className="flex flex-center">
            {" "}
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            <DropdownMenuLabel className="text-md text-center font-bold">
              Layout
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Grid", "Speaker-Right", "Speaker-Left"].map((item, index) => {
              return (
                <div key={index}>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-dark-2"
                    onClick={() => {
                      setlayout(item.toLowerCase() as calllayouts);
                    }}
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-dark-1" />
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button
          onClick={() => {
            setshowparticipants((prev) => !prev);
          }}
        >
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users className="text-white" size={20} />
          </div>
        </button>
        {!ispersonalroom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
