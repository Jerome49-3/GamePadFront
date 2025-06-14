/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
// import { v4 as uuidv4 } from "uuid";

//components
import Image from "../components/Image";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import Select from "../components/Select";

const Home = ({
  count,
  setCount,
  search,
  page,
  setPage,
  items,
  setShowSearch,
  // platforms,
  dimWindows,
  setPlatforms,
  platformsArr,
  setPlatformsArr,
  genresArr,
  setGenresArr,
  // genres,
  setGenres,
  noImg,
  setSelectOrdering,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const search_exact = true;
  // console.log("page:", page);
  // console.log('platforms in Home:', platforms);
  // console.log('typeGame in Home:', typeGame);

  //dates:
  const date1 = "2024-01-01";
  // console.log('date1:', date1);
  // console.log('typeof date1:', typeof date1);
  const date2 = moment().add(364, "days").format("YYYY-MM-DD");
  // console.log('date2:', date2);
  // console.log('typeof date2:', typeof date2);
  const year2024 = date1 + "," + date2;
  const dates = year2024;
  // console.log('dates:', dates);
  // console.log('typeof dates:', typeof dates);

  //Sort
  const ordering = [
    "name",
    "released",
    "added",
    "created",
    "updated",
    "rating",
    "metacritic",
    "-name",
    "-released",
    "-added",
    "-created",
    "-updated",
    "-rating",
    "-metacritic",
  ];

  //useEffect
  useEffect(() => {
    setShowSearch(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_URL
          }/games?&page=${page}&dates=${dates}&search=${search}&search_exact=${search_exact}`
        );
        if (response) {
          // console.log('response:', response);
          // console.log('response.data in Home:', response.data);
          // console.log('response.data.results in Home:', response.data.results);
          setData(response.data.results);
          // console.log('data in Home:', data);
          const counter = response.data.count;
          // console.log('counter:', counter);
          setCount(counter);
          // console.log('count:', count);
          if (search && data) {
            console.log("data in ifData inside UseEffects in Home:", data);
            try {
              let newPlatforms = [];
              let newTypeGame = [];

              data.forEach((datas) => {
                datas.platforms.forEach((platform) => {
                  // console.log('platform inside forEach in useEffect in Home:', platform);
                  newPlatforms.push(
                    platform.platform.name + " " + platform.platform.id
                  );
                });
              });
              // console.log('newPlatforms inside useEffect in Home:', newPlatforms);
              const osPlatforms = [...new Set(newPlatforms)];
              // console.log('osPlatforms inside useEffect in Home:', osPlatforms);
              setPlatformsArr(osPlatforms);
              // console.log('platformsArr inside useEffect in Home:', platformsArr);

              data.forEach((datas) => {
                datas.genres.forEach((genre) => {
                  // console.log('genre inside forEach in useEffect in Home:', genre);
                  newTypeGame.push(genre.name);
                });
              });
              // console.log('newTypeGame inside useEffect in Home:', newTypeGame);
              const genresGames = [...new Set(newTypeGame)];
              // console.log('genresGames inside useEffect in Home:', genresGames);
              setGenresArr(genresGames);
              // console.log('typeGame inside useEffect in Home:', typeGame);
            } catch (error) {
              console.log("error:", error);
            }
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error.response:", error.response);
      }
    };
    fetchData();
  }, [search, search_exact, dates, page, platformsArr, genresArr]);

  return isLoading ? (
    <Loading />
  ) : (
    <main>
      <div className="wrapper">
        {search ? (
          <div className="boxSearchFilters">
            <div className="boxSearch">
              <p>Search result for "{search}"</p>
              <p>{count} games</p>
            </div>
            <form className="boxFilters">
              <div className="boxFiltersPlatformType">
                <div className="filterPlatform">
                  <Select
                    htmlFor="Platform"
                    labelTxt="Platform:"
                    stateMap={platformsArr}
                    state={setPlatforms}
                    txtDefault="All"
                  />
                </div>
                <div className="filterType">
                  <Select
                    htmlFor="Type"
                    labelTxt="Type:"
                    stateMap={genresArr}
                    state={setGenres}
                    txtDefault="All"
                  />
                </div>
              </div>
              <div className="boxSortSubmit">
                <div className="filterSort">
                  <Select
                    htmlFor="Sort"
                    labelTxt="Sort:"
                    stateMap={ordering}
                    state={setSelectOrdering}
                    txtDefault="Default"
                  />
                </div>
                <Button buttonText="Go Filters !" />
              </div>
            </form>
          </div>
        ) : (
          <div className="boxDisplayCount">
            <p>{count} games</p>
          </div>
        )}

        <div className="boxCards">
          {data.map((games, key = data.id) => {
            // console.log('games:', games);
            const id = games.id;
            // console.log('id:', id);
            return (
              <Link to={`/game/${id}`} key={key}>
                {games.background_image ? (
                  <Image src={games.background_image} alt={games.name} />
                ) : games.background_image_additional ? (
                  <Image
                    src={games.background_image_additional}
                    alt={data.name}
                  />
                ) : (
                  <Image src={noImg} alt="no image" />
                )}
                <div>
                  <h3>{games.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
        <Pagination count={count} items={items} page={page} setPage={setPage} />
      </div>
      <Footer />
    </main>
  );
};

export default Home;
