import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header className="w-full h-[100px] bg-accent relative flex justify-center items-center sticky top-0 flex-shrink-0">
      <div className="w-[200px] h-full absolute left-10 justify-content items-center">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="w-16 h-16 object-bottom mr-2" />
        </Link>
      </div>
      <div className="h-full flex justify-center items-center gap-10">
        <Link to="/" className="text-white text-lg font-semibold hover:text-secondary transition-colors duration-300">Home</Link>
        <Link to="/products" className="text-white text-lg font-semibold hover:text-secondary transition-colors duration-300">Products</Link>
        <Link to="/about" className="text-white text-lg font-semibold hover:text-secondary transition-colors duration-300">About</Link>
        <Link to="/contact" className="text-white text-lg font-semibold hover:text-secondary transition-colors duration-300">Contact us</Link>
      </div>


    </header>
  )
}