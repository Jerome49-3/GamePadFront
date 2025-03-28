import React from 'react'

const TextArea = ({ setState, value, name, placeholder, classTxtArea, rows, cols, minlength, maxLength }) => {
  return (
    <textarea value={value} name={name} id={name} placeholder={placeholder} className={classTxtArea} onChange={(e) => {
      setState(e.target.value)
    }} autoCorrect='on' autoCapitalize='on' rows={rows} cols={cols} minLength={minlength} maxLength={maxLength}></textarea>
  )
}

export default TextArea