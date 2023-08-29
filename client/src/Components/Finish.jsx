import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser, setHighScore } from '../Store/authSlice'

function Finish(props) {
  // eslint-disable-next-line react/prop-types
  const { score } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector((state) => {
    return state.reducer.auth
  })

  const high_score = state.userDetails.high_score
  if (high_score < score) {
    dispatch(updateUser({ token: state.token.payload, score }))
    dispatch(setHighScore(score))
  }

  function playAgainBtn() {
    navigate(`/info/${state.userDetails.userId}`)
  }
  function LogoutBtn() {
    localStorage.clear()
    navigate(`/`)
  }
  return (
    <div>
      <div className="form-container w-full    flex flex-col items-center">
        <h1 className="color-yellow text-3xl mb-2 ">
          Congrulations {state.loggedUser.name} 🎉🥳
        </h1>
        <h1>Your Final Score is {score}</h1>
        <div className="w-full  grid grid-cols-2 gap-x-2 mt-10">
          <button
            className="bg-[#ffd700] w-full text-black p-1 md:p-2"
            onClick={playAgainBtn}
          >
            Play Again
          </button>
          <button
            className="bg-[#4285F4]  w-full text-black p-1 md:p-2"
            onClick={LogoutBtn}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Finish
