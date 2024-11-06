import {Routes , Route} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AccountState from "./States/AccountState" 
import VerifyAccount from "./Components/VerifyAccount";
import AdminDashBoard from "./Components/AdminDashBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (

    <div>
      <ToastContainer/>
      <div className="bg-black min-h-screen text-white">
      <AccountState>
        <Header/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/> }/>
          <Route path="/register" element={  <Register/> }/>
          <Route path="/verify-account" element={<VerifyAccount/> } />
          <Route path="/admin" element={ <AdminDashBoard/> } />

        </Routes>

        </AccountState>

    </div>
    </div>
  
  )
}

export default App;