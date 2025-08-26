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
// import Select from "../components/Select";
import Option from "../components/Option";
// import handleFilters from "../assets/lib/handleClick/handleFilsters";

const Home = ({
  count,
  setCount,
  search,
  page,
  setPage,
  items,
  setShowSearch,
  platformsSorted,
  setPlatformsSorted,
  platforms,
  setPlatforms,
  genresSorted,
  setGenresSorted,
  genres,
  setGenres,
  noImg,
  ordering,
  setOrdering,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // console.log("isLoading in Home:", isLoading);
  const search_exact = true;
  // console.log("page:", page);
  console.log("platforms in Home:", platforms);
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
  const orderingSorted = [
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
          }/games?&page=${page}&page_size=${items}&dates=${dates}&search=${search}&search_exact=${search_exact}`
        );
        if (response.data) {
          // console.log('response:', response);
          console.log("response.data in Home:", response.data);
          // console.log('response.data.results in Home:', response.data.results);
          setData(response?.data?.results);
          // console.log('data in Home:', data);
          const counter = response.data.count;
          // console.log('counter:', counter);
          setCount(counter);
          // console.log('count:', count);
          setIsLoading(false);
        } else {
          console.log("no response:");
        }
      } catch (error) {
        console.log("error.response:", error.response);
      }
    };
    fetchData();
  }, [search, search_exact, dates, page]);

  // useEffect(() => {
  //   if (isLoading !== true) {

  //     let newGenres = [];
  //     for (let i = 0; i < data.length; i++) {
  //       const elData = data[i];
  //       // console.log("%cElData in Home:", "color: cyan", elData);
  //       const genresArr = elData.genres;
  //       for (let j = 0; j < genresArr.length; j++) {
  //         const elGenre = genresArr[j];
  //         // console.log("%cElGenre in Home:", "color: cyan", elGenre);
  //         const objGenre = elGenre.platform;
  //         // console.log("%cobjGenre in Home:", "color: yellow", objGenre);
  //         newGenres.push(objGenre);
  //         console.log("%cnewGenres in Home:", "color: red", newGenres);
  //       }
  //     }
  //     const osPlatforms = platforms.filter(
  //       (el, index, elAgain) =>
  //         index === elAgain.findIndex((find) => find.id === el.id)
  //     );
  //     const osGenres = newGenres.filter(
  //       (el, index, elAgain) =>
  //         index === elAgain.findIndex((find) => find.id === el.id)
  //     );
  //     console.log("%cOsPlatforms in Home:", "color: orangered", osPlatforms);
  //     // const isArray = Array.isArray(osPlatforms);
  //     // console.log("%cisArray in Home:", "color: orangered", isArray);
  //     setPlatformsSorted(osPlatforms);
  //     setGenresSorted(osGenres);
  //   }
  // }, [isLoading]);
  useEffect(() => {
    if (isLoading !== true) {
      // console.log(
      //   "%cisLoading in useEffectPlatforms Home:",
      //   "color: cyan",
      //   isLoading
      // );
      let platforms = [];
      for (let i = 0; i < data.length; i++) {
        const elData = data[i];
        // console.log("%cElData in Home:", "color: cyan", elData);
        const platformsArr = elData.platforms;
        for (let j = 0; j < platformsArr.length; j++) {
          const elPlatform = platformsArr[j];
          // console.log("%cElPlatform in Home:", "color: cyan", elPlatform);
          const objPlatform = elPlatform.platform;
          // console.log("%cobjPlatform in Home:", "color: yellow", objPlatform);
          platforms.push(objPlatform);
          // console.log("%cPlatforms in Home:", "color: red", platforms);
        }
      }
      const osPlatforms = platforms.filter(
        (el, index, elAgain) =>
          index === elAgain.findIndex((find) => find.id === el.id)
      );
      setPlatformsSorted(osPlatforms);
    }
  }, [isLoading]);

  return isLoading ? (
    <Loading />
  ) : (
    <main>
      <div className="wrapper">
        {search && (
          <div className="boxSearchFilters">
            <div className="boxSearch">
              <p>Search result for "{search}"</p>
              <p>{count} games</p>
            </div>
          </div>
        )}
        <form className="boxFilters">
          <div className="boxFiltersPlatformType">
            <div className="filterPlatform">
              <label htmlFor="Platform">Platform</label>
              <select
                name="Platform"
                id="Platform"
                onChange={(e) => {
                  setPlatforms(e.target.value);
                }}
              >
                <Option value="" txtOption="All" />
                {platformsSorted && (
                  <>
                    {platformsSorted.map((item, index) => {
                      // console.log("item platformsSorted in select:", item);
                      return (
                        <Option
                          value={item.id}
                          txtOption={item.name}
                          key={index}
                        />
                      );
                    })}
                  </>
                )}
              </select>
            </div>
            <div className="filterType">
              <label htmlFor="Genre">Genre</label>
              <select
                name="Genre"
                id="Genre"
                onChange={(e) => {
                  setGenres(e.target.value);
                }}
              >
                <Option value="" txtOption="All" />
                {genresSorted && (
                  <>
                    {genresSorted.map((item, index) => {
                      // console.log("item genresSorted in select:", item);
                      return (
                        <Option
                          value={item.id}
                          txtOption={item.name}
                          key={index}
                        />
                      );
                    })}
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="boxSortSubmit">
            <div className="filterSort">
              <label htmlFor="ordering">Ordering</label>
              <select
                name="Ordering"
                id="Ordering"
                onChange={(e) => {
                  setOrdering(e.target.value);
                }}
              >
                <Option value="" txtOption="All" />
                {orderingSorted && (
                  <>
                    {orderingSorted.map((item, index) => {
                      // console.log("item orderingSorted in select:", item);
                      return (
                        <Option
                          value={item.id}
                          txtOption={item.name}
                          key={index}
                        />
                      );
                    })}
                  </>
                )}
              </select>
            </div>
            <Button
              buttonText="Go Filters !"
              handleClick={() => {
                const fetchDataFilters = async () => {
                  try {
                    const response = await axios.get(
                      `${
                        import.meta.env.VITE_REACT_APP_URL
                      }/games?&page=${page}&page_size=${items}&dates=${dates}&search=${search}&search_exact=${search_exact}&platforms=${platforms}&=${genres}&=${ordering}`
                    );
                    if (response) {
                      setData(response?.data?.results);
                      console.log(
                        "%cResponse.data in useEffect:",
                        "color: cyan",
                        response.data.game
                      );
                      setIsLoading(false);
                    } else {
                      console.log("no response");
                    }
                  } catch (error) {
                    console.log("error.response:", error.response);
                  }
                };
                fetchDataFilters();
              }}
            />
          </div>
        </form>
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
