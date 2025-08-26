import artistIcons from "../assets/json/artistIcons.json";
import { Fragment } from "react";

// Components
import Links from "../components/Links";

const Attributions = () => {
  return (
    <div className="boxAttributions">
      <div className="wrapper">
        <div className="boxArtistCard">
          <div className="ArtistNAme">
            <h2>Artist name:</h2>
            {artistIcons.map((icons, index) => {
              console.log("icons:", icons);
              return (
                <Fragment key={index}>
                  <h3>{icons.nameArtist}</h3>
                </Fragment>
              );
            })}
          </div>
          <div className="boxLinkIcons">
            <h2>Link Icons:</h2>
            {artistIcons.map((icons, index) => {
              console.log("icons:", icons);
              return (
                <Fragment key={index}>
                  <Links to={icons.url} linkText={icons.nameIcon} />
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attributions;
