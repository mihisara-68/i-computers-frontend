import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbTrash } from "react-icons/tb";

export default function ProductDeleteModel(props) {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const productId = props.product;
    const refresh = props.refresh;

    function handleDelete() {
        axios.delete(import.meta.env.VITE_API_URL + "/products/" + props.product.productId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        ).then(() => {
            toast.success("Product deleted successfully");
            refresh();
        }
        ).catch((error) => {
            toast.error("Error deleting product");
            console.log("Error deleting product:", error);
        }
        )
    }
    return (
        <>
            <div
                onClick={() => setIsModelOpen(true)}
                className="ml-1 group inline-flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-300 transition-all duration-300 cursor-pointer"
            >
                <TbTrash
                    size={20}
                    className="text-red-500 group-hover:scale-110 transition-transform duration-300"
                />
            </div>
            {isModelOpen &&
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 text-secondary">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete this product?</p>
                        <div className="flex justify-end space-x-4">
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                onClick={() => setIsModelOpen(false)}>
                                Cancel
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={
                                    () => {
                                        handleDelete()
                                        setIsModelOpen(false);

                                    }
                                }>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>}
        </>
    )
}
