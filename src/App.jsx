
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAloowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("")

  //useRef hook:
  const passwordRef = useRef(null)





  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*(){}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  const copyPasswordToClipboard = useCallback(() =>{
          passwordRef.current?.select();
          passwordRef.current?.setSelectionRange(0, 50);
          window.navigator.clipboard.writeText(password)
  },[password])




  return (
    <div>
      <div className='w-full h-[200px] max-w-md mx-auto shadow-md rounded-lg px-5 my-8 text-orange-500 bg-gray-700'>
        <h4 className='text-white  text-center text-2xl font-semibold py-6'>Password Generator:</h4>
        <div className='flex shadow rounder-lg overflow-hiddenmb-5 gap-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 rounded-md px-3'
            placeholder='password'
            ref={passwordRef}
            readOnly ></input>
          <button className='outline-none bg-blue-700 text-white px-3 py-.5 shrink-0 rounded-lg'
              onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-x-3'>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
              className='cursor-pointer'
            ></input>
            <label>Length:{length}</label>
            <div className='flex items-center gap-x-3'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAloowed((prev) => !prev)
                }}></input>
              <label>Numbers</label>
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                id="numberInput"
                onChange={() => {
                  setCharacterAllowed((prev) => !prev)
                }}></input>
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
