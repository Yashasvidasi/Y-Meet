"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./button";

const MeetingSetup = ({
  handlecomplete,
}: {
  handlecomplete: (value: boolean) => void;
}) => {
  const [iscamtoggle, setiscamtoggle] = useState(true);
  const [ismictoggle, setmictoggle] = useState(true);
  const call = useCall();
  if (!call) {
    throw new Error("usecall must be within stream call component");
  }
  useEffect(() => {
    if (iscamtoggle) call?.camera.disable();
    else call?.camera.enable();
    if (ismictoggle) call?.microphone.disable();
    else call?.microphone.enable();
  }, [iscamtoggle, ismictoggle, call?.camera, call?.microphone]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <div className="w-[calc(100vh-300px)] flex flex-row justify-center">
        <VideoPreview />
      </div>

      <div className="flex h-16 items-center justify-center gap-6">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={iscamtoggle}
            onChange={(e) => {
              setiscamtoggle(e.target.checked);
              console.log(e.target.checked);
            }}
          />
          <p>Join with Camera Off</p>
        </label>
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={ismictoggle}
            onChange={(e) => {
              setmictoggle(e.target.checked);
              console.log(e.target.checked);
            }}
          />
          <p>Join with Mic Off</p>
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          handlecomplete(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
