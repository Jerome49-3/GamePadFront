const fetchNextPage = async (axios, setData, setIsLoading) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}/nextPage`
    );
    if (response) {
      setData(response.data);
      console.log(
        "%cResponse.data in useEffect:",
        "color: cyan",
        response.data
      );
      setIsLoading(false);
    }
  } catch (error) {
    console.log("error.response:", error.response);
  }
};
export default fetchNextPage;
