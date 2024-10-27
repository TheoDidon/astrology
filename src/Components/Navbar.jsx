import React, { useState, useEffect } from "react";
import LanguageBtn from "./LanguageBtn";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../app/service/auth";

function Navbar({ isFrench, refreshToken }) {
  const navigate = useNavigate();

  const [logout, { isSuccess: isLogoutSuccess }] = useLogoutMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (refreshToken) setIsLoggedIn(true);
  }, [refreshToken]);

  useEffect(() => {
    if (isLogoutSuccess) {
      console.log("Logout success, navigating to home page");
      navigate("/");
    }
  }, [isLogoutSuccess, navigate]);

  const handleLogout = async () => {
    try {
      await logout({ refreshToken }).unwrap();
      window.location.reload();
    } catch (err) {
      console.error("Logout error: ", err);
    }
  };

  function logoutButton() {
    return isFrench ? (
      <button onClick={handleLogout}>Se déconnecter</button>
    ) : (
      <button onClick={handleLogout}>Logout</button>
    );
  }

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full bg-transparent p-4 z-50">
      <div>
        <LanguageBtn />
      </div>
      <ul className="flex justify-end p-4 text-xl">
        <li className="px-4">
          <Link to="/" className="text-white">
            {isFrench ? <span>A propos</span> : <span>About</span>}
          </Link>
        </li>
        <li className="px-4">
          <Link to="/" className="text-white">
            {isFrench ? <span>Ton signe</span> : <span>Your sign</span>}
          </Link>
        </li>
        <li className="px-4">
          <Link to="/" className="text-white">
            {isFrench ? <span>Prix</span> : <span>Prices</span>}
          </Link>
        </li>
        <li className="px-4">
          {isLoggedIn ? (
            logoutButton()
          ) : (
            <Link to="/login" className="text-white">
              {isFrench ? <span>Se connecter</span> : <span>Login</span>}
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
