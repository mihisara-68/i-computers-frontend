import { useState } from "react";
import { addToCart, getCart } from "../../utils/cart";
import formatPrice from "../../utils/price-format";

export default function CartPage() {
    const [cart, setCart] = useState(getCart());
    return (
        <div className="w-full p-4 gap-4 flex flex-col items-center">
            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    🛒 Shopping Cart
                </h1>
            </div>
            {cart.map((item) => {
                return (
                    <div key={item.product.productId} className="w-[500px] h-[150px] bg-white border rounded-lg shadow-xl flex gap-2 items-center p-2 relative">
                        <img className="w-[100px] h-[100px] object-cover rounded-l-lg" src={item.product.images} />
                        <div className="h-full w-[400px]">
                            <h1 className="text-xl font-bold text-gray-800">{item.product.name}</h1>
                            <p className="text-gray-600 text-sm">{item.product.productId}</p>
                            {
                                item.product.labelledPrice > item.product.price &&
                                <span className="text-sm text-red-500 line-through mt-2 block">
                                    {formatPrice(item.product.labelledPrice)}
                                </span>
                            }
                            <p className="text-2xl font-semibold text-accent">{formatPrice(item.product.price)}</p>

                        </div>

                        <div className="w-[200px] h-full flex flex-col justify-end absolute right-2 items-end p-2">
                            <div className="w-[100px] h-[30px] border rounded-full flex items-center justify-between px-2">
                                <button className="text-xl font-bold cursor-pointer hover:text-accent transition-colors duration-300"
                                    onClick={() => {
                                        addToCart(item.product, - 1);
                                        setCart(getCart());
                                    }}
                                >-</button>

                                <span className="text-lg font-bold">{item.quantity}</span>
                                <button className="text-xl font-bold cursor-pointer hover:text-accent transtion-colors duration-300"
                                    onClick={() => {
                                        addToCart(item.product, 1);
                                        setCart(getCart());
                                    }}
                                >+</button>
                            </div>
                            <div className="w-[100px] h-[30px] border rounded-full flex items-center justify-center px-2 mt-2">
                                <button className="text-sm font-bold cursor-pointer hover:text-red-500 transition-colors duration-300"
                                    onClick={() => {
                                        addToCart(item.product, - item.quantity);
                                        setCart(getCart());
                                    }}
                                >Remove</button>
                            </div>


                            <p className="text-xl font-semibold text-gray-800 mt-2">Total: <span className=" font-semibold text-accent">{formatPrice(item.product.price * item.quantity)}</span></p>
                        </div>

                    </div>
                );
            })}
        </div >
    );
}