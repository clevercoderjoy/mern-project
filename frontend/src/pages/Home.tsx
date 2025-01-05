import { FC } from "react"
import { NavLink } from "react-router-dom"
import { pageTypes } from "../types/Types"

const Home: FC<pageTypes> = ({ title }) => {
  return (
    <div className="flex flex-col min-h-[80vh] justify-center items-center text-center font-bold text-white text-2xl cursor-pointer">
      <NavLink to="/products">
        {title}
      </NavLink>
    </div>
  )
}

export default Home