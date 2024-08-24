import React, { useState } from "react";
import Icon from "./Icon";
import SharedInput from "./SharedInput";

export default function MoveActions({
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
  addToStack, // Add this prop to receive the function
}) {
  function handlePosition(key, value) {
    setPosition((prev) => ({
      ...prev,
      [key]: value === "" ? "" : parseFloat(value) || 0,
    }));
  }

  const [xAxis, setXAxis] = useState({
    gotoX: 0,
    changeX: 10,
    setX: 0,
    glideX: 0,
  });

  function handleX(key, value) {
    setXAxis((prev) => ({
      ...prev,
      [key]: value === "" ? "" : parseFloat(value) || 0,
    }));
  }

  function handleY(key, value) {
    setYAxis((prev) => ({
      ...prev,
      [key]: value === "" ? "" : parseFloat(value) || 0,
    }));
  }

  const [yAxis, setYAxis] = useState({
    gotoY: 0,
    changeY: 10,
    setY: 0,
    glideY: 0,
  });

  const [direction, setDirection] = useState(90);

  const [glide, setGlide] = useState({
    glide: 0,
    positionGlide: 9,
  });

  function handleGlide(key, value) {
    setGlide((prev) => ({
      ...prev,
      [key]: value === "" ? "" : parseFloat(value) || 0,
    }));
  }

  function calculateBoundary() {
    const container = document.querySelector("#spriteContainer");
    const wrapper = document.querySelector("#spriteWrapper");

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const spriteWidth = wrapper.clientWidth;
    const spriteHeight = wrapper.clientHeight;

    const thresholdWidth = containerWidth / 2 + spriteWidth * 1.32;
    const negativeThresholdWidth = -(containerWidth / 2 + spriteWidth / 4);
    const thresholdHeight = containerHeight / 2 + spriteHeight;
    const negativeThresholdHeight = -(containerHeight / 2 + spriteHeight / 4);

    return {
      containerWidth,
      containerHeight,
      spriteWidth,
      spriteHeight,
      thresholdWidth,
      negativeThresholdWidth,
      thresholdHeight,
      negativeThresholdHeight,
    };
  }

  function checkBoundary(value, minBoundary, maxBoundary, size) {
    if (value < minBoundary) {
      return minBoundary;
    }
    if (value > maxBoundary - size) {
      return maxBoundary - size;
    }
    return value;
  }

  function move(e) {
    if (e.target.closest("input")) {
      return;
    }

    const {
      spriteWidth,
      spriteHeight,
      thresholdWidth,
      thresholdHeight,
      negativeThresholdHeight,
      negativeThresholdWidth,
    } = calculateBoundary();

    const stepsValue = parseFloat(steps) || 0;
    const angleInRadians = (turn * Math.PI) / 180;
    const deltaX = Math.ceil(stepsValue * Math.cos(angleInRadians));
    const deltaY = Math.ceil(stepsValue * Math.sin(angleInRadians));

    let newPositionX = position.x + deltaX;
    let newPositionY = position.y + deltaY;

    if (deltaX !== 0) {
      if (newPositionX < negativeThresholdWidth) {
        newPositionX = negativeThresholdWidth;
      } else if (newPositionX > thresholdWidth - spriteWidth) {
        newPositionX = thresholdWidth - spriteWidth;
      }
    }

    if (deltaY !== 0) {
      if (newPositionY < negativeThresholdHeight) {
        newPositionY = negativeThresholdHeight;
      } else if (newPositionY > thresholdHeight - spriteHeight) {
        newPositionY = thresholdHeight - spriteHeight;
      }
    }
    addToStack({
      type: "MOVE",
      x: position.x,
      y: position.y,
    });
    setPosition({ x: newPositionX, y: newPositionY });
    handleX("gotoX", newPositionX);
    handleX("setX", newPositionX);
    handleY("gotoY", newPositionY);
    handleY("setY", newPositionY);
  }

  function rotateRight(e) {
    if (e.target.closest("input")) {
      return;
    }
    addToStack({
      type: "ROTATE_RIGHT",
      degrees: turn,
    });
    const newTurn = (turn + rightTurn) % 360;
    setTurn(newTurn);
  }

  function rotateLeft(e) {
    if (e.target.closest("input")) {
      return;
    }
    addToStack({
      type: "ROTATE_LEFT",
      degrees: turn,
    });
    const newTurn = (turn - leftTurn) % 360;
    setTurn(newTurn);
  }

  function handleChangeSteps(e) {
    setSteps(e.target.value);
  }

  function handleLeftTurn(e) {
    setLeftTurn(e.target.value);
  }

  function handleRightTurn(e) {
    setRightTurn(e.target.value);
  }

  function handleXaxis(e) {
    handleX("gotoX", e.target.value);
  }

  function handleYaxis(e) {
    handleY("gotoY", e.target.value);
  }

  function handleMoveXY(e) {
    if (e.target.closest("input")) {
      return;
    }
    addToStack({
      type: "MOVE_TO",
      x: position.x,
      y: position.y,
    });
    const {
      spriteWidth,
      spriteHeight,
      thresholdWidth,
      thresholdHeight,
      negativeThresholdHeight,
      negativeThresholdWidth,
    } = calculateBoundary();

    const updatedX = checkBoundary(
      parseFloat(xAxis.gotoX) || 0,
      negativeThresholdWidth,
      thresholdWidth,
      spriteWidth
    );

    const updatedY = checkBoundary(
      parseFloat(yAxis.gotoY) || 0,
      negativeThresholdHeight,
      thresholdHeight,
      spriteHeight
    );

    setPosition({ x: updatedX, y: updatedY });
    setDuration(0);
    handleX("gotoX", updatedX);
    handleX("setX", updatedX);
    handleY("gotoY", updatedY);
    handleY("setY", updatedY);
  }

  function handlechangeX(e) {
    handleX("changeX", e.target.value);
  }

  function handlechangeY(e) {
    handleY("changeY", e.target.value);
  }

  function handleSetX(e) {
    handleX("setX", e.target.value);
  }

  function handleSetY(e) {
    handleY("setY", e.target.value);
  }

  function handleSetXClick(e) {
    if (e.target.closest("input")) {
      return;
    }

    const { spriteWidth, thresholdWidth, negativeThresholdWidth } =
      calculateBoundary();

    const updatedX = checkBoundary(
      parseFloat(xAxis.setX) || 0,
      negativeThresholdWidth,
      thresholdWidth,
      spriteWidth
    );
    addToStack({
      type: "SET_X",
      x: position.x,
    });
    handleX("setX", updatedX);
    handleX("gotoX", updatedX);
    handlePosition("x", updatedX);
  }

  function handleSetYClick(e) {
    if (e.target.closest("input")) {
      return;
    }

    const { spriteHeight, thresholdHeight, negativeThresholdHeight } =
      calculateBoundary();

    const updatedY = checkBoundary(
      parseFloat(yAxis.setY) || 0,
      negativeThresholdHeight,
      thresholdHeight,
      spriteHeight
    );
    addToStack({
      type: "SET_Y",
      y: position.y,
    });
    handleY("setY", updatedY);
    handleY("gotoY", updatedY);
    handlePosition("y", updatedY);
  }

  function handleChangeXClick(e) {
    if (e.target.closest("input")) {
      return;
    }

    const { spriteWidth, thresholdWidth, negativeThresholdWidth } =
      calculateBoundary();

    const currentX = parseFloat(xAxis.setX) || 0;
    const changeX = parseFloat(xAxis.changeX) || 0;
    addToStack({
      type: "CHANGE_X",
      x: position.x,
    });
    const updatedX = checkBoundary(
      currentX + changeX,
      negativeThresholdWidth,
      thresholdWidth,
      spriteWidth
    );

    handleX("setX", updatedX);
    handleX("gotoX", updatedX);
    handlePosition("x", updatedX);
  }

  function handleChangeYClick(e) {
    if (e.target.closest("input")) {
      return;
    }

    const { spriteHeight, thresholdHeight, negativeThresholdHeight } =
      calculateBoundary();

    const currentY = parseFloat(yAxis.setY) || 0;
    const changeY = parseFloat(yAxis.changeY) || 0;

    const updatedY = checkBoundary(
      currentY + changeY,
      negativeThresholdHeight,
      thresholdHeight,
      spriteHeight
    );
    // Record the change Y action
    addToStack({
      type: "CHANGE_Y",
      y: position.y,
    });
    handleY("setY", updatedY);
    handleY("gotoY", updatedY);
    handlePosition("y", updatedY);
  }

  function handleOnEdge() {
    const {
      containerHeight,
      containerWidth,
      spriteWidth,
      spriteHeight,
      negativeThresholdHeight,
      negativeThresholdWidth,
      thresholdHeight,
      thresholdWidth,
    } = calculateBoundary();

    const { x, y } = position;

    let newX = x;
    let newY = y;
    addToStack({
      type: "ON_EDGE_BOUNCE",
      x,
      y,
      turn: turn,
    });
    const isAtRightEdge = x >= thresholdWidth - spriteWidth;
    const isAtLeftEdge = x <= negativeThresholdWidth;

    const isAtBottomEdge = y >= thresholdHeight - spriteHeight;
    const isAtTopEdge = y <= negativeThresholdHeight;

    if (isAtRightEdge) {
      newX = newX - spriteWidth / 2;
    } else if (isAtLeftEdge) {
      newX = newX + spriteWidth;
    }

    if (isAtBottomEdge) {
      newY = newY - spriteHeight / 2;
    } else if (isAtTopEdge) {
      newY = newY + spriteHeight;
    }

    if (isAtLeftEdge || isAtBottomEdge || isAtRightEdge || isAtTopEdge) {
      setPosition({ x: newX, y: newY });
      setDuration(0);
      handleX("setX", newX);
      handleX("gotoX", newX);
      handleY("setY", newY);
      handleY("gotoY", newY);

      rotateSprite();
    }
  }

  function rotateSprite() {
    const newTurn = (turn + 180) % 360;
    setTurn(newTurn);
  }

  function handleDirection(e) {
    setDirection(e.target.value);
  }

  function handleDirectionClick(e) {
    if (e.target.closest("input")) {
      return;
    }

    addToStack({
      type: "SET_DIRECTION",
      direction: turn,
    });
    let angle = direction % 360;

    if (angle > 180) {
      angle -= 360;
    } else if (angle < -180) {
      angle += 360;
    }

    setTurn(angle);
    setDirection(angle);
  }

  function handelGotoGlide(e) {
    handleGlide("glide", e.target.value);
  }

  function handelGlideX(e) {
    handleX("glideX", e.target.value);
  }

  function handelGlideY(e) {
    handleY("glideY", e.target.value);
  }

  function handleGlideClick(e) {
    if (e.target.closest("input")) {
      return;
    }
    addToStack({
      type: "GLIDE",
      x: position.x,
      y: position.y,
      duration: parseFloat(glide.glide) || 0,
    });
    const {
      spriteWidth,
      thresholdWidth,
      spriteHeight,
      thresholdHeight,
      negativeThresholdHeight,
      negativeThresholdWidth,
    } = calculateBoundary();

    const updatedX = checkBoundary(
      parseFloat(xAxis.glideX) || 0,
      negativeThresholdWidth,
      thresholdWidth,
      spriteWidth
    );

    const updatedY = checkBoundary(
      parseFloat(yAxis.glideY) || 0,
      negativeThresholdHeight,
      thresholdHeight,
      spriteHeight
    );

    setPosition({ x: updatedX, y: updatedY });
    setDuration(parseFloat(glide.glide) || 0);
    handleY("setY", updatedY);
    handleY("gotoY", updatedY);
    handleY("glideY", updatedY);
    handlePosition("y", updatedY);

    handleX("setX", updatedX);
    handleX("gotoX", updatedX);
    handleX("glideX", updatedX);
    handlePosition("x", updatedX);
  }

  return (
    <>
      <div className="font-bold">{"Motion"}</div>
      <div
        className="flex flex-row items-center flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={move}
      >
        {"Move"}
        <SharedInput value={steps} handleChange={handleChangeSteps} />
        {"Steps"}
      </div>
      <div
        className="flex flex-row flex-wrap items-center  bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={rotateLeft}
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        <SharedInput value={leftTurn} handleChange={handleLeftTurn} />
        {"degrees"}
      </div>
      <div
        className="flex flex-row flex-wrap items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={rotateRight}
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        <SharedInput value={rightTurn} handleChange={handleRightTurn} />
        {"degrees"}
      </div>
      <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Go to Random"}
      </div>
      <div
        className="flex flex-row flex-wrap items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleDirectionClick}
      >
        {"Point In Direction "}
        <SharedInput value={direction} handleChange={handleDirection} />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleMoveXY}
      >
        {`Go to by x: `}
        <SharedInput value={xAxis.gotoX} handleChange={handleXaxis} />
        {` y: `}
        <SharedInput value={yAxis.gotoY} handleChange={handleYaxis} />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleGlideClick}
      >
        {"glide"}
        <SharedInput value={glide.glide} handleChange={handelGotoGlide} />
        {"secs to"}
        {`x: `}
        <SharedInput value={xAxis.glideX} handleChange={handelGlideX} />
        {` y: `}
        <SharedInput value={yAxis.glideY} handleChange={handelGlideY} />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleChangeXClick}
      >
        {`Change X by `}
        <SharedInput value={xAxis.changeX} handleChange={handlechangeX} />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleSetXClick}
      >
        {`Set X by `}
        <SharedInput value={xAxis.setX} handleChange={handleSetX} />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleChangeYClick}
      >
        {`Change Y by `}
        <SharedInput value={yAxis.changeY} handleChange={handlechangeY} />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleSetYClick}
      >
        {`Set Y by `}
        <SharedInput value={yAxis.setY} handleChange={handleSetY} />
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={handleOnEdge}
      >
        {`If On Edge Bounce`}
      </div>
    </>
  );
}
