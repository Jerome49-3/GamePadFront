const listenDim = (listenDiv, setdivHeight) => {
  const infoDiv = listenDiv.current.getBoundingClientRect();
  // console.log("%cListenDim:", "color: red", infoDiv);
  const divInfoHeight = infoDiv.height.toFixed(2).toString() + "px";
  // console.log("%cDivInfoHeight:", "color: yellow", divInfoHeight);
  setdivHeight(
    document.documentElement.style.setProperty("--divHeight", divInfoHeight)
  );
};
export default listenDim;
