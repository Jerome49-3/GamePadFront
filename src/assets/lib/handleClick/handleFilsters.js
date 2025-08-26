const handleFilters = async (e, axios, setData, setIsLoading, ordering) => {
  e.preventDefault();
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_URL}/games?&ordering=${ordering}`
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
export default handleFilters;
