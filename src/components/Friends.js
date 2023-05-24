import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Friends.css';

const People = '../img/people.svg';
const PeopleFill = '../img/peopleFill.svg';

const Friends = ({ pageProfile }) => {
  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();

  const getFriends = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friends/${pageProfile._id}`,
      )
      .then((res) => setFriends(res.data.friends))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageProfile]);

  return (
    <div className="Friends">
      <div className="FriendsPreviewHeader">
        <h2 onClick={() => navigate(`/profile/${pageProfile._id}/friends`)}>
          Friends
        </h2>
        <button
          onClick={() => navigate(`/profile/${pageProfile._id}/friends`)}
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
