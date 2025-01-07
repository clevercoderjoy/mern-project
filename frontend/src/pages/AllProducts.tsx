import { FC } from "react"
import { pageTypes, productType } from "../types/Types"
import { Link } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import UseProducts from "../hooks/UseProducts";

const AllProducts: FC<pageTypes> = ({ title }) => {

  const { productList, loading, error, deleteProduct, updateProduct } = UseProducts();
  const headingClass = "m-auto text-center mt-12 font-bold text-white text-2xl";

  if (loading) return <div className={headingClass}>Loading products...</div>;
  if (error) return <div className={headingClass}>{error}</div>;

  return (
    <div className={headingClass}>
      <h2>{title}</h2>
      <div className="product mt-8">
        <ul className="flex gap-8 flex-wrap items-center justify-center">
          {
            productList.map((product: productType) => <li key={product._id} className="h-[275px] w-[275px] border-2 border-white rounded">
              <span>
                <img src={product.image} alt={product.name} className="h-[200px] w-full m-auto object-cover" />
                <span className="flex justify-between items-center px-2 text-left">
                  <span>
                    <Link to={`/products/${product._id}`} state={{ productList }} className="text-sm text-left">{product.name}</Link>
                  </span>
                  <span className="text-sm">${product.price}</span>
                </span>
                <span className="icons flex gap-2 mt-2 px-2">
                  <FaRegEdit className="cursor-pointer" onClick={() => product._id && updateProduct(product._id)} />
                  <RiDeleteBinLine className="cursor-pointer" onClick={() => product._id && deleteProduct(product._id)} />
                </span>
              </span>
            </li>)
          }
        </ul>
      </div>
    </div >
  )
}

export default AllProducts