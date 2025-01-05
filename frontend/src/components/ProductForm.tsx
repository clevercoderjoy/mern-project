import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form";
import { locationStateType, productType } from '../types/Types';
import axios from 'axios';

const ProductForm: FC = () => {

  const location = useLocation();
  const { title, currentProduct } = location.state as locationStateType || {}
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<productType>({
    defaultValues: {
      name: currentProduct?.name || "",
      price: currentProduct?.price || "",
      image: currentProduct?.image || "",
    }
  })

  const onsubmit: SubmitHandler<productType> = async (data) => {
    console.log(data);
    if (currentProduct) {
      console.log("Product Updated");
      await axios.put(`/api/products/${currentProduct._id}`, data);
    }
    else {
      await axios.post(`/api/products/addProduct`, data);
    }
    navigate(-1);
    reset();
  }

  return (
    <>
      <h2 className='text-center mt-12 font-bold text-white text-2xl'>{title || "Add"} Product</h2>

      <form onSubmit={handleSubmit(onsubmit)} className='mt-12 text-white font-bold max-w-[50%] mx-auto border-white border-4 p-4 rounded-md'>
        <div className="name flex flex-col mt-4">
          <label htmlFor="name" className=''>Name</label>
          <input id="name" className='border-2 outline-none border-white rounded mt-2 p-2' type="text" autoFocus {...register("name", { required: "Product name is required!" })} />
          {
            errors.name && (
              <span className='text-[tomato] mt-2'>{errors.name.message}</span>
            )
          }
        </div>
        <div className="name flex flex-col mt-4">
          <label htmlFor='price' className=''>Price</label>
          <input className='border-2 outline-none border-white rounded mt-2 p-2' type="number" id="price" {...register("price", { required: "Product price is required!" })} />
          {
            errors.price && (
              <span className='text-[tomato] mt-2'>{errors.price.message}</span>
            )
          }
        </div>
        <div className="name flex flex-col my-4">
          <label htmlFor='image' className=''>Image</label>
          <input id="image" className='border-2 outline-none border-white rounded mt-2 p-2' type="text" {...register("image", { required: "Product image-url is required!" })} />
          {
            errors.image && (
              <span className='text-[tomato] mt-2'>{errors.image.message}</span>
            )
          }
        </div>
        <div className="name flex flex-col mt-6 mb-4 border-2 p-2 border-white">
          <button className='outline-none' type="submit">{title || "Add"}</button>
        </div>
      </form>
    </>
  )
}

export default ProductForm