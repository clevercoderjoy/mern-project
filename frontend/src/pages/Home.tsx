import { FC } from "react"
import { NavLink } from "react-router-dom"
import { pageTypes } from "../types/PageProps"

const Home: FC<pageTypes> = ({ title }) => {
  return (
    <div className="m-auto text-center mt-12 font-bold text-white text-2xl cursor-pointer">
      <NavLink to="/products">
        {title}
      </NavLink>
    </div>
  )
}

export default Home