import { FC, useEffect, useState } from "react"
import { pageTypes, productType } from "../types/PageProps"
import { Link, useNavigate } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

const AllProducts: FC<pageTypes> = ({ title }) => {
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);

  const fetchAllProducts = async () => {
    const allProducts = await axios.get("/api/products");
    setProductList(allProducts?.data?.data);
  }

  const deleteProduct = async (productId: string) => {
    axios.delete(`/api/products/${productId}`);
  }

  const updateProduct = async (productId: string) => {
    const productToEdit = productList.find((product: productType) => product._id === productId);
    console.log("🚀 ~ file: AllProducts.tsx:25 ~ updateProduct ~ productToEdit:", productToEdit);
    navigate("/products/addOrUpdateProduct", {
      state: {
        title: "Update",
        productId
      }
    });
    // await axios.put(`/api/products/${productId}`);
  }

  useEffect(() => {
    fetchAllProducts();
  }, [productList])

  return (
    <div className="m-auto text-center mt-12 font-bold text-white text-2xl">
      <h2>{title}</h2>
      <div className="product mt-8">
        <ul className="flex gap-8 flex-wrap items-center justify-center">
          {
            productList.map((product: productType) => <li key={product._id} className="h-[275px] w-[275px] border-2 border-white rounded">
              <span>
                <img src={product.image} alt={product.name} className="h-[200px] w-full m-auto rounded object-cover" />
                <span className="flex justify-between items-center px-2 text-left">
                  <span>
                    <Link to={`/products/${product._id}`} className="text-sm text-left">{product.name}</Link>
                  </span>
                  <span className="text-sm">${product.price}</span>
                </span>
                <span className="icons flex gap-2 mt-2 px-2">
                  <FaRegEdit className="cursor-pointer" onClick={() => updateProduct(product._id)} />
                  <RiDeleteBinLine className="cursor-pointer" onClick={() => deleteProduct(product._id)} />
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