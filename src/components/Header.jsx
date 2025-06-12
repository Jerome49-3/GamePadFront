import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

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
  src,
  alt,
  classImg,
  showSearch,
}) => {
  const handleShowSignup = () => {
    showSignup === false ? setShowSignup(true) : setShowSignup(false);
  };
  const handleShowLogin = () => {
    showLogin === false ? setShowLogin(true) : setShowLogin(false);
  };
  // const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("gamePad");
    setToken(null);
    <Navigate to="/" />;
  };

  // const handleLink = () => {
  //   const path = '/';
  //   navigate(path);
  // }

  return (
    <header>
      <div className="wrapper">
        {/* <Button src={src} alt={alt} classImg={classImg} buttonText='GamePad' classButton='logo' handleClick={handleLink} /> */}
        <Links
          path="/"
          src={src}
          alt={alt}
          classImg={classImg}
          icon={icon4}
          classIcon="iconGam"
          classLinkText="h1Header"
          linkText="GamePad"
          classLink="logo"
        />
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
