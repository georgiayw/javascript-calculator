import React from 'react';
import { ReactDOM } from 'react';

import './App.css';

const calcData = [
  {
    value: "AC",
    id: "clear"
  },
  {
    value: "/",
    id: "divide"
  },
  {
    value: "x",
    id: "multiply"
  },
  {
    value: 7,
    id: "seven"
  },
  {
    value: 8,
    id: "eight"
  },
  {
    value: 9,
    id: "nine"
  },
  {
    value: "-",
    id: "subtract"
  },
  {
    value: 4,
    id: "four"
  },
  {
    value: 5,
    id: "five"
  },
  {
    value: 6,
    id: "six"
  },
  {
    value: "+",
    id: "add"
  },
  {
    value: 1,
    id: "one"
  },
  {
    value: 2,
    id: "two"
  },
  {
    value: 3,
    id: "three"
  },
  {
    value: "=",
    id: "equals"
  },
  {
    value: 0,
    id: "zero"
  },
  {
    value: ".",
    id: "decimal"
  }
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">{input}</span>
  </div>
);

const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>{value}</button>
);

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {calcData.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

const App = () => {
  const [input, setInput] = React.useState("0");
    const [output, setOutput] = React.useState("");
    const [calculatorData, setCalculatorData] = React.useState("");

  const handleSubmit = () => {
    const total = eval(calculatorData);
      setInput(`${total}`);
      setOutput(`${total} = ${total}`);
      setCalculatorData(`${total}`);
  }

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  }

  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if(value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lastChat = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator = 
          lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const dotOperator = () => {
    const lastChat = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if(lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue = 
          lastChat === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
          setCalculatorData(formattedValue);
      }
    }
  };

  const handleOperators = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChat = calculatorData.charAt(
        calculatorData.length - 2
        );

      const beforeLastChatIsOperator = 
        operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = calculatorData.charAt(calculatorData.length - 1);

      const lastChatIsOperator = operators.includes(lastChat) || 
        lastChat === "*";

      const validOp = value === "x" ? "*" : value;
      if ((lastChatIsOperator && value !== "-") ||
        beforeLastChatIsOperator && lastChatIsOperator) {
          if (beforeLastChatIsOperator) {
            const updatedValue = `${calculatorData.substring(0,
              calculatorData.length - 2
            )}${value}`;
            setCalculatorData(updatedValue);
          } else {
            setCalculatorData(`${calculatorData.substring(0, 
              calculatorData.length - 1)}${validOp}`);
          }
        } else {
          setCalculatorData(`${calculatorData}${validOp}`);
        }
    }

  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculatorData)
  };

  React.useEffect(() => {
    handleOutput()
  }, [calculatorData]);
 
  
    return (
      <div className="App">
        <div className="calculator">
          <Display input={input} output={output} />
          <Keyboard handleInput={handleInput} />
        </div>
      </div>
  );
}



export default App;

