import { useEffect, useState } from "react";
import axios from 'axios';
// import Image from "./Image";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Image from "./Image";

const GameLike = ({ id, isLoading, isSameLoading, setIsSameLoading }) => {
  const [dataSame, setDataSame] = useState();
  // console.log('id on GameLike:', id);

  useEffect(() => {
    const fetchDataSame = async () => {
      // console.log('id on GameLike:', id);
      try {
        const response = await axios.get(`http://localhost:3000/games/${id}/game-series`);
        if (response) {
          // console.log('response in GameLike:', response);
          // console.log('response.data in GameLike:', response.data);
          // console.log('response.data.results in GameLike:', response.data.results);
          setDataSame(response.data.results);
          // console.log('dataSame in GameLike:', dataSame);
          setIsSameLoading(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
    if (isLoading === false && id !== undefined) {
      // console.log('isLoading:', isLoading, 'id:', id);
      fetchDataSame();
      //je vérifie la valeur de same après l'appel de la fonction fetchDataSame()
      // console.log('same in if on second useEffect:', same);
    }
  }, [id, isLoading])


  return isSameLoading ? (<Loading />) : (
    <>
      <div className="title">
        <h2>Games Like</h2>
        <div className="lineRed"></div>
      </div>
      <div className="boxGameLike__content">
        {dataSame.message ? (
          <>
            <h2>{dataSame.message}</h2>
          </>
        ) : (
          <>
            {dataSame.map((same, key = index) => {
              // console.log('same:', same);
              const id = same.id;
              return (
                <Link to={`/${id}`} key={key} className={key > 4 ? 'hide' : ''}>
                  <Image src={same.background_image} alt={same.name} />
                  <p>{same.name}</p>
                </Link>
              )
            })}
          </>
        )}
      </div>
    </>
  )
}

export default GameLike