import React, { useEffect, useState } from "react";
import style from "./spinner.module.css";
import SpinnerA from "./spinnerA/spinnerA";
import SpinnerB from "./spinnerB/spinnerB";
import SpinnerC from "./spinnerC/spinnerC";
import SpinnerD from "./spinnerD/spinnerD";
// import SpinnerE from "./spinnerE/spinnerE";
import SpinnerF from "./spinnerF/spinnerF";
import SpinnerG from "./spinnerG/spinnerG";
import SpinnerH from "./spinnerH/spinnerH";
import SpinnerI from "./spinnerI/spinnerI";
import SpinnerJ from "./spinnerJ/spinnerJ";
import SpinnerK from "./spinnerK/spinnerK";

const spinners = [
  <SpinnerA />,
  <SpinnerB />,
  <SpinnerC />,
  <SpinnerD />,
  // <SpinnerE />,
  <SpinnerF />,
  <SpinnerG />,
  <SpinnerH />,
  <SpinnerI />,
  <SpinnerJ />,
  <SpinnerK />,
];

// const spinners = [<SpinnerK />];

const Spinner = () => {
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * spinners.length));
  }, []);
  return <div className={style.spinner}>{spinners[randomIndex]}</div>;
};

export default Spinner;
