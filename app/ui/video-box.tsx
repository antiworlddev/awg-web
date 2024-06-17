"use client";

import useWindowSize from "@/hooks/useWindowSize";
import YouTube, { YouTubeProps } from "react-youtube";
import React, { useState, useEffect } from "react";

export default function VideoBox({ videoId }: { videoId: string }) {
  const { width } = useWindowSize();
  const [opts, setOpts] = useState<YouTubeProps["opts"] | null>(null);

  useEffect(() => {
    let videoWidth = "640";
    let videoHeight = "360";

    if (width && width < 640) {
      videoWidth = "320";
      videoHeight = "180";
    } else if (width && width < 1024) {
      videoWidth = "480";
      videoHeight = "270";
    }

    setOpts({
      height: videoHeight,
      width: videoWidth,
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    });
  }, [width]);

  // Render nothing if opts are not yet set
  if (!opts) {
    return null;
  }

  return <YouTube videoId={videoId} opts={opts} className="w-full h-auto" />;
}
