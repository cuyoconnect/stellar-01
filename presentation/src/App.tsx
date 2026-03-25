import { Presentation } from './components/Presentation'
import { slides } from './slides'

function App() {
  return <Presentation slides={[...slides]} />
}

export default App
