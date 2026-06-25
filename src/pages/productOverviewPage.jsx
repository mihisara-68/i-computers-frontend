import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../utils/api";
import LoadingAnimation from "../components/loadingAnimation";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import ImageSlidesShow from "../components/imageSlidesShow";
import formatPrice from "../../utils/price-format";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverviewPage() {
    const parameters = useParams();
    const [product, setproduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(
        () => {
            api.get("/products/" + parameters.productId)
                .then(
                    (response) => {
                        setproduct(response.data);
                        setStatus("success");

                    }

                ).catch(
                    (error) => {
                        toast.error(error?.response?.data?.message || "An error occurred while fetching the product details.");
                        setStatus("error");
                    }
                );



        },
        []
    );

    useEffect(() => {
        if (parameters.productId == null) {
            navigate("/products");
            return null;
        }
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center">
            {
                status == "loading" && <LoadingAnimation />
            }
            {
                status == "error" && <div className="w-full h-75 flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Error Loading Product
                    </h2>
                    <Link to="/products" className="text-sm text-blue-500 hover:underline">
                        Back to Products
                    </Link></div>
            }
            {

                status == "success" && <div className="w-full min-h-screen bg-gray-50 p-6 lg:p-10">
                    <div className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

                        <div className="w-full lg:w-1/2 h-125 lg:h-auto bg-gray-100 flex items-center justify-center p-6">
                            <ImageSlidesShow images={product.images} />
                        </div>

                        <div className="w-full lg:w-1/2 h-full flex flex-col p-8 lg:p-12">

                            <div className="border-b border-gray-200 pb-6">
                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                    {product.name}

                                    {
                                        product.altNames.map(
                                            (alternativeName, index) => {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="text-base font-normal text-gray-500"
                                                    >
                                                        {" "} | {alternativeName}
                                                    </span>
                                                )
                                            }
                                        )
                                    }
                                </h1>

                                <h2 className="text-sm text-gray-500 mt-3">
                                    Product ID : {product.productId}
                                </h2>
                            </div>

                            <div className="mt-8">
                                <p className="text-5xl font-bold text-green-600">
                                    {
                                        formatPrice(product.price)
                                    }
                                </p>

                                {
                                    product.labelledPrice > product.price &&
                                    <span className="text-xl text-red-500 line-through mt-2 block">
                                        {formatPrice(product.labelledPrice)}
                                    </span>
                                }
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">

                                <div className="bg-gray-100 rounded-xl px-5 py-3">
                                    <p className="text-xs text-gray-500 uppercase">
                                        Brand
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {product.brand}
                                    </p>
                                </div>

                                <div className="bg-gray-100 rounded-xl px-5 py-3">
                                    <p className="text-xs text-gray-500 uppercase">
                                        Model
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {product.model}
                                    </p>
                                </div>

                                <div className="bg-gray-100 rounded-xl px-5 py-3">
                                    <p className="text-xs text-gray-500 uppercase">
                                        Category
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {product.category}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    Description
                                </h3>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {
                                        product.description
                                    }
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row mt-10 gap-4">

                                <button className="flex-1 h-14 bg-green-500 text-white rounded-xl hover:bg-green-600 cursor-pointer transition-colors duration-300 font-semibold shadow-md "
                                    onClick={() => {
                                        addToCart(product, 1);
                                        toast.success("Product added to cart", {
                                            position: "top-right",
                                            style: {
                                                marginTop: "100px",
                                                marginRight: "30px",
                                            },
                                        });
                                    }}>
                                    Add to Cart
                                </button>

                                <button
                                    onClick={() => {
                                        console.log(getCart());
                                    }}
                                    className="flex-1 h-14 bg-blue-500 text-white rounded-xl hover:bg-blue-600 cursor-pointer transition duration-300 font-semibold shadow-md">
                                    Buy Now
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>
    )
}