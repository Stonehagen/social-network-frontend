import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/AllFriends.css';
import ProfilePic from '../img/profile.svg';
import ProfilePicFill from '../img/profileFill.svg';

const AllFriends = ({ user }) => {
  const [pageProfile, setPageProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const getPageProfile = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile/${id}`)
      .then((res) => setPageProfile(res.data.profile))
      .catch((err) => console.log(err));
  };

  const getFriends = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friends/${pageProfile._id}`,
      )
      .then((res) => setFriends(res.data.friends))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    getPageProfile();
    if (pageProfile) {
      getFriends();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pageProfile]);

  if (!pageProfile) {
    return <></>;
  }

  return (
    <div className="AllFriends">
      <div className="AllFriendsPreviewHeader">
        <h2>
          Friends of{' '}
          <Link
            to={`/profile/${pageProfile._id}`}
          >{`${pageProfile.firstName} ${pageProfile.lastName}`}</Link>
        </h2>
        <button
          onClick={() => navigate(`/profile/${pageProfile._id}`)}
          type="button"
          onMouseOver={(e) =>
            (e.currentTarget.children[0].src = ProfilePicFill)
          }
          onMouseOut={(e) => (e.currentTarget.children[0].src = ProfilePic)}
        >
          <img src={ProfilePic} alt="" />
          Go Back
        </button>
      </div>
      <div className="AllFriendsContainer">
        {friends.map((friend, index) => {
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
                <h4>{`${friend.firstName} ${friend.lastName}`}</h4>
                <p>{friend.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllFriends;
