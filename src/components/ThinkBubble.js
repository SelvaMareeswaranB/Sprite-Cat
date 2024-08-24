import React from "react";
import "./ThinkBubble.css";

const ThinkBubble = ({message}) => {
  return (
    <div id="bubble">
      <span id="text">{message}</span>
      <div id="circles">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>
    </div>
  );
};

export default ThinkBubble;
