import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OutsideClick } from '../methods/outsideClick';
import '../styles/Likes.css';
import CloseRed from '../img/closeRed.svg';
import CloseFillRed from '../img/closeFillRed.svg';

const Likes = ({ likes, setDisplayLikes }) => {
  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef, setDisplayLikes);

  const navigate = useNavigate();

  return (
    <div ref={wrapperRef} className="LikePopup">
      <div className='likesHeader'>
        <h4>Likes of this post</h4>
        <button
          className="closeLikes"
          type="button"
          onClick={() => setDisplayLikes(false)}
          onMouseOver={(e) => (e.currentTarget.children[0].src = CloseFillRed)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = CloseRed)}
        >
          <img src={CloseRed} alt="" />
        </button>
      </div>

      <ul className="likes">
        {likes.map((like, index) => {
          return (
            <li onClick={() => navigate(`/profile/${like._id}`)} key={index}>
              <img
                className="LikeImage"
                src={`${process.env.REACT_APP_BACKENDSERVER}/images/${like.photo}`}
                alt=""
              />
              {`${like.firstName} ${like.lastName}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Likes;
