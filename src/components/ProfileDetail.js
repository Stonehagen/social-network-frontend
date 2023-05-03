import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/ProfileDetail.css';
import message from '../img/message.svg';
import messageFill from '../img/messageFill.svg';
import friend from '../img/friend.svg';
import friendFill from '../img/friendFill.svg';
import Friends from './Friends';
import FriendRequests from './FriendRequests';

const ProfileDetail = ({ user, profile }) => {
  const [pageProfile, setPageProfile] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const getPageProfile = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile/${id}`)
      .then((res) => setPageProfile(res.data.profile))
      .catch((err) => console.log(err));
  };

  const handleFriendSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequest`, {
        requestedFriend: pageProfile._id,
      })
      .then()
      .catch((err) => console.log(err))
      .finally(() => navigate(0));
  };

  const cancelFriendRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequest/cancel`,
        {
          requestedFriend: pageProfile._id,
        },
      )
      .then()
      .catch((err) => console.log(err))
      .finally(() => navigate(0));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    getPageProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!profile || !pageProfile) {
    return <></>;
  }

  return (
    <div className="MainContainer">
      <div className="ProfileDetail">
        <div className="ProfileDetailImageDiv">
          <img
            src={`${process.env.REACT_APP_BACKENDSERVER}/images/${pageProfile.photo}`}
            alt=""
          />
        </div>
        <div className="ProfileDetailTextDiv">
          <div>
            <h4>{`${pageProfile.firstName} ${pageProfile.lastName}`}</h4>
          </div>
          <div>
            <p>{`${pageProfile.status}`}</p>
          </div>
          {pageProfile.user === user.id ? (
            <Link to="/profile/edit">Edit Profile</Link>
          ) : null}
        </div>
      </div>
      {pageProfile.user === user.id ? null : (
        <div className="ProfileMenu">
          <form onSubmit={handleFriendSubmit}>
            {pageProfile.friendRequestIn.includes(profile._id) ? (
              <button
                className="cancelRequest"
                type="button"
                onClick={() => cancelFriendRequest()}
                onMouseOver={(e) =>
                  (e.currentTarget.children[0].src = friendFill)
                }
                onMouseOut={(e) => (e.currentTarget.children[0].src = friend)}
              >
                <img src={friend} alt="" />
                Cancel Request
              </button>
            ) : pageProfile.friends.includes(profile._id) ? null : (
              <button
                className="menuBtn"
                type="submit"
                onMouseOver={(e) =>
                  (e.currentTarget.children[0].src = friendFill)
                }
                onMouseOut={(e) => (e.currentTarget.children[0].src = friend)}
              >
                <img src={friend} alt="" />
                Add Friend
              </button>
            )}
            <button
              className="menuBtn"
              type="button"
              onMouseOver={(e) =>
                (e.currentTarget.children[0].src = messageFill)
              }
              onMouseOut={(e) => (e.currentTarget.children[0].src = message)}
            >
              <img src={message} alt="" />
              Message
            </button>
          </form>
        </div>
      )}
      {pageProfile.user === user.id && profile.friendRequestIn.length > 0 ? (
        <FriendRequests profile={profile} />
      ) : null}
      <Friends pageProfile={pageProfile} />
    </div>
  );
};

export default ProfileDetail;
