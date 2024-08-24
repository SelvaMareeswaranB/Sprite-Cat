import React from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ position, turn, duration, visibility,size,thinkOpen,thinkMessage,messageOpen,message }) {
  return (
    <div
      className="flex items-center justify-center h-full p-2 w-full"
      id="spriteContainer"
    >
      <CatSprite
        position={position}
        turn={turn}
        duration={duration}
        visibility={visibility}
        size={size}
        thinkOpen={thinkOpen}
        thinkMessage={thinkMessage}
        messageOpen={messageOpen}
        message={message}
      />
    </div>
  );
}
