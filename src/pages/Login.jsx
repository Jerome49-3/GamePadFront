import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

//components
import Input from "../components/Input";
import HowItWorks from "../components/HowItWorks";
import EyePassword from "../components/EyePassword";

const Login = ({
  setToken,
  errorMessage,
  setErrorMessage,
  controlFour,
  showLogin,
  setShowLogin,
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  type1,
  setType1,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/user/login`,
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        // console.log(response.data.token);
        Cookies.set("gamePad", response.data.token, {
          expires: 15,
          secure: true,
        });
        setToken(response.data.token);
        setShowLogin(false);
        navigate("/");
      }
    } catch (error) {
      console.log("error:", error.response);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <div className="boxModal">
        <div className="boxModalContent">
          <div className="boxModalContent__left">
            <HowItWorks
              show={showLogin}
              setShow={setShowLogin}
              icon1={icon3}
              icon2={icon4}
              icon3={icon5}
              controlFour={controlFour}
            />
          </div>
          <div className="boxModalContent__right boxLogin">
            <form onSubmit={handleSubmit}>
              <Input
                id="email"
                type="email"
                placeholder="email@test.com"
                value={email}
                setState={setEmail}
              />
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                setState={setPassword}
              />
              <EyePassword
                icon1={icon1}
                icon2={icon2}
                state={type1}
                setState={setType1}
              />
              <Input type="submit" value="login" icon1={icon1} icon2={icon2} />
            </form>
            <div className="errorMessage">
              {errorMessage && <p className="red">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
