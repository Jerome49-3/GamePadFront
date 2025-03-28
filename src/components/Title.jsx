
const Title = (props) => {
  const { title, classTxt } = props;
  return (
    <>
      <h1 className={classTxt}>
        {title}
      </h1>
    </>
  )
}

export default Title