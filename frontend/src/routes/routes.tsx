import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import ProductPage from "../pages/ProductPage";
import ProductForm from "../components/ProductForm";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home title="Browse Products" />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <AllProducts title="All Products" />
          },
          {
            path: ":productId",
            element: <ProductPage />
          },
          {
            path: "addOrUpdateProduct",
            element: <ProductForm />
          }
        ]
      },
    ],
  }
]

export const router = createBrowserRouter(routes);