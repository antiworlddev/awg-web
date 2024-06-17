import React from "react";
import VideoBox from "./video-box";

export default function VideoGrid({ videoIds }: { videoIds: string[] }) {
  return (
    <div className="w-full items-center justify-center flex">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {videoIds?.map((v) => (
          <VideoBox videoId={v} key={v} />
        ))}
      </div>
    </div>
  );
}
