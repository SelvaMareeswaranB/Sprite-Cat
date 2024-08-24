import React from "react";
import Icon from "./Icon";
import MoveActions from "./MoveActions";
import Looks from "./Looks";

export default function Sidebar({
  position,
  setPosition,
  turn,
  setTurn,
  steps,
  setSteps,
  leftTurn,
  setLeftTurn,
  rightTurn,
  setRightTurn,
  duration,
  setDuration,
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
  startReplay,
  addToStack,
}) {
  return (
    <>
      <div className="w-80 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={startReplay}
        >
          Start Replay
        </button>
        <div className="font-bold"> {"Events"} </div>
        <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"When "}
          <Icon name="flag" size={15} className="text-green-600 mx-2" />
          {"clicked"}
        </div>
        <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
          {"When this sprite clicked"}
        </div>
        <MoveActions
          position={position}
          setPosition={setPosition}
          turn={turn}
          setTurn={setTurn}
          steps={steps}
          setSteps={setSteps}
          leftTurn={leftTurn}
          setLeftTurn={setLeftTurn}
          rightTurn={rightTurn}
          setRightTurn={setRightTurn}
          duration={duration}
          setDuration={setDuration}
          addToStack={addToStack}
        />
        <Looks
          setVisibility={setVisibility}
          setSize={setSize}
          thinkOpen={thinkOpen}
          setThinkOpen={setThinkOpen}
          thinkMessage={thinkMessage}
          setThinkMessage={setThinkMessage}
          messageOpen={messageOpen}
          setMessageOpen={setMessageOpen}
          message={message}
          setMessage={setMessage}
        />
      </div>
    </>
  );
}
