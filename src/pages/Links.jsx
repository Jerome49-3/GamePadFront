import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//components
import Image from '../components/Image';

const Links = (path, icon, classInfo, classInfoText, classIcon, infoText, linkText, classLink, src, alt, classImg, classLinkText) => {
  return (
    <>
      <Link to={path} className={classLink} >
        {src ? (<Image src={controlFour} alt='control GamePad' classImg={classImg} />) : (null)}
        {linkText ? (<p className={classLinkText}>{linkText}</p>) : (null)}
        {icon ? (<FontAwesomeIcon icon={icon} className={classIcon} />) : (null)}
        {classInfo ?
          (
            <div className={classInfo}>
              <h3 className={classInfoText}>{infoText}</h3>
            </div>
          ) : (null)}
      </Link>
    </>
  )
}

export default Links