import React from 'react';
import { Routes, Route, Link} from "react-router-dom";

function Header({ loggedIn, onLogout }) {

  const buttonText = loggedIn ? "Выйти" : "";
  
  return (
    <header className="header">
      <div className="header__logo"/>
      <div className="header__links">
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