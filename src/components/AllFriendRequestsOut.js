import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AllFriendRequests.css';

const ProfilePic = '../img/profile.svg';
const ProfilePicFill = '../img/profileFill.svg';

const AllFriendRequestsOut = ({ user, profile }) => {
  const [friendRequestsOut, setFriendRequestsOut] = useState([]);

  const navigate = useNavigate();

  const cancelFriendRequest = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequest/cancel`,
        {
          requestedFriend: id,
        },
      )
      .then(() => getFriendRequestsOut())
      .catch((err) => console.log(err));
  };

  const getFriendRequestsOut = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequestsOut/${profile._id}`,
      )
      .then((res) => setFriendRequestsOut(res.data.friendRequestsOut))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (profile && friendRequestsOut.length === 0) {
      getFriendRequestsOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, friendRequestsOut]);

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
        {friendRequestsOut.map((friendRequestOut, index) => {
          return (
            <div className="Friend" key={index}>
              <img
                onClick={() => navigate(`/profile/${friendRequestOut._id}`)}
                className="friendImage"
                src={`${process.env.REACT_APP_BACKENDSERVER}/images/${friendRequestOut.photo}`}
                alt={`${friendRequestOut.firstName} ${friendRequestOut.lastName}`}
              />
              <div className="friendText">
                <p
                  onClick={() => navigate(`/profile/${friendRequestOut._id}`)}
                >{`${friendRequestOut.firstName} ${friendRequestOut.lastName}`}</p>
                <div>
                  <button
                    onClick={() => cancelFriendRequest(friendRequestOut._id)}
                    type="button"
                  >
                    Cancel
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

export default AllFriendRequestsOut;
