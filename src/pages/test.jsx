import { useState } from "react";
import { DiAndroid } from "react-icons/di";

export default function TestPage() {
  const [emotion, setEmotion] = useState("😊");

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-primary text-secondary ">
      <div className="w-[400px] h-[400px] border-[5px] flex justify-center items-center text-5xl">
        {emotion}
      </div>

      <div className="w-[300px] flex flex-row justify-center">
        <button
          onClick={() => {
            setEmotion("😢");
          }}
          className="bg-accent w-[70px] h-[40px] text-white border border-primary"
        >
          sad
        </button>
        <button
          onClick={() => {
            setEmotion("😊");
          }}
          className="bg-accent w-[70px] h-[40px] text-white border border-primary"
        >
          happy
        </button>
        <button
          onClick={() => {
            setEmotion("😠");
          }}
          className="bg-accent w-[70px] h-[40px] text-white border border-primary"
        >
          angry
        </button>
      </div>
    </div>
  );
}
