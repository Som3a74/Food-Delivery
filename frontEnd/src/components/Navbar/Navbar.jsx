/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { useContext } from "react";
// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate()

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className="navbar">
      <Link to={"/"}>  <h2 className="logo"> Delli-Food </h2></Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        ></a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile
        </a>

        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
      
        <div className="navbar-search-icon">
          <Link to="/cart">
            {" "}
            <img src={assets.basket_icon} alt="" />{" "}
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/MyOrders')}><img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }

      </div>
    </div>
  );
};

export default Navbar;
