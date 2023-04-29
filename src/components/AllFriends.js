import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/AllFriends.css';
import ProfilePic from '../img/profile.svg';
import ProfilePicFill from '../img/profileFill.svg';

const AllFriends = ({ user }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        }
        setUserProfile(res.data.profile);
        return axios.get(
          `${process.env.REACT_APP_BACKENDSERVER}/profile/friends/${res.data.profile._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      })
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        } else {
          setFriends(res.data.friends);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!userProfile) {
    return <></>;
  }

  return (
    <div className="AllFriends">
      <div className="AllFriendsPreviewHeader">
        <h2>
          Friends of{' '}
          <Link
            to={`/profile/${userProfile._id}`}
          >{`${userProfile.firstName} ${userProfile.lastName}`}</Link>
        </h2>
        <button
          onClick={() => navigate(`/profile/${userProfile._id}`)}
          type="button"
          onMouseOver={(e) => (e.currentTarget.children[0].src = ProfilePicFill)}
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
