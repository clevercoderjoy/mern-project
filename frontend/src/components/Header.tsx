import { NavLink } from "react-router-dom"


const Header = () => {
  return (
    <header className="flex justify-between mt-8 text-white font-bold h-8">
      <div className="logo cursor-pointer">
        <NavLink to="/">
          LOGO
        </NavLink>
      </div>
      <div className="navBar">
        <nav>
          <ul className="flex gap-8">
            <NavLink to="/products/addOrUpdateProduct" className="cursor-pointer hover:border-b-4 hover: border-white">Add</NavLink>
            <NavLink to="/" className="cursor-pointer hover:border-b-4 hover: border-white">Home</NavLink>
            <NavLink to="/products" className="cursor-pointer hover:border-b-4 hover: border-white">Products</NavLink>
            <NavLink to="/about" className="cursor-pointer hover:border-b-4 hover: border-white">About</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header