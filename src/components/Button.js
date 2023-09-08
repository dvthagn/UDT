import React, { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (value) => {
  const className = {
    "=": "equals",
    "*": "opt",
    "-": "opt",
    "+": "opt",
    "/": "opt",
  };
  return className[value];
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);
  //user click comma
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };
  //use click C
  const resetClick = () => {
    setCalc({
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const handleClickNumber = () => {
    const numberString = value.toString();
    let numberValue;

    if (numberString === "0" && calc.num === 0) {
      numberValue = 0;
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  const signClick = () => {
    console.log(calc);
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClick = () => {
    console.log(calc)
    if (calc.num && calc.res) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          "/": (a, b) => a / b,
          "*": (a, b) => a * b,
        };
        return result[sign](a, b);
      };
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };
  const persenClick = () => {
    setCalc({
      sign: "",
      num: calc.num / 100,
      res: calc.res / 100,
    });
  };
  const invertClick = () => {
    setCalc({
      sign: "",
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
    });
  };

  const handleBtnClick = () => {
    const result = {
      ".": commaClick,
      C: resetClick,
      "/": signClick,
      "+": signClick,
      "-": signClick,
      "*": signClick,
      "=": equalsClick,
      "%": persenClick,
      "+-": invertClick,
    };

    if (result[value]) {
      return result[value]();
    } else {
      return handleClickNumber();
    }
  };
  return (
    <div onClick={handleBtnClick} className={`${getStyleName(value)} button`}>
      {value}
    </div>
  );
};

export default Button;
