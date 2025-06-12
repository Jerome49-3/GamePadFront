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
  faThumbsDown
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
import controlFour from "./assets/images/crossRed.png";
import noImg from "./assets/images/noImg.png";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [platforms, setPlatforms] = useState("");
  // console.log("platforms in App:", platforms);
  const [genres, setGenres] = useState("");
  // console.log("genres in App:", genres);
  // const [ordering, setOrdering] = useState("");
  // console.log("ordering in App:", ordering);
  const [count, setCount] = useState(0);
  // const [fav, setFav] = useState(Cookies.get('favorites') || []);
  // meme useState avec JSON.parse en retour
  const [fav, setFav] = useState(() => {
    const savedFav = Cookies.get("Collections");
    try {
      // console.log('JSON.parse(savedFav):', JSON.parse(savedFav));
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
  const [platformsArr, setPlatformsArr] = useState([]);
  // console.log('platformsArr in app:', platformsArr);
  const [genresArr, setGenresArr] = useState([]);
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
          src={controlFour}
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
                platformsArr={platformsArr}
                setPlatformsArr={setPlatformsArr}
                platforms={platforms}
                setPlatforms={setPlatforms}
                genres={genres}
                setGenres={setGenres}
                noImg={noImg}
                genresArr={genresArr}
                setGenresArr={setGenresArr}
              />
            }
          />

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
