import { useSelector } from 'react-redux'
function Header(props) {
  // eslint-disable-next-line react/prop-types
  const { show } = props
  const high_score = useSelector((state) => {
    return state.reducer.auth.userDetails.high_score
  })
  let currentScore = useSelector((state) => {
    return state.reducer.auth.currentScore
    ;
  })
  

  return (
    <div className="header-container w-full flex justify-between">
      <div>
        <h1 className="text-xl lg:text-2xl">
          Word <span className="color-yellow">Wizard</span>
        </h1>
        <div className="word-of-the-day-container mt-0 md:mt-2">
          <p className=" text-sm lg:text-lg">Word of the Day</p>
          <p className="text-sm lg:text-sm color-yellow">
              Word Wizard:
            <span className="">
              Some One Who Guess the word from  Hint. Can You be  the One?
            </span>
          </p>
        
        </div>
      </div>
      <div>
        <h1 className={` ${show ? 'block' : 'hidden'}`}>
          High Score :{high_score}
        </h1>
        <h1 className={` ${show ? 'block' : 'hidden'}`}>
          Current Score :{currentScore}
        </h1>
      </div>
    </div>
  )
}

export default Header
