import { useState } from "react";

export default function ImageSlidesShow(props) {
    const [activeimage, setActiveImage] = useState(0);
    const images = props.images || [];

    return (
        <div className="w-125 h-150 flex flex-col items-center justify-center gap-4">
            <img className="w-full aspect-square object-cover" src={images[activeimage]} alt="Product" />
            <div className="w-full h-25 flex items-center justify-center gap-4">
                {
                    images.map(
                        (item, index) => {
                            return (
                                <img className={"w-20 aspect-square object-cover cursor-pointer rounded-lg " + (index == activeimage ? "border-2 border-black" : "")}
                                    onClick={
                                        () => {
                                            setActiveImage(index)
                                        }
                                    }
                                    src={item} key={index}
                                />
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}