import React, { useState } from 'react';
import { initialPersonList } from './data';
import './App.css';

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);
  const [availableItems, setAvailableItems] = useState(initialPersonList);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, item.name]);
    setAvailableItems(availableItems.filter((availableItem) => availableItem.id !== item.id));
    setInputValue('');
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter((c) => c !== chip));
    const removedItem = initialPersonList.find((item) => item.name === chip);
    setAvailableItems([...availableItems, removedItem]);
  };

  return (
    <div className="chip-container">
      <div className="chips">
        {chips.map((chip) => (
          <div key={chip} className="chip">
            {chip}
            <span onClick={() => handleChipRemove(chip)}>X</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add new user..."
      />
      <div className="item-list">
        {availableItems
          .filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map((item) => (
            <div key={item.id} className="item" onClick={() => handleItemClick(item)}>
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Pick Users</h1>
      <ChipComponent />
    </div>
  );
}

export default App;
