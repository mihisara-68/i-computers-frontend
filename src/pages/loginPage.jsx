import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {

    axios.post(import.meta.env.VITE_API_URL + "/users/login", {
      email,
      password,
    })
      .then((response) => {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token);

        if (response.data.isAdmin) {
          //window.location.href = "/admin";

          navigate("/admin");
        } else {
          //window.location.href = "/";
          navigate("/");
        }
      })
      .catch((error) => {
        //alert(error.response.data.message);
        toast.error(error.response.data.message);
      });
  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-[url("login-bg.jpg")] bg-center bg-cover'>
      <div className="w-1/2 h-full"></div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-[400px] h-[500px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">
          <h1 className="text-4xl text-secondary font-bold mb-8">sign in</h1>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            value={email}
            placeholder="email"
            className="w-3/4 h-12 mb-6 px-4 rounded-lg border border-5a7aa1 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="password"
            className="w-3/4 h-12 px-4 rounded-lg border border-5a7aa1 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="mb-6 w-3/4 text-right text-white">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-accent hover:underline">
              Click here
            </Link>
          </p>
          <button
            onClick={handleLogin}
            className="w-3/4 h-12 bg-accent text-white rounded-lg "
          >
            sign in
          </button>
          <p className="mt-6 text-white">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
