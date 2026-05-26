import { useState } from "react";
import uploadMedia from "../../utils/mediaUpload";

export default function TestPage() {
  const [file, setFile] = useState(null);

  async function handleUpload() {


    try {
      const url = await uploadMedia(file);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-primary text-secondary ">
      <input onChange={(e) => setFile(e.target.files[0])} type="file" />
      <button
        onClick={handleUpload}
        className="bg-accent text-white px-4 py-2 rounded-md"
      >
        Upload
      </button>
    </div>
  );
}
