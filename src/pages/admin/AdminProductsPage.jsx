import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);

    useEffect(
        () => {

            const token = localStorage.getItem("token");

            axios.get(import.meta.env.VITE_API_URL + "/products", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }).then(
                (response) => {
                    setProducts(response.data)

                }
            ).catch(
                (error) => {
                    console.log("Error fetching products:", error)
                }
            )
        },
        []
    );



    return (
        <div className="w-full h-full overflow-scroll p-4 ">

            <div className="sticky top-0 w-full h-[100px] shadow-md bg-white text-black rounded-lg flex items-center justify-between p-4">
                <h1 className="text-2xl font-semibold">Products</h1>

            </div>
            <table className="mt-5 w-full text-secondary">
                <thead className="bg-accent/15 has-[50px] ">
                    <tr className="text-center text-wrap">
                        <th className="text-center border border-primary p-4">Image</th>
                        <th className="text-center border border-primary p-4">Product ID</th>
                        <th className="text-center border border-primary p-4">Name</th>
                        <th className="text-center border border-primary p-4">Price</th>
                        <th className="text-center border border-primary p-4">Labelled Price</th>
                        <th className="text-center border border-primary p-4">Brand</th>
                        <th className="text-center border border-primary p-4">Model</th>
                        <th className="text-center border border-primary p-4">Category</th>
                        <th className="text-center border border-primary p-4">Availability</th>
                        <th className="text-center border border-primary p-4">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(
                            (item) => {
                                return (
                                    <tr className="odd:bg-gray-300 even:bg-primary border-t-4 border-primary hover:bg-accent/10 text-center border border-primary p-4" key={item.productId} >
                                        <td>
                                            <img
                                                src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover"
                                            />
                                        </td>
                                        <td className="text-center text-wrap">{item.productId}</td>
                                        <td className="text-center text-wrap">{item.name}</td>
                                        <td className="text-center text-wrap">{item.price}</td>
                                        <td className="text-center text-wrap">{item.labelledPrice}</td>
                                        <td className="text-center text-wrap">{item.brand}</td>
                                        <td className="text-center text-wrap">{item.altNames}</td>
                                        <td className="text-center text-wrap">{item.category}</td>
                                        <td className="text-center text-wrap"></td>
                                        <td className="text-center text-wrap">{item.stock}</td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
            <Link to="/admin/add-product" className="fixed bottom-8 right-8 w-[60px] h-[60px] bg-accent  flex items-center justify-center text-white text-3xl rounded-full shadow-lg hover:bg-indigo-100 hover:text-accent transition-colors duration-300">
                <FaPlus />
            </Link>
        </div>
    );
}
