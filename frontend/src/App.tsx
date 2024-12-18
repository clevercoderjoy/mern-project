import { Outlet } from "react-router-dom"
import Header from "./components/Header"

function App(): JSX.Element {

  return (
    <div className="m-4">
      <Header />
      <Outlet />
    </div >
  )
}

export default App
