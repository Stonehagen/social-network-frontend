import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OutsideClick } from '../methods/outsideClick';
import '../styles/Likes.css';

const Likes = ({ likes, setDisplayLikes }) => {
  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef, setDisplayLikes);

  const navigate = useNavigate();

  return (
    <div ref={wrapperRef} className="LikePopup">
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
