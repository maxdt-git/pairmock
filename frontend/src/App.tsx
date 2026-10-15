import { Link } from 'react-router'
import './App.css'

function App() {
  return (
    <>
      <p>Hello World! Mock platfrom</p>
      <Link to={"/login"}>Login</Link>
    </>
  )
}

export default App
