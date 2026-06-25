import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {

  return (
    <header className="w-full h-[100px] bg-accent sticky top-0 z-50 shadow-md flex items-center justify-center px-6 flex-shrink-0">
      <div className="absolute left-6 flex items-center ">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="w-14 h-14 object-contain bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-300 " />
        </Link>
      </div>
      <div className="flex items-center gap-8 lg:gap-12">
        <Link to="/" className="text-white font-medium hover:text-secondary transition-colors duration-300">Home</Link>
        <Link to="/products" className="text-white font-medium hover:text-secondary transition-colors duration-300">Products</Link>
        <Link to="/about" className="text-white font-medium hover:text-secondary transition-colors duration-300">About</Link>
        <Link to="/contact" className="text-white font-medium hover:text-secondary transition-colors duration-300">Contact us</Link>
      </div>
      <Link to="/cart" className="absolute right-15 flex items-center gap-2 ">
        <span className="text-white font-medium">Cart</span>
        <FaShoppingCart className="text-white text-xl" />
      </Link>
    </header>
  )
}


