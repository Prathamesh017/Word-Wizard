const options = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]
function Level() {
  return (
    <div>
      <div className="w-full  flex justify-center mt-10">
        <div className="form-container w-full md:w-1/3 ">
          <h1 className="text-centercolor-yellow text-xl lg:text-4xl">
            Enter Details
          </h1>
          <div className="form mt-5 p-2">
            <div className="mb-3">
              <label>Enter Name</label>
              <br></br>
              <input
                type="name"
                placeholder="enter name"
                className="w-full mt-2 p-1  border border-yellow-600 "
              ></input>
            </div>
            <div className="mb-3">
              <label>Choose Difficulty</label>
              <br></br>
              <select name="cars" id="cars" className='w-full p-1  border border-yellow-600'>
                {options.map((option, index) => {
                  return (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="mt-10">
              <button className="bg-[#4285F4] w-full text-black p-1 md:p-2">
               Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level
