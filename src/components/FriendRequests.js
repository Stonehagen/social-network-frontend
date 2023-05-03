import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FriendRequests.css';
import People from '../img/people.svg';
import PeopleFill from '../img/peopleFill.svg';

const FriendRequests = ({ profile }) => {
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
      .then((res) => getFriendRequests())
      .catch((err) => console.log(err))
      .finally(() => navigate(0));
  };

  const rejectRequest = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/rejectFriendrequest`,
        {
          acceptedFriend: id,
        },
      )
      .then((res) => getFriendRequests())
      .catch((err) => console.log(err))
      .finally(() => navigate(0));
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
    getFriendRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className="FriendRequests">
      <div className="FriendsPreviewHeader">
        <h2 onClick={() => navigate(`/profile/${profile._id}/friendRequests`)}>
          Friend Requests
        </h2>
        <button
          onClick={() => navigate(`/profile/${profile._id}/friendRequests`)}
          type="button"
          onMouseOver={(e) => (e.currentTarget.children[0].src = PeopleFill)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = People)}
        >
          <img src={People} alt="" />
          View all
        </button>
      </div>
      <div className="FriendRequestsContainer">
        {[...friendRequests].slice(0, 8).map((friendRequest, index) => {
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
                    onClick={() => acceptRequest(friendRequest)}
                    type="button"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => rejectRequest(friendRequest)}
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

export default FriendRequests;
