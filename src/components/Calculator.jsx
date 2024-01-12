import { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [pendingOperation, setPendingOperation] = useState(null);
  const [pendingValue, setPendingValue] = useState("0");
  const [completeOperation, setCompleteOperation] = useState("");

  const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const operations = ["+", "-", "*", "/", "√"];

  const handleClick = (value) => {
    setCurrentValue((prev) =>
      prev === "0" || pendingOperation === "√" ? value : prev + value
    );
    setCompleteOperation((prevOp) =>
      pendingOperation === "√" ? "√" + value : prevOp + value
    );
  };

  const handleOperation = (operation) => {
    if (operation === "√") {
      setCompleteOperation(() => "√" + currentValue);
      setPendingValue(currentValue);
      setCurrentValue(Math.sqrt(parseFloat(currentValue)).toString());
    } else {
      setCompleteOperation(() => currentValue + " " + operation);
      setPendingValue(currentValue);
      setCurrentValue("0");
    }

    setPendingOperation(operation);
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPendingOperation(null);
    setPendingValue(null);
    setCompleteOperation("");
  };

  const handleCalculate = () => {
    if (!pendingOperation) {
      return;
    }

    const num1 = parseFloat(pendingValue || "0");
    const num2 = parseFloat(currentValue);

    let result;

    switch (pendingOperation) {
      case "+":
        result = num1 + num2;
        break;

      case "-":
        result = num1 - num2;
        break;

      case "*":
        result = num1 * num2;
        break;

      case "/":
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          handleCalculationError();
          return;
        }
        break;

      case "√":
        result = Math.sqrt(num2);
        break;

      default:
        handleCalculationError();
        return;
    }

    setCompleteOperation(`${num1} ${pendingOperation} ${num2} = ${result}`);
    setCurrentValue(result.toString());
    setPendingOperation(null);
    setPendingValue(null);
  };

  const handleCalculationError = () => {
    setCurrentValue("Error!");
    setCompleteOperation("Error!");
    setPendingOperation(null);
    setPendingValue(null);
  };

  return (
    <div className="calculator-container">
      <img
        className="grey-img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Circle_Grey_Solid.svg/1200px-Circle_Grey_Solid.svg.png"
      />
      <div className="calculator">
        <div className="complete-operation">{completeOperation}</div>
        <div className="display">{currentValue}</div>
        <div className="buttons">
          <button onClick={handleClear}>AC</button>
          {keypadNumbers.map((num) => (
            <button key={num} onClick={() => handleClick(num)}>
              {num}
            </button>
          ))}
          {operations.map((op) => (
            <button key={op} onClick={() => handleOperation(op)}>
              {op}
            </button>
          ))}
          <button onClick={handleCalculate}>=</button>
        </div>
      </div>
      <img className="circles-img" src="/yellow-circle-png.png" />
    </div>
  );
};

export default Calculator;
