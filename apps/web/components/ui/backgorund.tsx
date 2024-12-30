"use client";
import React, { memo } from "react";
import { SparklesCore } from "../ui/sparkles";

const Background = () => {
  const particleColor = () => {
    if (document.body.classList.contains("dark")) {
      return "#FFFFFF";
    } else {
      return "#000000";
    }
  };

  return (
    <div className="w-screen bg-backgorund flex flex-col items-center justify-center overflow-hidden rounded-md absolute h-screen -z-50">
      <div className="w-screen inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-screen h-screen"
          particleColor={particleColor()}
        />
      </div>
    </div>
  );
};

export default memo(Background);
