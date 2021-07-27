import { useState } from "react"
import {
  numbers,
  uppercaseLetters,
  lowercaseLetters,
  specialSymbols,
} from "./data"

import "./styles.css"

export default function App() {
  const [lowercase, setLowercase] = useState(false)
  const [uppercase, setUppercase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(20)

  // Prevent the page refreshing when submitting the form
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // Password generating function
  const handleGeneratePassword = () => {
    let generatedPassword = ""

    if (lowercase) {
      generatedPassword += lowercaseLetters
    }

    if (uppercase) {
      generatedPassword += uppercaseLetters
    }

    if (number) {
      generatedPassword += numbers
    }

    if (symbols) {
      generatedPassword += specialSymbols
    }

    setPassword(createPassword(generatedPassword))
  }

  const createPassword = (generatedPassword) => {
    let password = ""
    const generatedPasswordLength = generatedPassword.length

    for (let i = 0; i < passwordLength; i++) {
      const passwordIndex = Math.floor(Math.random() * generatedPasswordLength)
      password += generatedPassword.charAt(passwordIndex)
    }
    return password
  }

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="App">
      {/* 4 divs to add background gaussian blur */}
      <div className="red"></div>
      <div className="green"></div>
      <div className="orange"></div>
      <div className="blue"></div>
      {/* End of background divs */}

      <section className="bg-white flex flex-col items-center justify-center p-5 rounded shadow-lg">
        <h1 className="text-4xl mb-5 font-bold tracking-widest md:text-5xl">
          Password Generator
        </h1>
        <div className="bg-gray-900 h-10 flex items-center justify-between px-2 rounded shadow-md">
          <h3 className="text-white text-left tracking-wider">{password}</h3>
          {password && (
            <button
              className="bg-green-400 p-1 text-sm rounded text-white"
              onClick={handleCopy}
            >
              Copy
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label htmlFor="password-length">Password Length</label>
            <input
              type="number"
              name="password-length"
              id="password-length"
              min="10"
              max="20"
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              className="text-right bg-gray-200 rounded-sm shadow-md"
            />
          </div>

          <div className="my-2">
            <label htmlFor="lowercase">Lowercase letters</label>
            <input
              type="checkbox"
              name="lowercase"
              id="lowercase"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
            />
          </div>

          <div className="my-2">
            <label htmlFor="uppercase">Uppercase letters</label>
            <input
              type="checkbox"
              name="uppercase"
              id="uppercase"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
          </div>

          <div className="my-2">
            <label htmlFor="numbers">Numbers</label>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              checked={number}
              onChange={(e) => setNumber(e.target.checked)}
            />
          </div>

          <div className="my-2">
            <label htmlFor="symbols">Symbols</label>
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
              checked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
            />
          </div>

          <button
            type="submit"
            onClick={handleGeneratePassword}
            className="bg-green-500 py-2 px-6 rounded-sm text-white font-bold hover:bg-transparent hover:text-green-500 border-2 border-green-500 transition-all duration-500 mt-5"
          >
            Suggest Strong password
          </button>
        </form>
      </section>
    </div>
  )
}
