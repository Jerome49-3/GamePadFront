import "./assets/scss/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//import FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faBookmark,
  faRightToBracket,
  faRightFromBracket,
  faGamepad,
  faComment,
  faEye,
  faEyeSlash,
  faUserPlus,
  faHeart,
  faUser,
  faThumbsUp,
  faThumbsDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMagnifyingGlass,
  faBookmark,
  faUserPlus,
  faRightToBracket,
  faRightFromBracket,
  faGamepad,
  faComment,
  faEye,
  faEyeSlash,
  faHeart,
  faUser,
  faThumbsUp,
  faThumbsDown,
  faTrash
);

// import Pages
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Game from "./pages/Game";

//import components
import Header from "./components/Header";
import Signup from "./components/Signup";

//import images
import controlFour from "/images/crossRed.png";
import noImg from "/images/noImg.png";
import Attributions from "./pages/Attributions";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  // const [platforms, setPlatforms] = useState("");
  const [dimWindows, setDimWindows] = useState({});
  const [ordering, setOrdering] = useState("");
  // console.log("ordering in App:", ordering);
  const [count, setCount] = useState(0);
  // const [fav, setFav] = useState(Cookies.get('favorites') || []);
  // meme useState avec JSON.parse en retour
  const [fav, setFav] = useState(() => {
    const savedFav = Cookies.get("Collections");
    try {
      // console.log("JSON.parse(savedFav):", JSON.parse(savedFav));
      return JSON.parse(savedFav);
    } catch (e) {
      console.error("Invalid JSON in cookie: ", e);
      return [];
    }
  });
  //test avec un autre cookie à recupérer:
  // const [fav, setFav] = useState([Cookies.get('gamePad')]|| null);
  // console.log('fav in app:', fav);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [token, setToken] = useState(Cookies.get("gamePad") || null);
  const [page, setPage] = useState(1);
  const [platformsSorted, setPlatformsSorted] = useState([]);
  const [platforms, setPlatforms] = useState(null);
  // console.log('platformsArr in app:', platformsArr);
  const [genresSorted, setGenresSorted] = useState([]);
  const [genres, setGenres] = useState(null);
  // console.log("platforms in App:", platforms);
  // console.log("genres in App:", genres);
  // console.log('genresArr in app:', genresArr);
  const items = 20;

  return (
    <>
      <Router>
        <Header
          setSearch={setSearch}
          search={search}
          showSearch={showSearch}
          count={count}
          setCount={setCount}
          icon1="magnifying-glass"
          controlFour={controlFour}
          alt="control GamePad"
          classImg="imgHeader"
          icon2={faBookmark}
          icon3={faRightToBracket}
          icon4={faGamepad}
          icon5={faUserPlus}
          icon6={faRightFromBracket}
          showSignup={showSignup}
          setShowSignup={setShowSignup}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          token={token}
          setToken={setToken}
          fav={fav}
          dimWindows={dimWindows}
          setDimWindows={setDimWindows}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                count={count}
                setCount={setCount}
                setSearch={setSearch}
                search={search}
                items={items}
                page={page}
                setPage={setPage}
                setShowSearch={setShowSearch}
                platformsSorted={platformsSorted}
                setPlatformsSorted={setPlatformsSorted}
                platforms={platforms}
                setPlatforms={setPlatforms}
                genresSorted={genresSorted}
                setGenresSorted={setGenresSorted}
                genres={genres}
                setGenres={setGenres}
                noImg={noImg}
                ordering={ordering}
                setOrdering={setOrdering}
              />
            }
          />
          <Route path="/attributions" element={<Attributions />} />
          <Route
            path="/game/:id"
            element={
              <Game
                icon1={faBookmark}
                icon2={faComment}
                icon3="thumbs-down"
                icon4="thumbs-up"
                token={token}
                src={controlFour}
                alt="control GamePad"
                setShowSearch={setShowSearch}
                fav={fav}
                setFav={setFav}
                noImg={noImg}
              />
            }
          />
          <Route
            path="/games/favorites"
            element={
              <Favorites
                fav={fav}
                setFav={setFav}
                token={token}
                setSearch={setSearch}
                setShowSearch={setShowSearch}
                faTrash={faTrash}
              />
            }
          />
        </Routes>
        {showSignup && (
          <Signup
            showSignup={showSignup}
            setShowSignup={setShowSignup}
            faEye={faEye}
            faEyeSlash={faEyeSlash}
            icon3={faUser}
            icon4={faBookmark}
            icon5={faComment}
            token={token}
            setToken={setToken}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            controlFour={controlFour}
            alt="control GamePad"
            type1={type1}
            setType1={setType1}
            type2={type2}
            setType2={setType2}
          />
        )}
        {showLogin && (
          <Login
            setToken={setToken}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            controlFour={controlFour}
            faEye={faEye}
            faEyeSlash={faEyeSlash}
            icon3={faUser}
            icon4={faBookmark}
            icon5={faComment}
          />
        )}
      </Router>
    </>
  );
}

export default App;
