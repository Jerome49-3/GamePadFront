import { useEffect } from 'react';
import { Link } from 'react-router-dom';

//components
import Image from '../components/Image';

const Favorites = ({ fav, setShowSearch }) => {
  useEffect(() => {
    setShowSearch(false);
  }, [])

  console.log('fav in favorites:', fav);

  return (
    <main>
      <div className="wrapper">
        <div className="boxFav">
          {fav.map((card, key = card.id) => {
            console.log('card in favorites:', card);
            const id = card.id;
            return (
              <Link to={`/${id}`} key={key}>
                <Image src={card.img} alt={card.name} />
                <div>
                  <h3>{card.name}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Favorites