function Game() {
  let word = 'Unbelievability'
  let charArray = word.split('')
  console.log(charArray)
  return (
    <div className="w-full  flex justify-center mt-12 md:mt-20">
      <div className="form-container w-full md:w-3/4  flex flex-col items-center">
        <h1 className="color-yellow text-xl mb-2">Guess The Word</h1>
        <div className="mt-4 flex flex-wrap">
          {charArray.map((char, index) => {
            return (
              <span key={index} className="border p-2 border-box w-8 md:w-12">
                {index % 2 == 0 ? char : ''}
              </span>
            )
          })}
        </div>
        <div className="mt-10">
          <h2>Hint: Someone Who Fights with Courage</h2>
        </div>
        <div className="w-full flex justify-center mt-5">
          <input
            className=" border  w-full md:w-1/2 p-2"
            type="text"
            placeholder="Enter Answer"
          ></input>
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-x-2 mt-10">
          <button className="bg-[#ffd700] w-full text-black p-1 md:p-2">
            Submit
          </button>
          <button className="bg-[#4285F4]  w-full text-black p-1 md:p-2">
            Skip
          </button>
        </div>
      </div>
    </div>
  )
}

export default Game
