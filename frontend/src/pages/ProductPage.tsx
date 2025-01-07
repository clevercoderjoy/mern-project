import { useNavigate, useParams } from "react-router-dom";
import { productType } from "../types/Types";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import UseProducts from "../hooks/UseProducts";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productList, deleteProduct, updateProduct } = UseProducts();

  const { productId } = useParams<{ productId: string }>();
  const [currentProduct, setCurrentProduct] = useState<productType | null>(null);

  const handleBackClick = () => {
    navigate(-1);
  }

  const handleDelete = async () => {
    if (currentProduct?._id) {
      await deleteProduct(currentProduct._id)
    }
    navigate(-1);
  }

  useEffect(() => {
    const getProduct = () => {
      return productList.find((product: productType) => product._id === productId);
    };
    const product = getProduct();
    setCurrentProduct(product ?? null);
  }, [productList, productId]);

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      {currentProduct && (
        <div className="h-[275px] w-[275px] border-4 border-white rounded font-bold">
          <span>
            <img src={currentProduct.image} alt={currentProduct.name} className="h-[200px] w-full m-auto object-cover" />
            <span className="flex justify-between items-center px-2 text-left mt-1">
              <span>
                <span className="text-sm text-left text-white">{currentProduct.name}</span>
              </span>
              <span className="text-sm text-white">${currentProduct.price}</span>
            </span>
            <span className="icons flex items-center justify-evenly text-xl mt-2 px-2 font-bold">
              <FaRegEdit className="cursor-pointer text-white" onClick={() => currentProduct._id && updateProduct(currentProduct._id)} />
              <RiDeleteBinLine className="cursor-pointer text-white" onClick={() => handleDelete()} />
              <IoMdArrowBack className="cursor-pointer text-white" onClick={handleBackClick} />
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

export default ProductPage