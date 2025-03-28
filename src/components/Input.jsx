import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Input = ({ label, value, id, type, placeholder, setState }) => {
  return (
    <>
      {label ? (<div>
        <label htmlFor={id}>{label}</label>
      </div>) : (null)}
      <input id={id} type={type} name={id} placeholder={placeholder} onChange={(e) => {
        setState(e.target.value)
      }} value={value} />
    </>
  )
}

export default Input