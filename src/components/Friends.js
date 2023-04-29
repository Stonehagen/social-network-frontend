import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Friends.css';
import People from '../img/people.svg';
import PeopleFill from '../img/peopleFill.svg';

const Friends = ({ userProfile }) => {
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friends/${userProfile._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        } else {
          setFriends(res.data.friends);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return (
    <div className="Friends">
      <div className="FriendsPreviewHeader">
        <h2 onClick={() => navigate(`/profile/${userProfile._id}/friends`)}>
          Friends
        </h2>
        <button
          onClick={() => navigate(`/profile/${userProfile._id}/friends`)}
          type="button"
          onMouseOver={(e) => (e.currentTarget.children[0].src = PeopleFill)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = People)}
        >
          <img src={People} alt="" />
          View all
        </button>
      </div>
      <div className="FriendsContainer">
        {[...friends].slice(0, 8).map((friend, index) => {
          return (
            <div
              onClick={() => navigate(`/profile/${friend._id}`)}
              className="Friend"
              key={index}
            >
              <img
                className="friendImage"
                src={`${process.env.REACT_APP_BACKENDSERVER}/images/${friend.photo}`}
                alt={`${friend.firstName} ${friend.lastName}`}
              />
              <div className="friendText">
                <p>{friend.firstName}</p>
                <p>{friend.lastName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Friends;
