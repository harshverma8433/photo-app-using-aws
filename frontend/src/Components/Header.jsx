import { Link, useNavigate } from "react-router-dom";
import { PiCertificate } from "react-icons/pi";
import { useEffect, useState, useContext } from "react";
import AccountContext from "../Context/AccountContext";
import { RiAccountCircleLine } from "react-icons/ri";
import { TiArrowSortedUp } from "react-icons/ti";

const Header = () => {
  const navigate = useNavigate();
  const { getSession, logout } = useContext(AccountContext);
  const [username, setUsername] = useState();
  const [openAccount, setOpenAccount] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("cecrvf" , username);
  

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    setLoading(false);    
  }, []);
  

  const handleLogout = () => {
    logout();
    setUsername(null);
    localStorage.removeItem("username"); 
    navigate("/login");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <PiCertificate className="text-4xl mt-1" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Certificate App
          </span>
        </a>

        <div className="space-x-10 font-mono flex items-center text-xl">
          <Link to="/">Home</Link>
          {loading ? (
            <span>Loading...</span>
          ) : username ? (
            <div className="relative">
              <div
                onClick={() => setOpenAccount(!openAccount)}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <RiAccountCircleLine className="text-2xl" /> {username}
              </div>
              {openAccount && (
                <div className="absolute">
                  <TiArrowSortedUp className="absolute left-32" />
                  <div className="absolute top-3 bg-gray-900 w-40 flex flex-col justify-center items-center rounded-xl">
                    <div className="hover:bg-gray-500 w-full flex items-center justify-center h-10 cursor-pointer rounded-t-xl">
                      My Profile
                    </div>
                    <div className="hover:bg-gray-500 w-full flex items-center justify-center h-10 cursor-pointer">
                      Edit Profile
                    </div>
                    <div
                      onClick={handleLogout}
                      className="hover:bg-gray-500 w-full flex items-center justify-center h-10 cursor-pointer rounded-b-xl"
                    >
                      LogOut
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
