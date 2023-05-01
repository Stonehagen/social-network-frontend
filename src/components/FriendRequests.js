import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FriendRequests.css';
import People from '../img/people.svg';
import PeopleFill from '../img/peopleFill.svg';
import axios from 'axios';

const FriendRequests = ({ profile }) => {
  const [friendRequests, setFriendRequests] = useState([]);

  const navigate = useNavigate();

  const acceptRequest = (friend) => {};

  const rejectRequest = (friend) => {};

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequests/${profile._id}`,
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
          setFriendRequests(res.data.friendRequests);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className="FriendRequests">
      <div className="FriendsPreviewHeader">
        <h2
          onClick={() => navigate(`/profile/${profile._id}/friendRequests`)}
        >
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
