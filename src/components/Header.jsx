/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import Cookies from "js-cookie";

//lib
import setDimensions from "../assets/lib/setDimensions";
import addRemoveListener from "../assets/lib/addRemoveListener";
//components
import Input from "./Input";
import Links from "./Links";
import Button from "./Button";

const Header = ({
  showSignup,
  setShowSignup,
  showLogin,
  setShowLogin,
  token,
  setToken,
  search,
  setSearch,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  controlFour,
  alt,
  classImg,
  showSearch,
  dimWindows,
  setDimWindows,
}) => {
  console.log("%cToken:", "color: orangered", token);
  console.log("%cDimWindows:", "color: red", dimWindows);
  console.log("%cImgControlFour:", "color: red", controlFour);
  const handleShowSignup = () => {
    showSignup === false ? setShowSignup(true) : setShowSignup(false);
  };
  const handleShowLogin = () => {
    showLogin === false ? setShowLogin(true) : setShowLogin(false);
  };
  // const navigate = useNavigate();
  //location
  let location = useLocation();
  const handleLogout = () => {
    Cookies.remove("gamePad");
    setToken(null);
    <Navigate to="/" />;
  };
  useEffect(() => {
    return addRemoveListener("resize", setDimensions, setDimWindows);
  }, [location.pathname]);

  useEffect(() => {
    return addRemoveListener("load", setDimensions, setDimWindows);
  }, [location.pathname]);
  // const handleLink = () => {
  //   const path = '/';
  //   navigate(path);
  // }

  return (
    <header>
      <div className="wrapper">
        {dimWindows.width > 768 ? (
          <Links
            path="/"
            src={controlFour}
            alt={alt}
            classImg={classImg}
            classLinkText="h1Header"
            linkText="GamePad"
            classLink="logo"
          />
        ) : (
          <Links
            path="/"
            icon={icon4}
            classIcon="iconGam"
            classLinkText="h1Header"
            linkText="GamePad"
            classLink="logo"
          />
        )}

        <nav>
          {showSearch && (
            <div className="boxSearch">
              <FontAwesomeIcon icon={icon1} />
              <Input setState={setSearch} state={search} />
            </div>
          )}
          <ul>
            {token ? (
              <li>
                <Link to="/games/favorites">
                  <FontAwesomeIcon icon={icon2} className="iconFav" />
                  <div className="infobulle">
                    <h3 className="linkFav">Favorites</h3>
                  </div>
                </Link>
              </li>
            ) : null}

            <li>
              {token ? (
                <Button
                  classButton="buttonLogout"
                  handleClick={handleLogout}
                  icon={icon6}
                  classIcon="iconLogout"
                  classInfo="infobulle"
                  classInfoText="linkLogout"
                  infoText="Logout"
                />
              ) : (
                <>
                  <Button
                    classButton="buttonSignup"
                    handleClick={handleShowSignup}
                    icon={icon5}
                    classIcon="iconSignup"
                    classInfo="infobulle"
                    classInfoText="Signup"
                    infoText="Signup"
                  />
                  <Button
                    classButton="buttonLogin"
                    handleClick={handleShowLogin}
                    icon={icon3}
                    classIcon="iconLogin"
                    classInfo="infobulle"
                    classInfoText="Login"
                    infoText="Login"
                  />
                  {/* <Link to='/login'>
                      <FontAwesomeIcon icon={icon3} className="iconLogin" />
                      <div className="infobulle">
                        <h3 className="linkLogin">Login</h3>
                      </div>
                    </Link> */}
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
