import { useRef } from 'react';
import { OutsideClick } from '../methods/outsideClick';
import { useNavigate } from 'react-router-dom';
import Close from '../img/close.svg';
import CloseFill from '../img/closeFill.svg';

const Search = ({ profiles, handleCloseSearch, setOpenSearch}) => {
  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef, setOpenSearch);
  const navigate = useNavigate();

  return (
    <div ref={wrapperRef} className="SearchMenu">
      <ul onClick={() => handleCloseSearch()}>
        {profiles.map((foundProfile, index) => {
          return (
            <li className="searchPreview" key={index}>
              <img
                onClick={() => navigate(`/profile/${foundProfile._id}`)}
                src={`${process.env.REACT_APP_BACKENDSERVER}/images/${foundProfile.photo}`}
                alt=""
              />
              <div className="searchPreviewText">
                <h4
                  onClick={() => navigate(`/profile/${foundProfile._id}`)}
                >{`${foundProfile.firstName} ${foundProfile.lastName}`}</h4>
              </div>
            </li>
          );
        })}
        <li
          className="CloseButton"
          onClick={() => handleCloseSearch()}
          onMouseOver={(e) => (e.currentTarget.children[0].src = CloseFill)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = Close)}
        >
          <img src={Close} alt="" /> CLOSE
        </li>
      </ul>
    </div>
  );
};

export default Search;
