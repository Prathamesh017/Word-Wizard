function Header() {
  return (
    <div className="header-container">
      <h1 className="text-xl lg:text-2xl">
        Word <span className="color-yellow">Detective</span>
      </h1>
      <div className="word-of-the-day-container mt-0 md:mt-2">
        <p className=" text-sm lg:text-base">Word of the Day</p>
        <p className="text-sm lg:text-base">
          Hero: 
          <span className="color-yellow"> Someone Who Fights with Courage</span>
        </p>
      </div>
    </div>
  )
}

export default Header
