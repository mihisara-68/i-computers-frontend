import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./productsPage";

export default function HomePage() {

  return (
    <div className='w-full h-screen flex flex-col' >
      <Header />
      <div className=" w-full min-[calc(100%-100px)] overflow-y-scroll">
        <Routes>
          <Route path="/" element={<h1>Welcome to iComputers</h1>} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<h1>About Us</h1>} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />
          <Route path="/overview" element={<h1>Product Overview Page</h1>} />
        </Routes>
      </div>
    </div>
  )
}
