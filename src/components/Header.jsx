import React from 'react';
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";

function Header({ loggedIn, email, onLogout }) {

  const location = useLocation();
  const linkText = location.pathname === "/sign-in" ? "Регистрация" : "Войти";
  const buttonText = loggedIn ? "Выйти" : linkText;
  
  return (
    <header className="header">
      <div className="header__logo"/>
      <div className="header__links">
        {loggedIn && <p className="header__email">{email}</p>}
        <Routes>
          <Route path="/sign-up" element={
            <Link to="/sign-in" className="header__link header__button">
              Войти
            </Link>
          }
          />
          <Route path="/sign-in" element={
            <Link to="/sign-up" className="header__link header__button">
              Регистрация
            </Link>
          }
          />
          <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"} />} />
        </Routes>
        {loggedIn && (<button className="header__link header__button" onClick={onLogout}>
          {buttonText}
        </button>
        )}
      </div>
    </header>
  )
}

export default Header 