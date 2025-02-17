import { useState } from "react";
import "./index.css";
import TodoList from "./components/TodoList";
import UserList from "./components/UserList";

function App() {
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState([0, 0]); // Initialize with 2 inputs
  const [result, setResult] = useState(0);

  // Counter Functions
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count > 0 ? count - 1 : 0);
  const handleReset = () => setCount(0);

  // Calculator Functions
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = Number(value);
    setInputs(newInputs);
  };

  const handleAddition = () => setResult(inputs.reduce((sum, num) => sum + num, 0));
  const handleSubtraction = () => setResult(inputs.reduce((diff, num) => diff - num));
  const handleMultiplication = () => setResult(inputs.reduce((prod, num) => prod * num, 1));
  const handleDivision = () => {
    const result = inputs.reduce((quotient, num) => (num !== 0 ? quotient / num : "Error"));
    setResult(result);
  };

  const handleAddInput = () => {
    setInputs([...inputs, 0]); // Add a new input field with default value 0
  };

  return (
    <div className="container">
      {/* Counter Section */}
      <div className="card counter">
        <h2>Counter</h2>
        <p className="counter-value">{count}</p>
        <div className="btn-group">
          <button className="btn" onClick={handleIncrement}>Increment</button>
          <button className="btn" onClick={handleDecrement}>Decrement</button>
          <button className="btn reset" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="card calculator">
        <h2>Basic Calculator</h2>
        <div className="input-group">
          {inputs.map((value, index) => (
            <input
              key={index}
              type="number"
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Number ${index + 1}`}
            />
          ))}
        </div>

        <button className="btn add-input" onClick={handleAddInput}>Add Input</button>

        <div className="btn-group">
          <button className="btn" onClick={handleAddition}>+</button>
          <button className="btn" onClick={handleSubtraction}>-</button>
          <button className="btn" onClick={handleDivision}>/</button>
          <button className="btn" onClick={handleMultiplication}>x</button>
        </div>
        
        <p className="result">Result: <span>{result}</span></p>
      </div>

      {/* User List */}
      <UserList />
      
      {/* Todo List (moved to the bottom) */}
      <TodoList />
    </div>
  );
}

export default App;