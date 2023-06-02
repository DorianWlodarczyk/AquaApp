import React from "react";
import { inputData } from "../../../../../utils/models/input-data";
interface props {
  onChange: (value: string, name: string) => void;
  values: inputData[];
}

const Step3 = ({ onChange, values }: props) => {
  return <div>Step3</div>;
};

export default Step3;
