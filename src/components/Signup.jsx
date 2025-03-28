import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

//components
import Input from './Input';
import InputFile from './InputFile';
import EyePassword from './EyePassword';
import HowItWorks from './HowItWorks';

const SignUp = ({ showSignup, setShowSignup, icon1, icon2, icon3, icon4, icon5, setToken, errorMessage, setErrorMessage, type1, setType1, type2, setType2, controlFour }) => {
  // console.log('show:', show, '\n', 'setShow:', setShow, '\n', 'icon1:', icon1, '\n', 'icon3:', icon3, '\n', 'setToken:', setToken);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pictures, setPictures] = useState({});
  console.log('pictures:', pictures);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // console.log('e.target.file', e.target.file)
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('pictures', pictures);
    console.log(
      "password:",
      password,
      "\n",
      "username:",
      username,
      "\n",
      "confirmPassword:",
      confirmPassword,
      "\n",
      "email:",
      email,
      "\n",
      "pictures:",
      pictures
    );
    try {
      const response = await axios.post('http://localhost:3000/user/signup',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      // console.log('response1:', response)
      if (response) {
        // console.log('response after if:', response);
        Cookies.set('gamePad', response.data.token, { expires: 15 });
        // console.log('response.data.token:', response.data.token);
        setToken(response.data.token);
        // console.log('token:', token);
        alert('User created');
        setShowSignup(false);
        // console.log('show:', show);
        navigate("/");
      }
    } catch (error) {
      console.log('error:', error);
      setErrorMessage(error.response.data.message);
      console.log('error.response.data.message:', error.response.data.message);
    }
  }

  return (
    <div className='boxModal'>
      <div className='boxModalContent'>
        <div className="boxModalContent__left">
          <HowItWorks show={showSignup} setShow={setShowSignup} icon1={icon3} icon2={icon4} icon3={icon5} controlFour={controlFour} />
        </div>
        <div className="boxModalContent__right">
          <form onSubmit={handleSubmit} className='boxForm'>
            <Input value={username} id="username" type="text" placeholder="Username" setState={setUsername} autocomplete="on" />
            <Input value={email} id="email" type="email" placeholder="Email" setState={setEmail} autocomplete="on" />
            <div className="boxPsswd">
              <div className="inputPsswd">
                <Input value={password} id="password" type={type1} placeholder="password" setState={setPassword} autocomplete="on" />
                <EyePassword icon1={icon1} icon2={icon2} state={type1} setState={setType1} />
              </div>
              <div className="inputConfPsswd">
                <Input value={confirmPassword} id="confirmPassword" type={type2} placeholder="Confirm password" setState={setConfirmPassword} autocomplete="on" />
                <EyePassword icon1={icon1} icon2={icon2} state={type2} setState={setType2} />
              </div>
            </div>
            <InputFile labelTxt='add your avatar' pictures={pictures} setState={setPictures} />
            <Input type="submit" value="S'inscrire" />
          </form>
          <div className="errorMessage">
            {errorMessage && <p className="red">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
