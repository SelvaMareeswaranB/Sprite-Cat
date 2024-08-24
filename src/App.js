import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [steps, setSteps] = useState(10);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [turn, setTurn] = useState(0);
  const [leftTurn, setLeftTurn] = useState(15);
  const [rightTurn, setRightTurn] = useState(15);
  const [duration, setDuration] = useState(0);
  const [visibility, setVisibility] = useState("visibility");
  const [size, setSize] = useState(100);
  const [thinkOpen, setThinkOpen] = useState(false);
  const [thinkMessage, setThinkMessage] = useState("Hmm....");
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("Hi!!");

  const [actionStack, setActionStack] = useState([]);
  const [replayIndex, setReplayIndex] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);

  const addToStack = (action) => {
    setActionStack((prevStack) => {
      const newStack = [...prevStack, action];
      setReplayIndex(newStack.length);
      return newStack;
    });
  };

  const startReplay = () => {
    setIsReplaying(true);
    setReplayIndex(actionStack.length);
  };

  const replayActions = () => {
    if (replayIndex > 0) {
      const action = actionStack[replayIndex - 1];
      switch (action.type) {
        case "MOVE":
          setPosition({
            x: action.x,
            y: action.y,
          });
          break;
        case "ROTATE_RIGHT":
          setTurn(action.degrees);
          break;
        case "ROTATE_LEFT":
          setTurn(action.degrees);
          break;
        case "SET_X":
          setPosition((prevPosition) => ({ ...prevPosition, x: action.x }));
          break;
        case "SET_Y":
          setPosition((prevPosition) => ({ ...prevPosition, y: action.y }));
          break;
        case "CHANGE_X":
          setPosition((prevPosition) => ({
            ...prevPosition,
            x: action.x,
          }));
          break;
        case "CHANGE_Y":
          setPosition((prevPosition) => ({
            ...prevPosition,
            y: action.y,
          }));
          break;

        case "GLIDE":
          setDuration(action.duration);
          setPosition({ x: action.x, y: action.y });
          break;
        case "MOVE_TO":
          setPosition({ x: action.x, y: action.y });

          break;
        case "SET_DIRECTION":
          setTurn(action.direction);
          break;
        case "ON_EDGE_BOUNCE":
          setPosition({ x: action.x, y: action.y });
          setTurn(action.turn);
          break;
        default:
          break;
      }
      setReplayIndex((prevIndex) => prevIndex - 1);
    } else {
      setIsReplaying(false);
    }
  };

  useEffect(() => {
    if (isReplaying) {
      const interval = setInterval(() => {
        replayActions();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isReplaying, replayIndex, actionStack]);

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
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
            addToStack={addToStack}
            startReplay={startReplay}
          />
          <MidArea />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea
            position={position}
            turn={turn}
            duration={duration}
            visibility={visibility}
            size={size}
            setSize={setSize}
            thinkOpen={thinkOpen}
            thinkMessage={thinkMessage}
            messageOpen={messageOpen}
            message={message}
            startReplay={startReplay}
          />
        </div>
      </div>
    </div>
  );
}
