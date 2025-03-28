import { useState } from 'react';
import { useParams, redirect } from 'react-router-dom';
import moment from 'moment';

import axios from 'axios';
import TextArea from './TextArea';


//components
import Image from './Image';
import Input from './Input'

const PostReview = ({ showReview, setShowReview, token, id }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gameId, setGameId] = useState(id);
  const [errorMessage, setErrorMessage] = useState("");
  const date = moment().format("DD-MM-YYYY");
  const [dateReview, setDateReview] = useState(date);
  const [counter, setCounter] = useState(0);
  const [disabledUp, setDisabledUp] = useState(false);
  const [disabledDown, setDisabledDown] = useState(false);
  // console.log('typeof date:', typeof date);
  // console.log('date:', date);
  // const navigate = useNavigate;
  // console.log('title:', title, '\n', 'content:', content, '\n', 'gameId_1:', gameId);

  const handleSubmitReview = async (e) => {
    // console.log('gameId_2:', gameId);
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/review',
        {
          title,
          content,
          gameId,
          dateReview,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // console.log("title2:", title, "\n", "content2:", content);
      if (response) {
        // console.log('response:', response);
        alert('Review posted');
        setShowReview(false);
      } else if (error) {
        setErrorMessage(error.message);
        // console.log('errorMessage:', errorMessage);
      }
    } catch (error) {
      console.log('error.response', error.response);
    }
  }

  return token ? (
    <>
      <div className="boxModalReview">
        <div className="boxModalContentReview">
          <div className="boxReview">
            <div className='Header'>
              <div className="wrapper">
                <div className="boxHeaderTitle">
                  <h1>Write a review</h1>
                </div>
                <button onClick={() => {
                  { showReview === true ? (setShowReview(false)) : (null) }
                }}>X</button>
              </div>
            </div>
            <form onSubmit={handleSubmitReview} className="boxReviewForm">
              <div className="boxReviewTitle">
                <Input value={title} id="title" state={title} setState={setTitle} type="text" placeholder="Title" />
              </div>
              <div className="boxReviewContent">
                <TextArea value={content} id="content" state={content} setState={setContent} type="text" placeholder="Message" classTxtArea="txtArea" rows='10' cols='33' maxLength='250' />
              </div>
              <Input type='hidden' value={gameId} state={gameId} setState={setGameId} />
              <Input type='hidden' value={dateReview} state={dateReview} setState={setDateReview} />
              <div className="boxPublish">
                <Input type="submit" value="publish" />
              </div>
            </form>
          </div>
        </div>
        {console.log(errorMessage)}
      </div>
    </>
  ) : (redirect("/"))
}

export default PostReview