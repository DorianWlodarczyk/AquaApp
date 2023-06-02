import React, { useEffect, useState } from "react";
import style from "./aquarium-preview.module.css";
import { inputData } from "../../../../../utils/models/input-data";

interface props {
  values: inputData[];
}

const clampNumber = (val: number, min: number, max: number): number => {
  return Math.min(max, Math.max(val, min));
};

const AquariumPreview = ({ values }: props) => {
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const [height, setHeight] = useState(0);

  const [widthText, setWidthText] = useState("");
  const [lengthText, setLengthText] = useState("");
  const [heightText, setHeightText] = useState("");

  const [degrees, setDegrees] = useState(45);
  const lineWidth = 5;

  useEffect(() => {
    let newWidth = Number(values.find((item) => item.name === "width")?.value);
    let newLength = Number(
      values.find((item) => item.name === "length")?.value
    );
    let newHeight = Number(
      values.find((item) => item.name === "height")?.value
    );

    if (newWidth && newWidth > 0 && newWidth < 1000) {
      setWidthText(`${newWidth}cm`);
    } else {
      setWidthText("???");
    }

    if (newLength && newLength > 0 && newLength < 1000) {
      setLengthText(`${newLength}cm`);
    } else {
      setLengthText("???");
    }

    if (newHeight && newHeight > 0 && newHeight < 1000) {
      setHeightText(`${newHeight}cm`);
    } else {
      setHeightText("???");
    }

    const average = (newWidth + newLength + newHeight) / 3;

    newWidth /= average;
    newLength /= average;
    newHeight /= average;

    newWidth = clampNumber(newWidth, 0.2, 1);
    newLength = clampNumber(newLength, 0.2, 1);
    newHeight = clampNumber(newHeight, 0.2, 1);

    setWidth(newWidth);
    setLength(newLength);
    setHeight(newHeight);

    console.log(`W: ${newWidth}, L: ${newLength}, H:${newHeight}`);
  }, [values]);

  /**
   *     ____11______
   *    /|           //10
   * 12/ |          /|
   *  /__|____9____//|
   *  | 8|        |  |7
   *  |  |____3___|__|
   * 5|  /        |6 |
   *  |./4        |  /
   *  |/          | /2
   *  _____________/
   *        1
   */

  return (
    <div className={style.preview}>
      {/* 1 */}
      <div
        className={style.line}
        style={{
          width: `calc(${100 * length}%)`,
          height: `${lineWidth}px`,
          bottom: "0px",
        }}
      ></div>

      {/* 2 */}
      <div
        className={style.line}
        style={{
          width: `${lineWidth}px`,
          height: `calc(${(100 * width) / 2}%)`,
          left: `calc(${(100 * width) / 6}% + ${100 * length}% - 4px)`,
          transform: "rotate(45deg)",
          bottom: `-${width * 10}px`,
        }}
      ></div>

      {/* 3 */}
      <div
        className={style.hideLine}
        style={{
          width: `calc(${100 * length}% - 2px)`,
          height: `${lineWidth}px`,
          left: `calc(${(100 * width) / 3}%)`,
          bottom: `calc(${(100 * width) / 3}% + ${width / 0.2}px - 1px)`,
        }}
      ></div>

      {/* 4 */}
      <div
        className={style.hideLine}
        style={{
          width: `${lineWidth}px`,
          height: `calc(${(100 * width) / 2}%)`,
          left: `calc(${(100 * width) / 6}%`,
          transform: "rotate(45deg)",
          bottom: `-${width * 10}px`,
        }}
      ></div>

      {/* 5 */}
      <div
        className={style.line}
        style={{
          width: `${lineWidth}px`,
          height: `calc(${100 * height}%)`,
          bottom: "0px",
        }}
      ></div>

      {/* 6 */}
      <div
        className={style.line}
        style={{
          width: `${lineWidth}px`,
          height: `calc(${100 * height}%)`,
          bottom: "0px",
          left: `calc(${100 * length}% - 5px)`,
        }}
      ></div>

      {/* 7 */}
      <div
        className={style.line}
        style={{
          width: `${lineWidth}px`,
          height: `calc(${100 * height}%)`,
          bottom: `calc(${(100 * width) / 3}% + ${width / 0.2}px - 1px)`,
          left: `calc(${100 * length}% - 5px + ${(100 * width) / 3}%)`,
        }}
      ></div>

      {/* 8 */}
      <div
        className={style.hideLine}
        style={{
          width: `${lineWidth}px`,
          height: `calc(${100 * height}%)`,
          bottom: `calc(${(100 * width) / 3}% + ${width / 0.2}px - 1px)`,
          left: `calc(${(100 * width) / 3}%)`,
        }}
      ></div>

      {/* 9 */}
      <div
        className={style.line}
        style={{
          width: `calc(${100 * length}%)`,
          height: `${lineWidth}px`,
          bottom: `calc(${100 * height}%)`,
        }}
      ></div>

      {/* 10 */}
      <div
        className={style.line}
        style={{
          width: `${lineWidth}px`,
          height: `calc(${(100 * width) / 2}%)`,
          left: `calc(${(100 * width) / 6}% + ${100 * length}% - 4px)`,
          transform: "rotate(45deg)",
          bottom: `calc(-${width * 10}px + ${100 * height}%)`,
        }}
      ></div>

      {/* 11 */}
      <div
        className={style.line}
        style={{
          width: `calc(${100 * length}% - 2px)`,
          height: `${lineWidth}px`,
          left: `calc(${(100 * width) / 3}%)`,
          bottom: `calc(${(100 * width) / 3}% + ${width / 0.2}px - 1px + ${
            100 * height
          }%)`,
        }}
      ></div>

      {/* 12 */}
      <div
        className={style.line}
        style={{
          width: `${lineWidth}px`,
          height: `calc(${(100 * width) / 2}%)`,
          left: `calc(${(100 * width) / 6}%`,
          transform: "rotate(45deg)",
          bottom: `calc(-${width * 10}px + ${100 * height}%)`,
        }}
      ></div>

      {/* length */}
      <div
        className={style.text}
        style={{
          bottom: "-30px",
          left: `calc(${(100 * length) / 2}%)`,
          transform: "translateX(-50%)",
        }}
      >
        {`${lengthText}`}
      </div>

      {/* Width */}
      <div
        className={style.text}
        style={{
          bottom: `calc(${(100 * width) / 6}%)`,
          left: `calc(${(100 * width) / 6}% + ${100 * length}% + 10px)`,
          transform: "translateY(50%)",
        }}
      >
        {`${widthText}`}
      </div>

      {/* height */}
      <div
        className={style.text}
        style={{
          left: `calc(${100 * length}% - 5px + ${(100 * width) / 3}% + 10px)`,
          bottom: `calc(${(100 * height) / 2}% + ${(100 * width) / 3}% - 10px)`,
        }}
      >
        {`${heightText}`}
      </div>
    </div>
  );
};

export default AquariumPreview;
