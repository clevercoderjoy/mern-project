import { useEffect, useState } from "react"
import { productType } from "../types/Types";
import api from "../api";
import { useNavigate } from "react-router-dom";

const UseProducts = () => {

  const [productList, setProductList] = useState<productType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/products");
      setProductList(response?.data?.data);
      setLoading(false);
    } catch (e) {
      setError(e as string);
    }
    finally {
      setLoading(false);
    }
  }

  const deleteProduct = async (productId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        setProductList((productList) => productList.filter((product) => product._id !== productId));
        await api.delete(`/api/products/${productId}`);
      } catch (error) {
        throw new Error(error as string);
      }
    }
  }

  const updateProduct = async (productId: string) => {
    const productToEdit = productList.find((product: productType) => product._id === productId);
    navigate("/products/addOrUpdateProduct", {
      state: {
        title: "Update",
        currentProduct: productToEdit
      }
    });
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return {
    productList,
    loading,
    error,
    deleteProduct,
    updateProduct,
    fetchAllProducts
  }
}

export default UseProducts
