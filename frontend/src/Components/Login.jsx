import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import AccountContext from "../Context/AccountContext";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {


  const navigate = useNavigate();
  const [pass1, setPass1] = useState(false);
  const { getSession, authenticate, setUsername } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  


  const handleLogin = (event) => {
    event.preventDefault();
    authenticate(email, password)
      .then((data) => {
        return getSession(); // Chain to wait for the session
      })
      .then((session) => {
        setUsername(session.preferred_username); // Set username in context directly
        localStorage.setItem("username", session.preferred_username);
        setEmail(""); // Clear fields if necessary
        setPassword("");
        toast.success("Login Successful!");
        navigate("/"); // Navigate only after setting the username in localStorage
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login failed. Please try again.");
      });
  };

  return (
    
      <section className="bg-gray-50 dark:bg-black">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-28 lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={pass1 ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <div className="absolute right-3 top-4 cursor-pointer">
                    {pass1 ? (
                      <FaEye onClick={() => setPass1(!pass1)} />
                    ) : (
                      <FaEyeSlash onClick={() => setPass1(!pass1)} />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600"
                    required
                  />
                  <label
                    htmlFor="remember"
                    className="ml-3 text-sm text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  
    
  );
};

export default Login;
