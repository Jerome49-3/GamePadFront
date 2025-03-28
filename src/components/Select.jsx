import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

//components:
import Option from "./Option";

const Select = ({ htmlFor, labelTxt, txtDefault, state, stateMap }) => {

  return (
    <>
      <label htmlFor={htmlFor}>{labelTxt}</label>
      <select name={htmlFor} id={htmlFor} onChange={(e) => {
        state(e.target.value);
      }}>
        <Option value="" txtOption={txtDefault} />
        {stateMap && <>
          {stateMap.map((item, key = uuidv4()) => {
            // console.log('item in select:', item);
            return (
              <Option value={item} txtOption={item} key={key} />
            )
          })}
        </>}
      </select>
    </>
  )
}

export default Select