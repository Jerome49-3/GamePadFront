const fetchDataUser = async (axios, id, setData, setDate, setIsLoading) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}/game/${id}`
    );
    if (response) {
      setData(response.data.game);
      console.log("response.data in first useEffect:", response.data);
      setDate(response.data.date);
      setIsLoading(false);
    }
  } catch (error) {
    console.log("error.response:", error.response);
  }
};
export default fetchDataUser;
