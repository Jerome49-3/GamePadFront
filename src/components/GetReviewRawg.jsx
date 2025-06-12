/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
//components
import Loading from "./Loading";
import Image from "./Image";
import Counter from "./Counter";

//images
import defaultAvatar from "../assets/images/user-avatar.png";

const GetReviewRawg = ({
  isLoading,
  isSameLoading,
  isEndloading,
  setIsEndloading,
  errorMessage,
  setErrorMessage,
  id,
  icon1,
  icon2,
  token,
}) => {
  const [review, setReview] = useState();

  // console.log('id on GetReviewRawg:', id);

  useEffect(() => {
    const fetchDataReview = async () => {
      try {
        //je verifie la precense de l'id dans le second use effect
        // console.log('id2 on useEffect in GetReviewRawg:', id);
        //je fais une requete axios à la route /review avec en params l'id du jeu obtenu dans le premier useEffect;
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/review/${id}`
        );
        if (response) {
          // console.log("response useEffect on GameReviewRawg:", response);
          // console.log('response.data useEffect on GameReviewRawg:', response.data);
          //je verifie la reponse de la requete dans le second use effect
          setReview(response.data);
          // console.log('review:', review);
          setIsEndloading(false);
        } else {
          console.log("errorResponse:", response);
        }
      } catch (error) {
        setErrorMessage(error.response);
        console.log("error.response:", error.response);
      }
    };
    //si isLoading(first useEffect) est false et id different d'undefined, j'appelle la fonction fetchDataReview()
    if (isLoading !== true && isSameLoading !== true && id !== undefined) {
      // console.log('isSameLoading on GetReviewRawg:', isSameLoading, '\n', 'id on GetReviewRawg:', id);
      fetchDataReview();
      //je vérifie la valeur de review après l'appel de la fonction fetchDataReview()
      // console.log('review in if on after call fetchDataReview():', review);
    }
  }, [id, isLoading, isSameLoading]);

  return isEndloading ? (
    <Loading />
  ) : (
    <div className="boxCommentMongoDb">
      {review.reviews.map((comment, key = review._id) => {
        // console.log('key ds review.reviews.map:', key);
        // console.log('comment', comment);
        const idCounter = comment._id;
        // console.log('idCounter', idCounter);
        return (
          <Fragment key={key}>
            {comment.message ? (
              <p>No review for this game</p>
            ) : (
              <div className="boxComment">
                <div className="boxComment__top">
                  <div className="boxComment__top__title">
                    <h3>{comment.title}</h3>
                  </div>
                  <div className="boxComment__top__content">
                    <h3>{comment.content}</h3>
                  </div>
                </div>
                <div className="boxComment__bottom">
                  <div className="left">
                    <div className="boxAvatar">
                      {review.user.avatar ? (
                        <Image
                          src={review.user.avatar.secure_url}
                          alt="avatar"
                        />
                      ) : (
                        <Image src={defaultAvatar} alt="avatar" />
                      )}
                    </div>
                    <div className="boxInfoUser">
                      <small>{comment.date}</small>
                      <p>{review.user.username}</p>
                    </div>
                  </div>
                  <div className="right">
                    <Counter
                      icon1={icon1}
                      icon2={icon2}
                      classIcon="iconGam"
                      token={token}
                      id={idCounter}
                      isEndloading={isEndloading}
                      comment={comment}
                    />
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
      {errorMessage}
    </div>
  );
};

export default GetReviewRawg;
