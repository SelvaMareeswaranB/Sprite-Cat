import React, { useState } from "react";
import SharedInput from "./SharedInput";
import MessageInput from "./MessageInput";

export default function Looks({
  setVisibility,
  setSize,
  thinkOpen,
  setThinkOpen,
  thinkMessage,
  setThinkMessage,
  messageOpen,
  setMessageOpen,
  message,
  setMessage,
  addToStack,
}) {
  const [localSize, setLocalSize] = useState({
    changeSize: 10,
    setsize: 100,
  });

  function handleSize(key, value) {
    setLocalSize((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleChangeSize(e) {
    handleSize("changeSize", e.target.value);
  }

  function handleSetSize(e) {
    handleSize("setsize", e.target.value);
  }

  function show() {
    setVisibility("visible");
    addToStack({ type: "SHOW" });
  }

  function hide() {
    setVisibility("hidden");
    addToStack({ type: "HIDE" });
  }

  function handleSetClick(e) {
    if (e.target.closest("input")) {
      return;
    }
    setSize((prevSize) => prevSize * (localSize.setsize / 100));
    addToStack({ type: "SET_SIZE", size: localSize.setsize });
  }

  function handleChangeClick(e) {
    if (e.target.closest("input")) {
      return;
    }
    setSize((prev) => prev + localSize.changeSize);
    addToStack({ type: "SET_SIZE", size: localSize.changeSize });
  }

  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  function handleThinkChange(e) {
    setThinkMessage(e.target.value);
  }

  function handleMessageClick(e) {
    if (e.target.closest("input")) {
      return;
    }
    setThinkOpen(false);
    setMessageOpen(true);
    addToStack({ type: "MESSAGE", message });
  }

  function handleThinkClick(e) {
    if (e.target.closest("input")) {
      return;
    }
    setThinkOpen(true);
    setMessageOpen(false);
    addToStack({ type: "THINK", message: thinkMessage });
  }

  return (
    <>
      <div className="font-bold">{"Looks"}</div>
      <div
        className="flex flex-row items-center flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleMessageClick}
      >
        {"Say"}
        <MessageInput value={message} handleChange={handleMessageChange} />
      </div>
      <div
        className="flex flex-row items-center flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleThinkClick}
      >
        {"Think"}
        <MessageInput value={thinkMessage} handleChange={handleThinkChange} />
      </div>
      <div
        className="flex flex-row items-center flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={show}
      >
        {"show"}
      </div>
      <div
        className="flex flex-row items-center flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={hide}
      >
        {"hide"}
      </div>
      <div
        className="flex flex-row items-center flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleChangeClick}
      >
        {"Change Size By "}
        <SharedInput
          value={localSize.changeSize}
          handleChange={handleChangeSize}
        />
      </div>
      <div
        className="flex flex-row items-center flex-wrap bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleSetClick}
      >
        {"set Size to "}
        <SharedInput value={localSize.setsize} handleChange={handleSetSize} />
        {" %"}
      </div>
    </>
  );
}
