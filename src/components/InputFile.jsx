const InputFile = ({ labelTxt, setState }) => {
  return (
    <div className="boxPictures">
      <label htmlFor="pictures">
        {labelTxt}
        <input
          type="file"
          id="pictures"
          name="pictures"
          onChange={(e) => {
            console.log("e.target.files:", e.target.files[0]);
            setState(e.target.files[0]);
          }}
        />
        {/* {pictures ? <div>{pictures.name}</div> : null} */}
      </label>
    </div>
  );
};

export default InputFile;
