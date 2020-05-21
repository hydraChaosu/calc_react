import React, { useState } from "react";
import {
  Button,
  Calculator,
  View,
  MemoryButtons,
  OtherButtons,
} from "./App.css.js";

function App() {
  const [memory, setMemory] = useState(0);
  const [view, setView] = useState("0");
  const [operationStarted, setOperationStarted] = useState(false);
  const [prevOperation, setPrevOperation] = useState("");
  const [operator, setOperator] = useState(null);

  const [prev, setPrev] = useState(0);
  const [equal, setEqual] = useState(false);
  const [special, setSpecial] = useState(false);
  const [repeatVal, setRepeatVal] = useState(0);

  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "%": (a, b) => (a * b) / 10,
    "=": (a, b) => b,
  };

  const divide = () => {
    if (equal) {
      setOperationStarted(true);
      setOperator("/");
      return;
    }

    if (operator !== "/" && prevOperation !== operator && operator !== null) {
      doOperation();
    } else if (
      prevOperation === operator &&
      operator !== null &&
      prevOperation !== null
    ) {
    } else if (operator) {
      doOperation();
      setRepeatVal(view);
      setPrevOperation(operator);
    }
    setOperationStarted(true);
    setOperator("/");
  };

  const result = () => {
    if (operator && operator !== null) {
      console.log("result");
      doOperation(repeatVal);
    }
    setOperationStarted(true);
    setEqual(true);
  };

  const percent = () => {
    if (equal) {
      setOperationStarted(true);
      setOperator("%");
      return;
    }
    if (operator !== "%" && prevOperation !== operator && operator !== null) {
      doOperation();
    } else if (
      prevOperation === operator &&
      operator !== null &&
      prevOperation !== null
    ) {
    } else if (operator) {
      doOperation();
      setRepeatVal(view);

      setPrevOperation(operator);
    }
    setOperationStarted(true);
    setOperator("%");
  };

  const addition = () => {
    if (equal) {
      setOperationStarted(true);
      setOperator("+");
      return;
    }
    checkDoOperation("+");
    setOperationStarted(true);
    setOperator("+");
  };

  const checkDoOperation = (operation) => {
    if (
      operator !== operation &&
      prevOperation !== operator &&
      operator !== null
    ) {
      doOperation();
    } else if (
      prevOperation === operator &&
      operator !== null &&
      prevOperation !== null
    ) {
    } else if (operator) {
      doOperation();
      setPrevOperation(operator);
    }
  };

  const multiplication = () => {
    if (equal) {
      setOperationStarted(true);
      setOperator("*");
      return;
    }
    if (operator !== "*" && prevOperation !== operator && operator !== null) {
      doOperation();
    } else if (
      prevOperation === operator &&
      operator !== null &&
      prevOperation !== null
    ) {
    } else if (operator) {
      doOperation();
      setRepeatVal(view);
      setPrevOperation(operator);
    }
    setOperationStarted(true);
    setOperator("*");
  };

  const subtraction = () => {
    if (special) {
      setSpecial(false);
      setOperationStarted(true);
      setOperator("-");
      return;
    }

    if (equal) {
      setOperationStarted(true);
      setOperator("-");
      return;
    }

    checkDoOperation("-");
    setOperationStarted(true);
    setOperator("-");
  };

  const doOperation = (repeat) => {
    if ((Number(view) === 0 || Number(repeat) === 0) && operator === "/") {
      setView("Nie dziel przez zero");
      return;
    }
    if (repeat) {
      console.log(repeat);
      const result = operators[operator](Number(prev), Number(repeat));
      setView(result);
      setPrev(result);
      return;
    }
    setView(operators[operator](Number(prev), Number(view)));
  };

  const updateNumber = (e) => {
    if (equal) {
      setView("0");
    }

    if (view === "0") {
      setView(e.target.value);
      setRepeatVal(e.target.value);
    } else if (operationStarted) {
      setPrev(Number(view));
      setView(e.target.value);
      setOperationStarted(false);
      setPrevOperation(null);
      setRepeatVal(e.target.value);
    } else {
      setView(view + e.target.value);
      setRepeatVal(view + e.target.value);
    }
    setEqual(false);
  };

  const changesign = () => {
    if (Number(view) > 0) {
      setView(-Math.abs(view));
    } else if (Number(view) < 0) {
      setView(Math.abs(view));
    }
  };

  const cancel = () => {
    setView("0");
  };

  const clearAll = () => {
    setView("0");
    setPrev(0);
    setOperationStarted(false);
    setPrevOperation("");
    setEqual(false);
    setRepeatVal(0);
    setOperator(null);
    setSpecial(false);
  };

  const addDot = () => {
    if (!view.toString().includes(".")) {
      setView(`${view}.`);
    }
  };

  const sqrt = () => {
    if (Number(view) < 0) setView("Cant sqrt from negative numbers");
    if (operator !== null) {
      doOperation(repeatVal);
    }
    setEqual(false);
    setSpecial(true);
    setPrevOperation(null);
    setOperationStarted(true);
    setView(`${Math.sqrt(Number(view))}`);
  };

  const power = () => {
    if (operator !== null) {
      doOperation(repeatVal);
    }
    setEqual(false);
    setSpecial(true);
    setPrevOperation(null);
    setOperationStarted(true);
    setView(`${Number(view) ** 2}`);
  };

  const oneDiv = () => {
    if (operator !== null) {
      doOperation(repeatVal);
    }
    setEqual(false);
    setSpecial(true);
    setPrevOperation(null);
    setOperationStarted(true);
    setView(`${1 / Number(view)}`);
  };

  const del = () => {
    setView(`${view.length === 1 ? "0" : view.toString().slice(0, -1)}`);
    setRepeatVal(`${view.length === 1 ? "0" : view.toString().slice(0, -1)}`);
  };

  return (
    <Calculator>
      <View>{view}</View>
      <MemoryButtons>
        <Button
          value="MR"
          onClick={() => {
            setRepeatVal(memory.toString());
            setView(memory.toString());
          }}
        >
          MR
        </Button>
        <Button value="MC" onClick={() => setMemory(0)}>
          MC
        </Button>
        <Button value="M+" onClick={() => setMemory(memory + Number(view))}>
          M+
        </Button>
        <Button value="M-" onClick={() => setMemory(memory - Number(view))}>
          M-
        </Button>
        <Button value="MS" onClick={() => setMemory(Number(view))}>
          MS
        </Button>
      </MemoryButtons>
      <OtherButtons>
        <Button onClick={percent}>%</Button>
        <Button onClick={clearAll}>CE</Button>
        <Button onClick={cancel}>C</Button>
        <Button onClick={del}>del</Button>
        <Button onClick={oneDiv}>1/x</Button>
        <Button onClick={power}>power</Button>
        <Button onClick={sqrt}>sqrt</Button>
        <Button onClick={divide}>/</Button>
        <Button value="7" onClick={updateNumber}>
          7
        </Button>
        <Button value="8" onClick={updateNumber}>
          8
        </Button>
        <Button value="9" onClick={updateNumber}>
          9
        </Button>
        <Button onClick={multiplication}>*</Button>
        <Button value="4" onClick={updateNumber}>
          4
        </Button>
        <Button value="5" onClick={updateNumber}>
          5
        </Button>
        <Button value="6" onClick={updateNumber}>
          6
        </Button>
        <Button onClick={subtraction}>-</Button>
        <Button value="1" onClick={updateNumber}>
          1
        </Button>
        <Button value="2" onClick={updateNumber}>
          2
        </Button>
        <Button value="3" onClick={updateNumber}>
          3
        </Button>
        <Button onClick={addition}>+</Button>
        <Button onClick={changesign}>+/-</Button>
        <Button value="0" onClick={updateNumber}>
          0
        </Button>

        <Button onClick={addDot}>.</Button>
        <Button onClick={result}>=</Button>
      </OtherButtons>
    </Calculator>
  );
}

export default App;
