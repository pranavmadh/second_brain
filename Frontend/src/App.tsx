
import './App.css'
import { Button } from './Components/ui/Button'

function App() {


  return (
    <>
    <Button variant={'primary'} size={'md'} text={"Share"} startIcon={'plus'} onClick={() => {}}/>
    <Button variant={'secondary'} size={'md'} text={"Share This content"} startIcon={'share'} onClick={() => {}}/>
    </>
  )
}

export default App
