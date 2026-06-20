import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMedia from "../../../utils/mediaUpload";

export default function AdminEditProductPage() {
    const location = useLocation();
    const [productId, setProductId] = useState(location.state?.productId || "");
    const [name, setName] = useState(location.state?.name || "");
    const [altNames, setAltNames] = useState(location.state?.altNames ? location.state.altNames.join(",") : []);
    const [price, setPrice] = useState(location.state?.price || "");
    const [labelledPrice, setLabelledPrice] = useState(location.state?.labelledPrice || "");
    const [category, setCategory] = useState(location.state?.category || "");
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState(location.state?.description || "");
    const [brand, setBrand] = useState(location.state?.brand || "");
    const [model, setModel] = useState(location.state?.model || "");
    const [stock, setStock] = useState(location.state?.stock || "");
    const [isAvailable, setIsAvailable] = useState(location.state?.isAvailable ? true : false);
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    async function handleUpdate() {
        try {
            setIsUpdating(true);
            const token = localStorage.getItem("token");
            if (token == null) {
                toast.error("You must be logged in to perform this action.");
                window.location.href = "/login";
                return;
            }
            const mediaUploadPromises = [];
            for (let i = 0; i < images.length; i++) {
                mediaUploadPromises.push(uploadMedia(images[i]));
            }

            const urls = await Promise.all(mediaUploadPromises);
            const altNamesArray = altNames.split(",")
            const productData = {
                productId: productId,
                name: name,
                altNames: altNamesArray,
                price: price,
                labelledPrice: labelledPrice,
                category: category,
                images: urls,
                description: description,
                brand: brand,
                model: model,
                stock: stock,
                isAvailable: isAvailable
            };

            if (urls.length == 0) {
                productData.images = location.state.images;
            }

            await axios.put(import.meta.env.VITE_API_URL + "/products/" + productId, productData,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });
            console.log(import.meta.env.VITE_API_URL)
            toast.success("Product updated successfully!");
            navigate("/admin/products");

        } catch (error) {
            setIsUpdating(false);
            console.error("Error updating product:", error);
            console.error("Error response:", error?.response);
            toast.error(error?.response?.data?.message || "Failed to update product. Please try again.");
        }
    }
    return (
        <div className="w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
            <div className="sticky top-0 w-full h-[100px] shadow-md bg-white text-black rounded-lg flex items-center justify-between p-4">
                <h1 className="text-2xl font-semibold">Edit Product</h1>
                <div className=" flex gap-4">
                    <button onClick={() => navigate("/admin/products")} className="px-5 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 transition font-medium">
                        Cancel
                    </button>
                    <button onClick={handleUpdate} disabled={isUpdating} className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-md">
                        Update
                    </button>
                </div>
            </div>
            <div className="w-full flex flex-wrap bg-white shadow-2xl p-5 rounded-lg">
                <div className="w-1/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Product ID</label>
                    <input
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        value={productId}
                        disabled={true}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                </div>

                <div className="w-3/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Name</label>
                    <input
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        value={name}
                        placeholder="Enter product name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="w-full p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">
                        Alternative Names (comma separated)
                    </label>
                    <input
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        value={altNames}
                        placeholder="Enter alternative names (comma separated)"
                        onChange={(e) =>
                            setAltNames(e.target.value)
                        }
                    />
                </div>
                <div className="w-1/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        value={price}
                        placeholder="Enter price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Labelled Price</label>
                    <input
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        value={labelledPrice}
                        placeholder="Enter labelled price"
                        onChange={(e) => setLabelledPrice(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Category</label>
                    <select
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Processor">Processor</option>
                        <option value="Graphics Card">Graphics Card</option>
                        <option value="Motherboard">Motherboard</option>
                        <option value="RAM">RAM</option>
                        <option value="Storage">Storage</option>
                        <option value="SSD">SSD</option>
                        <option value="HDD">HDD</option>
                        <option value="Power Supply">Power Supply</option>
                        <option value="Monitor">Monitor</option>
                        <option value="Keyboard">Keyboard</option>
                        <option value="Mouse">Mouse</option>
                        <option value="Headset">Headset</option>
                        <option value="Speaker">Speaker</option>
                        <option value="Webcam">Webcam</option>
                        <option value="Microphone">Microphone</option>
                        <option value="Printer">Printer</option>
                        <option value="Networking">Networking</option>
                        <option value="Router">Router</option>
                        <option value="Cooling">Cooling</option>
                        <option value="PC Case">PC Case</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Accessory">Accessory</option>
                        <option value="Software">Software</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="w-1/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Images</label>
                    <input
                        type="file"
                        multiple className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        onChange={(e) => setImages(e.target.files)}
                    />
                </div>
                <div className="w-full p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full h-[150px]"
                        value={description}
                        placeholder="Enter product description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Brand</label>
                    <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                    >
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                        <option value=" MSI"> MSI</option>
                        <option value="Google">Google</option>
                        <option value="sony">sony</option>
                        <option value="Acer">Acer</option>
                        <option value="Microsoft">Microsoft</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="w-1/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Model</label>
                    <input
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        value={model}
                        placeholder="Enter model"
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Stock Quantity</label>
                    <input
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        value={stock}
                        placeholder="Enter stock quantity"
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className="w-1/4 p-2  rounded-lg">
                    <label className="block mb-2 font-semibold">Available</label>
                    <select
                        className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                        value={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.value === "true")}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
