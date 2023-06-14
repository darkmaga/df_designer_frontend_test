import DraggableLayout from './components/DraggableLayout'
import Graph from './components/Graph'
import AppContextProvider from './context/AppContextProvider'

const App = () => {
  return (
    <AppContextProvider>
      <DraggableLayout>
        <Graph />
      </DraggableLayout>
    </AppContextProvider>
  )
}

export default App
