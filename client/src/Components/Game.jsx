import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseScore } from '../Store/authSlice'
import Finish from './Finish'
function Game() {
  const dispatch = useDispatch()
  const { currentScore, loggedUser, wordsArr } = useSelector((state) => {
    return state.reducer.auth
  })
  const [counter, setCounter] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [submit, setSubmit] = useState({
    show: false,
    message: '',
  })
  const [finish, setFinish] = useState(false)

  useEffect(() => {
    dispatch(increaseScore(0))
  }, [])

  const sortByCategoryWordArr =
    wordsArr &&
    wordsArr.filter((word) => {
      return word.difficulty === loggedUser.difficulty
    })

  let currentWord = sortByCategoryWordArr[counter].name
  let currentWordHint = sortByCategoryWordArr[counter].hint
  let showWordArr = currentWord.split('').map((char, index) => {
    return index % 2 == 0 ? char : ' '
  })

  function onSubmit() {
    if ((userInput.toLowerCase() !== currentWord.toLowerCase())) {
      setSubmit((prev) => ({
        ...prev,
        show: true,
        message: 'INCORRECT GUESS',
      }))
    } else {
      setSubmit((prev) => ({
        ...prev,
        show: true,
        message: 'Correct',
      }))

      setUserInput('')
      dispatch(increaseScore(counter + 1))
      if (counter === sortByCategoryWordArr?.length - 1) {
        setFinish(true)
      } else {
        setCounter(counter + 1)
      }
    }
  }
  function skip() {
    if (counter === sortByCategoryWordArr?.length - 1) {
      setFinish(true)
    } else {
      setCounter(counter + 1)
    }
  }

  return (
    <div className="w-full  flex justify-center mt-12 md:mt-20">
      {finish ? (
        <Finish score={currentScore}></Finish>
      ) : (
        <div className="form-container w-full md:w-3/4  flex flex-col items-center">
          <h1 className="color-yellow text-xl mb-2">Guess The Word</h1>

          <div className="mt-4 flex flex-wrap">
            {showWordArr.map((char, index) => {
              return (
                <span key={index} className="border p-2 border-box w-8 md:w-12">
                  {char}
                </span>
              )
            })}
          </div>
          <h2 className="mt-2">
            Guess:
            {userInput}
          </h2>
          <h3 className="color-yellow text-md">
            {submit.show && submit.message}
          </h3>
          <div className="mt-10"></div>
          <span>{currentWordHint}</span>
          <div className="w-full flex justify-center mt-5">
            <input
              className=" border  w-full md:w-1/2 p-2"
              type="text"
              placeholder="Enter Answer"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value)
                setSubmit((prev) => ({
                  ...prev,
                  show: false,
                }))
              }}
            ></input>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-x-2 mt-10">
            <button
              className="bg-[#ffd700] w-full text-black p-1 md:p-2"
              onClick={onSubmit}
            >
              Submit
            </button>
            <button
              className="bg-[#4285F4]  w-full text-black p-1 md:p-2"
              onClick={skip}
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Game
