import React from "react";
import "./SpeechBubble.css";
const SpeechBubble = ({ message, position }) => {
  return (
    <div
      id="bubble"
      style={{
        left: `${position.x}`,
        top: `${position.y}`,
        position: "relative",
      }}
    >
      <span id="text">{message} </span>
      <span id="arrow_border"></span>
      <span id="arrow_inner"></span>
    </div>
  );
};

export default SpeechBubble;
