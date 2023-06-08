import React, { useEffect, useState } from "react";
import style from "./progress-bar.module.css";
import { getRandomFishIcon } from "../../../../../../utils/images/fish-icon";
import seaweed from "../../../../../../img/seaweed.png";
import getAquariumImg from "../../../../../../utils/images/aquarium-image";
interface props {
  labels: string[];
  step: number;
  imgID: string;
}

const ProgressBar = ({ labels, step, imgID }: props) => {
  const [fish, setFish] = useState("");
  const [aquaImg, setAquaImg] = useState("");

  useEffect(() => {
    setAquaImg(getAquariumImg(imgID));
  }, [imgID]);

  useEffect(() => {
    setFish(getRandomFishIcon());
  }, []);

  return (
    <div className="mt-5 flex w-full items-center justify-center">
      <div className={style.content}>
        <div className={style.backgroundLine}>
          {labels.map((item, index) => {
            return (
              <div key={index}>
                <img
                  className={style.dot}
                  src={index <= labels.length - 2 ? seaweed : aquaImg}
                  alt=""
                  style={{
                    left: `${(97 / (labels.length - 1)) * index}%`,
                  }}
                />

                <div
                  className={`${style.stepName} ${
                    index === step ? style.active : ""
                  } ${index < step ? style.stepNameDone : ""}`}
                  style={{
                    left: `${(97 / (labels.length - 1)) * index}%`,
                  }}
                >
                  {item}
                </div>
              </div>
            );
          })}
          <div>
            <img
              className={style.fishIcon}
              src={fish}
              alt=""
              style={{
                left: `${(97 / (labels.length - 1)) * step}%`,
              }}
            />
            <div
              className={style.line}
              style={{
                width: `${(97 / (labels.length - 1)) * step}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
