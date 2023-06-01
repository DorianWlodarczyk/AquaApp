import React from "react";
import style from "./progress-bar.module.css";
import { getRandomFishIcon } from "../../../../../utils/images/fish-icon";

interface props {
  labels: string[];
  step: number;
}

const ProgressBar = ({ labels, step }: props) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className={style.content}>
        <div className={style.backgroundLine}>
          {labels.map((item, index) => {
            console.log(`${(100 / labels.length) * index + 1}%`);
            return (
              <div
                className={`${style.dot} 
                  ${index < step ? style.DotDone : ""}
                `}
                key={index}
                style={{
                  left: `${(100 / (labels.length - 1)) * index}%`,
                }}
              >
                <div
                  className={`${style.stepName} 
                  ${index === step ? style.active : ""}
                  ${index < step ? style.stepNameDone : ""}

                  `}
                >
                  {item}
                </div>
              </div>
            );
          })}
          <div>
            <img
              className={style.fishIcon}
              src={getRandomFishIcon()}
              alt=""
              style={{
                left: `${(100 / (labels.length - 1)) * step}%`,
              }}
            />
            <div
              className={style.line}
              style={{
                width: `${(100 / (labels.length - 1)) * step}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
