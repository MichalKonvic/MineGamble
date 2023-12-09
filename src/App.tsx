import Controls from "./components/Controls"
import GameField from "./components/GameField"
import Layout from "./components/Layout"
import { GameProvider } from "./providers/GameProvider"

const App = () => {
  return (
    <GameProvider>
      <Layout>
        <Controls/>
        <GameField/>
      </Layout>
    </GameProvider>
  )
}

export default App