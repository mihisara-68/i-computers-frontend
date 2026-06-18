import { Link, Route, Routes } from "react-router-dom";
import AdminProductsPage from "./admin/AdminProductsPage";
import AdminAddProductPage from "./admin/AdminAddProductPage";
import AdminEditProductPage from "./admin/adminEditProductPage";

export default function AdminPage() {

  return (
    <div className='w-full h-screen flex items-center bg-accent' >
      <div className="w-[300px] h-full text-white">


        {/* <a href="/admin/products" class="block py-2 px-4 hover:bg-gray-700"> Products </a>
        <a href="/admin/users" class="block py-2 px-4 hover:bg-gray-700"> Users </a>
        <a href="/admin/orders" class="block py-2 px-4 hover:bg-gray-700"> Orders </a> */}

        <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-700"> Products </Link>
        <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700"> Users </Link>
        <Link to="/admin/orders" className="block py-2 px-4 hover:bg-gray-700"> Orders </Link>


      </div>

      <div className="w-[calc(100%-300px)] h-full bg-primary border-[10px] border-accent rounded-2xl">
        <Routes>
          <Route path='/' element={<h1>orders Dashboard</h1>} />
          <Route path='/products' element={<AdminProductsPage />} />
          <Route path='/add-product' element={<AdminAddProductPage />} />
          <Route path='/edit-product' element={<AdminEditProductPage />} />
          <Route path='/users' element={<h1>Users Management</h1>} />
          <Route path='/orders' element={<h1>Orders Management</h1>} />
        </Routes>

      </div>
    </div>

  )
} 