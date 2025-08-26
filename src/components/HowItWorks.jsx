import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//json
import txtAuth from "../assets/json/txtAuth.json";

//components
import Image from "./Image";

const HowItWorks = ({
  icon1,
  icon2,
  icon3,
  classIcon,
  show,
  setShow,
  controlFour,
}) => {
  return (
    <div className="boxHowItWorks">
      <div className="HowItWorksTop">
        <button
          onClick={() => {
            {
              show === true ? setShow(false) : null;
            }
          }}
        >
          <Image src={controlFour} alt="cross" />
        </button>
      </div>
      <div className="HowItWorksBottom">
        <div className="HowItWorksBottom__title">
          <h1>{txtAuth.title}</h1>
          <div className="lineRed"></div>
        </div>
        <div className="HowItWorksBottom__content">
          <div className="HowItWorksBottom__content__divTxt">
            <FontAwesomeIcon icon={icon1} className={classIcon} />
            <p>{txtAuth.txtUser}</p>
          </div>
          <div className="HowItWorksBottom__content__divTxt">
            <FontAwesomeIcon icon={icon2} className={classIcon} />
            <p>{txtAuth.txtFav}</p>
          </div>
          <div className="HowItWorksBottom__content__divTxt">
            <FontAwesomeIcon icon={icon3} className={classIcon} />
            <p>{txtAuth.txtComment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
