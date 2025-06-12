import Input from "./Input";
import EyePassword from "./EyePassword";

const InputPassword = ({
  faEye,
  faEyeSlash,
  type,
  setType,
  password,
  setPassword,
  errorMessage,
  setErrorMessage,
  placeholder,
  id,
}) => {
  return (
    <div className="boxPsswd">
      <Input
        id={id}
        value={password || ""}
        type="password"
        placeholder={placeholder}
        setState={setPassword}
        autocomplete="on"
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <div className="boxIcons">
        <EyePassword
          faEye={faEye}
          faEyeSlash={faEyeSlash}
          type={type}
          setType={setType}
        />
      </div>
    </div>
  );
};

export default InputPassword;
