import { useState } from "react";
import {
  numbers,
  uppercaseLetters,
  lowercaseLetters,
  specialSymbols
} from "./data";

import "./styles.css";

export default function App() {
  const [lowercase, setLowercase] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleGeneratePassword = () => {
    let generatedPassword = "";

    if (lowercase) {
      generatedPassword += lowercaseLetters;
    }

    if (uppercase) {
      generatedPassword += uppercaseLetters;
    }

    if (number) {
      generatedPassword += numbers;
    }

    if (symbols) {
      generatedPassword += specialSymbols;
    }

    setPassword(createPassword(generatedPassword));
  };

  const createPassword = (generatedPassword) => {
    let password = "";
    const generatedPasswordLength = generatedPassword.length;

    for (let i = 0; i < passwordLength; i++) {
      const passwordIndex = Math.floor(Math.random() * generatedPasswordLength);
      password += generatedPassword.chartAt(passwordIndex);
    }
    return password;
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <h3>You have generated: {password}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password-length">Password Length</label>
          <input
            type="number"
            name="password-length"
            id="password-length"
            min="10"
            max="20"
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lowercase">Lowercase letters</label>
          <input
            type="checkbox"
            name="lowercase"
            id="lowercase"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="uppercase">Uppercase letters</label>
          <input
            type="checkbox"
            name="uppercase"
            id="uppercase"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="numbers">Numbers</label>
          <input
            type="checkbox"
            name="numbers"
            id="numbers"
            checked={number}
            onChange={(e) => setNumber(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="symbols">Symbols</label>
          <input
            type="checkbox"
            name="symbols"
            id="symbols"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          />
        </div>

        <button type="submit" onClick={handleGeneratePassword}>
          Generate password
        </button>
      </form>
    </div>
  );
}
