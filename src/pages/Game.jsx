import { useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Loading from '../components/Loading'
import Image from "../components/Image";
import Button from "../components/Button";
import GameLike from "../components/GameLike";
import GetReviewRawg from "../components/GetReviewRawg";
import PostReview from "../components/PostReview";
import Footer from "../components/Footer";

const Game = ({ icon1, icon2, icon3, icon4, token, errorMessage, setErrorMessage, setShowSearch, fav, setFav, noImg }) => {
  // console.log('fav in game:', fav);
  // console.log('icon3:', icon3, '\n:', 'icon4:', icon4);
  const [data, setData] = useState();
  // console.log('data on GamePage:', data);
  const [date, setDate] = useState();
  // console.log('date on GamePage:', date);
  // console.log('collections in game:', collections);
  // console.log('typeof collections in game:', typeof collections);

  const [isLoading, setIsLoading] = useState(true);
  const [isSameLoading, setIsSameLoading] = useState(true);
  const [isEndloading, setIsEndloading] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const { id } = useParams();
  // console.log('id on GamePage:', id);

  const handleShowReview = () => {
    showReview === false ? (setShowReview(true)) : (setShowReview(false))
  }

  useEffect(() => {
    setShowSearch(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/game/${id}`)
        if (response) {
          // console.log('response.data in first useEffect:', response.data);
          setData(response.data.game);
          // console.log('data in useEffect:', data);
          setDate(response.data.date);
          // console.log('date on /game:', date);
          setIsLoading(false);
        }
      } catch (error) {
        console.log('error.response:', error.response);
      }
    }
    fetchData();
  }, [id])

  return isLoading ? (<Loading />) : (
    <Fragment>
      <main className="boxGame">
        <div className="wrapper">
          <div className="top">
            <div className="title">
              <h1>{data.name}</h1>
              <div className="lineRed"></div>
            </div>
            <article>
              <div className="left">
                {data.background_image ? (<Image src={data.background_image} alt={data.name} />) : data.background_image_additional ? (<Image src={data.background_image_additional} alt={data.name} />) : (<Image src={noImg} alt='no image' />)}
              </div>
              <div className="right">
                <div className="boxCollecReview">
                  <button className="collec" onClick={() => {
                    //je crée un clone de mon useState Fav;
                    const newFav = [...fav];
                    // console.log('data in onClick:', data);
                    const objData = {
                      id: data.id,
                      img: data.background_image,
                      imgAdd: data.background_image_additional,
                      name: data.name
                    };
                    // console.log('objData in onClick:', objData);
                    newFav.push(objData);
                    // console.log('newFav in onClick:', newFav);
                    // console.log('Array.isArray(newFav) in onClick:', Array.isArray(newFav));
                    //je l'ajoute à mon useState fav
                    setFav(newFav);
                    // console.log('fav in onClick:', fav);
                    // console.log('Array.isArray(fav) in onClick:', Array.isArray(fav));
                    //je crée un cookie avec la valeur de newFav
                    const strNewFav = JSON.stringify(newFav);
                    // console.log('strNewFav in onClick:', strNewFav);
                    // console.log('typeof strNewFav in onClick:', typeof strNewFav);
                    Cookies.set('Collections', strNewFav, { expires: 15, secure: true });
                    // console.log('Cookies.set in onClick:', Cookies.set('favorites', strNewFav, { expires: 15, secure: true }));
                  }}><p>Saved to collection</p>
                    <FontAwesomeIcon icon={icon1} className='iconFav' />
                  </button>
                  {/* Test Cookie */}
                  {/* <button onClick={() => {
                    const test1 = "blabla"
                    const test2 = {
                      message: "blabla",
                      number: 123,
                      url: "https://www.google.com/search?q=gymnastique+artistique+jeux+olympiques&oi=ddle&ct=335645768&hl=fr&source=doodle-ntp&ved=0ahUKEwjQ3sO3_8uHAxVaTKQEHTcxD-oQPQgB"
                    }
                    const strTest2 = JSON.stringify(test2);
                    console.log('strTest2:', strTest2);
                    Cookies.set('test2', strTest2, { expires: 15, secure: true })
                  }}>add a cookie</button> */}
                  {/* <Button classButton="collec" buttonText="Saved to collection" icon={icon1} classIcon="iconFav" fav={fav} setFav={setFav} /> */}
                  <Button classButton="review" buttonText="Add a review" handleClick={handleShowReview} classIcon="iconRev" icon={icon2} />
                </div>
                <div className="boxInfoGames">
                  <div className="boxInfoGames__top">
                    <div className="boxInfoGames__top__platfGenr">
                      <div className="boxInfoGames__top__platfGenr__platforms">
                        <h3>Plateforms</h3>
                        {data.platforms.map((platform, key = uuidv4()) => {
                          // console.log('platform:', platform);
                          return (
                            // <Fragment>
                            //   <div key={key}>{platform.platform.name}</div>
                            //   {/* {console.log('key on platform:', key)} */}
                            // </Fragment>
                          )
                        })}
                      </div>
                      <div className="boxInfoGames__top__platfGenr__genre">
                        <h3>Genres</h3>
                        {data.genres.map((genre, key = uuidv4()) => {
                          // console.log('genre:', genre);
                          return (
                            <Fragment key={key}>
                              <div>{genre.name}</div>
                              {/* {console.log('key on genre:', key)} */}
                            </Fragment>
                          )
                        })}
                      </div>
                    </div>
                    <div className="boxInfoGames__top__releaseDev">
                      <div className="boxInfoGames__top__releaseDev__releasedDate">
                        <h3>Released date</h3>
                        {date !== "Jan 01, 1970" ? (<p>{date}</p>) : (<p>No information</p>)}
                      </div>
                      <div className="boxInfoGames__top__releaseDev__develloper">
                        <h3>Developer</h3>
                        {data.developers.length !== 0 ? (<>
                          {data.developers.map((dev, key = uuidv4()) => {
                            // console.log('dev:', dev);
                            return (
                              <Fragment key={key}>
                                <div >{dev.name}</div>
                                {/* {console.log('key on dev:', key)} */}
                              </Fragment>
                            )
                          })}
                        </>) : (<p>No information</p>)}

                      </div>
                    </div>
                    <div className="boxInfoGames__top__publichAge">
                      <div className="boxInfoGames__top__publichAge__publisher">
                        <h3>Publisher</h3>
                        {data.publishers.length !== 0 ? (
                          <>
                            {data.publishers.map((publisher, key = uuidv4()) => {
                              // console.log('publisher:', publisher);
                              return (
                                <Fragment key={key}>
                                  {publisher ? (<div>{publisher.name}</div>) : (<p>No Information</p>)}
                                  {/* {console.log('publisher on dev:', key)} */}
                                </Fragment>
                              )
                            })}
                          </>
                        ) : (<p>No information</p>)}
                      </div>
                      <div className="boxInfoGames__top__publichAge__AgeRating">
                        <h3>Age Ratings</h3>
                        {data.esrb_rating ? (<>{data.esrb_rating.name}</>) : (<>no information</>)}
                      </div>
                    </div>
                  </div>
                  <div className="boxInfoGames__bottom">
                    <div className="about">
                      <h3>About</h3>
                      <p>{data.description_raw}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="boxGameLike">
            <GameLike id={id} isSameLoading={isSameLoading} setIsSameLoading={setIsSameLoading} isLoading={isLoading} />
          </div>
          <div className="bottom">
            <div className="title">
              <h1>Review</h1>
              <div className="lineRed"></div>
            </div>
            <GetReviewRawg errorMessage={errorMessage} setErrorMessage={setErrorMessage} isLoading={isLoading} isSameLoading={isSameLoading} isEndloading={isEndloading} setIsEndloading={setIsEndloading} id={id} icon1={icon3} icon2={icon4} token={token} />
          </div>
        </div>
        {showReview && <PostReview showReview={showReview} setShowReview={setShowReview} token={token} id={data.id} />}
      </main>
      <Footer />
    </Fragment>
  )
}


export default Game