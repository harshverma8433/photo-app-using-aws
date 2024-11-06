import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import AccountContext from "../Context/AccountContext";
import { useNavigate } from "react-router-dom";
import VerifyAccount from "./VerifyAccount";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [pass1, setpass1] = useState(false);
  const [pass2, setpass2] = useState(false);

  const { signup } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistration = (event) => {
    event.preventDefault();
    signup(email, username, password)
      .then(() => {
        toast.success("Otp Sent SuccessFully");
        setIsRegistered(true);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div>
      <div>
        {!isRegistered ? (
          <section className="bg-gray-50 dark:bg-black ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-12 lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign Up to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleRegistration}
                  >
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        User Name
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(event) => setusername(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="UserName"
                        required=""
                      />
                    </div>

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
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
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
                          value={password}
                          onChange={(event) => setpassword(event.target.value)}
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                        />
                        <div className="cursor-pointer">
                          {pass1 ? (
                            <FaEye
                              onClick={() => setpass1(!pass1)}
                              className="absolute right-3 top-4"
                            />
                          ) : (
                            <FaEyeSlash
                              onClick={() => setpass1(!pass1)}
                              className="absolute right-3 top-4"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <div className="relative flex">
                        <input
                          type={pass2 ? "text" : "password"}
                          name="confirm-password"
                          id="confirm-password"
                          value={cpassword}
                          onChange={(event) => setCpassword(event.target.value)}
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                        />
                        <div className="cursor-pointer">
                          {pass2 ? (
                            <FaEye
                              onClick={() => setpass2(!pass2)}
                              className="absolute right-3 top-4"
                            />
                          ) : (
                            <FaEyeSlash
                              onClick={() => setpass2(!pass2)}
                              className="absolute right-3 top-4"
                            />
                          )}
                        </div>{" "}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500"
                    >
                      Sign Up
                    </button>
                    <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400">
                      Already have an account yet?{" "}
                      <Link
                        to="/login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign in
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <VerifyAccount email={email} />
        )}
      </div>
    </div>
  );
};

export default Register;
