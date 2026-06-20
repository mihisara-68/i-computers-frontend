import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbTrash } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/loadingAnimation";
import ProductDeleteModel from "../../components/productDeleteModel";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    const [isProductsAreLoaded, setIsProductsAreLoaded] = useState(false);

    useEffect(
        () => {
            if (!isProductsAreLoaded) {

                const token = localStorage.getItem("token");

                axios.get(import.meta.env.VITE_API_URL + "/products", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (response) => {
                        setProducts(response.data)
                        setIsProductsAreLoaded(true);

                    }
                ).catch(
                    (error) => {
                        console.log("Error fetching products:", error)
                    }
                )
            }
        },
        [isProductsAreLoaded]
    );

    return (
        <div className="w-full h-full overflow-scroll p-4 bg-gray-50 rounded-xl">

            {/* Header */}
            <div className="sticky top-0 z-10 w-full h-[100px] shadow-sm bg-gradient-to-r from-accent/10 via-white to-white text-secondary rounded-xl flex items-center justify-between px-6 border border-gray-100">

                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-accent">
                        Products
                    </h1>

                    <p className="text-sm text-gray-400 mt-0.5">
                        {isProductsAreLoaded ? (
                            <>
                                <span className="text-violet-500 font-medium">
                                    {products.length}
                                </span>{" "}
                                product{products.length === 1 ? "" : "s"} in catalog
                            </>
                        ) : (
                            "Loading catalog..."
                        )}
                    </p>
                </div>

                <Link
                    to="/admin/add-product"
                    className="flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    <FaPlus />
                    <span>Add Product</span>
                </Link>

            </div>

            {
                isProductsAreLoaded ?
                    products.length > 0 ?
                        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
                            <table className="w-full text-secondary text-sm">
                                <thead className="bg-accent/10">
                                    <tr className="text-left">
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide">Image</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide">Product ID</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide">Name</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide text-right">Price</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide text-right">Labelled Price</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide">Brand</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide">Model</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide">Category</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide">Availability</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide text-right">Stock</th>
                                        <th className="p-4 font-medium text-gray-500 uppercase text-xs tracking-wide text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {
                                        products.map(
                                            (item) => {
                                                return (
                                                    <tr
                                                        className="hover:bg-accent/5 transition-colors duration-150"
                                                        key={item.productId}
                                                    >
                                                        <td className="p-2">
                                                            <img
                                                                src={item.images?.[0]}
                                                                alt={item.name}
                                                                onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
                                                                className="w-18 h-18 object-cover rounded-lg mx-auto ring-1 ring-gray-200 hover:scale-150 transition-transform duration-300"
                                                            />
                                                        </td>
                                                        <td className="p-4 text-indigo-400 whitespace-nowrap font-mono text-xs">{item.productId}</td>
                                                        <td className="p-4 font-semibold text-gray-800">{item.name}</td>
                                                        <td className="p-4 text-right tabular-nums font-semibold text-emerald-600">{item.price}</td>
                                                        <td className="p-4 text-right tabular-nums text-rose-300 line-through">{item.labelledPrice}</td>
                                                        <td className="p-4">
                                                            <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                                                                {item.brand}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-gray-600">{item.model}</td>
                                                        <td className="p-4">
                                                            <span className="inline-block px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-medium">
                                                                {item.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-medium ${item.isAvailable
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                                    }`}
                                                            >
                                                                {item.isAvailable ? "Available" : "Unavailable"}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-right tabular-nums">
                                                            <span className={
                                                                item.stock > 10
                                                                    ? "px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-semibold"
                                                                    : item.stock > 0
                                                                        ? "px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 font-semibold"
                                                                        : "px-2.5 py-1 rounded-full bg-rose-50 text-rose-500 font-semibold"
                                                            }>
                                                                {item.stock}
                                                            </span>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Link
                                                                    to="/admin/edit-product"
                                                                    state={item}
                                                                    className="group inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                                                                >
                                                                    <BiEdit
                                                                        size={18}
                                                                        className="text-blue-500 group-hover:scale-110 transition-transform duration-200"
                                                                    />
                                                                </Link>
                                                                <ProductDeleteModel
                                                                    product={item}
                                                                    refresh={
                                                                        () =>
                                                                            setIsProductsAreLoaded(false)
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        <div className="mt-6 flex flex-col items-center justify-center text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
                            <p className="text-gray-500 font-medium">No products yet</p>
                            <p className="text-gray-400 text-sm mt-1">Add your first product using the button below.</p>
                        </div>
                    :
                    <div className="mt-10">
                        <LoadingAnimation />
                    </div>
            }


        </div>
    );
}