import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form";
import { productType } from '../types/Types';
import axios from 'axios';

const AddProductForm: FC = () => {

  const location = useLocation();
  const { title, productId } = location.state || {}
  const { register, handleSubmit, reset, formState: { errors } } = useForm<productType>()

  const onsubmit: SubmitHandler<productType> = async (data) => {
    console.log(data);
    await axios.post(`/api/products/addProduct`, data)
    reset();
  }

  return (
    <>
      <h2 className='text-center mt-12 font-bold text-white text-2xl'>{title ? title : "Add"} Product</h2>

      <form onSubmit={handleSubmit(onsubmit)} className='mt-12 text-white font-bold max-w-[50%] mx-auto border-white border-4 p-4 rounded-md'>
        <div className="name flex flex-col mt-4">
          <label className=''>Name</label>
          <input className='border-2 outline-none border-white rounded mt-2 p-2' type="text" {...register("name", { required: "Product name is required!" })} />
          {
            errors.name && (
              <span className='text-[tomato] mt-2'>{errors.name.message}</span>
            )
          }
        </div>
        <div className="name flex flex-col mt-4">
          <label className=''>Price</label>
          <input className='border-2 outline-none border-white rounded mt-2 p-2' type="number" {...register("price", { required: "Product price is required!" })} />
          {
            errors.price && (
              <span className='text-[tomato] mt-2'>{errors.price.message}</span>
            )
          }
        </div>
        <div className="name flex flex-col my-4">
          <label className=''>Image</label>
          <input className='border-2 outline-none border-white rounded mt-2 p-2' type="text" {...register("image", { required: "Product image-url is required!" })} />
          {
            errors.image && (
              <span className='text-[tomato] mt-2'>{errors.image.message}</span>
            )
          }
        </div>
        <div className="name flex flex-col mt-6 mb-4 border-2 p-2 border-white">
          <button className='outline-none' type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default AddProductForm