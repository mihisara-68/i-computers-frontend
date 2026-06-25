import { Link } from "react-router-dom";

export default function ProductCard(props) {

    const product = props.product;

    return (

        <Link to={"/overview/" + product.productId} className="w-[300px] h-[450px] bg-red-400 border border-gray-600 bg-white m-4 p-4 rounded-lg shadow-2xl flex flex-col items-center overflow hover:[&_.primary-image]:opacity-0 justify-between cursor-pointer">
            <div className="w-full h-48 flex items-center mb-4 relative bg-white">
                <img src={product.images[1]} alt={product.name} className="w-full h-full object-cover absolute top-0 left-0" />
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover absolute top-0 left-0 primary-image transition-opacity duration-900" />
            </div>
            <h1 className="text-lg font-semibold mb-2">{product.name}</h1>
            <div className="w-full flex flex-col py-4 ">
                {product.labelledPrice > product.price && <span className="text-red-900 line-through mr-2">Rs. {product.labelledPrice}</span>}
                <span className="text-accent font-bold">Rs. {product.price}</span>
            </div>

        </Link>
    )
}
