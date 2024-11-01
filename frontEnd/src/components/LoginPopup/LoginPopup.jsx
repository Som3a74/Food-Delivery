import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import PropTypes from "prop-types";
import { StoreContext } from './../../Context/StoreContext';
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const { url , setToken} = useContext(StoreContext)

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))

  }
  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data)

    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem('token', response.data.token)
      console.log('login');
      
      setShowLogin(false)
    }else{
      alert(response.data.message)
    }

  }


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            onClick={() => setShowLogin(false)}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <> </>
          ) : (
            <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your Name" required />
          )}
          <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your Email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          {currentState === "Sign Up" ? (
            <>
              {" "}
              <input type="checkbox" required />{" "}
              <p>I agree to the terms and conditions</p>
            </>
          ) : (
            <> </>
          )}{" "}
          <></>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a New Foodie Account{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>{" "}
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};
LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
