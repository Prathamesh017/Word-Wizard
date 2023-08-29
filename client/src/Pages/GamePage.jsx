import Game from '../Components/Game'
import Header from '../Components/Header'
function GamePage() {
  return (
    <div className="p-4">
      <Header show={true}></Header>
      <Game></Game>
    </div>
  )
}

export default GamePage
