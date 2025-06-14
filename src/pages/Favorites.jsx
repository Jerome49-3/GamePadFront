import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//components
import Image from "../components/Image";

const Favorites = ({ fav, setFav, setShowSearch, faTrash }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setShowSearch(false);
  }, []);

  console.log("fav in favorites:", fav);

  return (
    <main>
      <div className="wrapper">
        <div className="boxFav">
          {fav.map((card, key = card.id) => {
            console.log("card in favorites:", card);
            const id = card.id;
            return (
              <Link to={`/${id}`} key={key}>
                <Image src={card.img} alt={card.name} />
                <div>
                  <h3>{card.name}</h3>
                </div>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="iconTrash"
                  onClick={(e) => {
                    e.preventDefault();
                    try {
                      let newFav;
                      newFav = fav.filter((favCard) => favCard.id !== card.id);
                      setFav(newFav);
                    } catch (error) {
                      console.log("%cError:", "color: red", error);
                    }
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Favorites;
