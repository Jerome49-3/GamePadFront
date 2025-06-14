const fetchDataGame = async (axios, id, setData, setDate, setIsLoading) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}/game/${id}`
    );
    if (response) {
      setData(response.data.game);
      console.log(
        "%cResponse.data in first useEffect:",
        "color: cyan",
        response.data
      );
      setDate(response.data.date);
      setIsLoading(false);
    }
  } catch (error) {
    console.log("error.response:", error.response);
  }
};
export default fetchDataGame;
