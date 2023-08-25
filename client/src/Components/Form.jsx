function Form() {
  return (
    <div className="w-full  flex justify-center mt-10">
      <div className="form-container w-full md:w-1/3 ">
        <h1 className="text-center  text-xl lg:text-4xl">
          Welcome to <span className="color-yellow"> Word Detective</span>
        </h1>
        <p className="text-center color-yellow">Can you Guess the Word ?</p>
        <div className="form mt-5 p-2">
          <div className="mb-3">
            <label>Email</label>
            <br></br>
            <input
              type="email"
              placeholder="enter email"
              className="w-full mt-2 p-1  border border-yellow-600 "
            ></input>
          </div>
          <div className="mb-3">
            <label>Password</label>
            <br></br>
            <input
              type="password"
              placeholder="enter password"
              className="w-full  p-1 mt-2  border border-yellow-600 "
            ></input>
          </div>
          <div className="mt-5">
            <button className="bg-[#ffd700] w-full text-black p-1 md:p-2">
              Login
            </button>
          </div>
          <div className="mt-5">
            <button className="bg-[#4285F4] w-full text-black p-1 md:p-2">
              Login With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form

