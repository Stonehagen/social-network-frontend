import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AllFriendRequests.css';
import ProfilePic from '../img/profile.svg';
import ProfilePicFill from '../img/profileFill.svg';
import axios from 'axios';

const AllFriendRequests = ({ user, profile }) => {
  const [friendRequests, setFriendRequests] = useState([]);

  const navigate = useNavigate();

  const acceptRequest = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/acceptFriendrequest`,
        {
          acceptedFriend: id,
        },
      )
      .then(() => getFriendRequests())
      .catch((err) => console.log(err))
  };

  const rejectRequest = (id) => {
    axios
    .put(
      `${process.env.REACT_APP_BACKENDSERVER}/profile/rejectFriendrequest`,
      {
        acceptedFriend: id,
      },
    )
    .then(() => getFriendRequests())
    .catch((err) => console.log(err))
  };

  const getFriendRequests = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequests/${profile._id}`,
      )
      .then((res) => setFriendRequests(res.data.friendRequests))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (profile && friendRequests.length === 0) {
      getFriendRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, friendRequests]);

  return (
    <div className="AllFriendRequests">
      <div className="FriendsPreviewHeader">
        <h2 onClick={() => navigate(`/profile/${profile._id}/friendRequests`)}>
          Friend Requests
        </h2>
        <button
          onClick={() => navigate(`/profile/${profile._id}`)}
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
      <div className="FriendRequestsContainer">
        {friendRequests.map((friendRequest, index) => {
          return (
            <div className="Friend" key={index}>
              <img
                onClick={() => navigate(`/profile/${friendRequest._id}`)}
                className="friendImage"
                src={`${process.env.REACT_APP_BACKENDSERVER}/images/${friendRequest.photo}`}
                alt={`${friendRequest.firstName} ${friendRequest.lastName}`}
              />
              <div className="friendText">
                <p
                  onClick={() => navigate(`/profile/${friendRequest._id}`)}
                >{`${friendRequest.firstName} ${friendRequest.lastName}`}</p>
                <div>
                  <button
                    onClick={() => acceptRequest(friendRequest._id)}
                    type="button"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectRequest(friendRequest._id)}
                    type="button"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllFriendRequests;
