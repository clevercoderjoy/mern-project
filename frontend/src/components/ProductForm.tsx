import { FC } from 'react'
import { useLocation } from 'react-router-dom'

const AddProductForm: FC = () => {

  const location = useLocation();
  const { title, productId } = location.state || {}
  return (
    <>
      <h2>{title ? title : "Add"} Product</h2>
    </>
  )
}

export default AddProductForm