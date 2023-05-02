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

const ProfileDetail = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const cancelRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequest/cancel`,
        {
          requestedFriend: profile._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        }
        navigate(0);
      })
      .catch((err) => console.log(err));
  }

  const handleFriendSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequest`,
        {
          requestedFriend: profile._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        }
        navigate(0);
      })
      .catch((err) => console.log(err));
  };

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
        } else {
          setProfile(res.data.profile);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        } else {
          setUserProfile(res.data.profile);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!profile || !userProfile) {
    return <></>;
  }

  return (
    <div className="MainContainer">
      <div className="ProfileDetail">
        <div className="ProfileDetailImageDiv">
          <img
            src={`${process.env.REACT_APP_BACKENDSERVER}/images/${profile.photo}`}
            alt=""
          />
        </div>
        <div className="ProfileDetailTextDiv">
          <div>
            <h4>{`${profile.firstName} ${profile.lastName}`}</h4>
          </div>
          <div>
            <p>{`${profile.status}`}</p>
          </div>
          {profile.user === user.id ? (
            <Link to="/profile/edit">Edit Profile</Link>
          ) : null}
        </div>
      </div>
      {profile.user === user.id ? null : (
        <div className="ProfileMenu">
          <form onSubmit={handleFriendSubmit}>
            {profile.friendRequestIn.includes(userProfile._id) ? (
              <button
                className="cancelRequest"
                type="button"
                onClick={() => cancelRequest()}
                onMouseOver={(e) =>
                  (e.currentTarget.children[0].src = friendFill)
                }
                onMouseOut={(e) => (e.currentTarget.children[0].src = friend)}
              >
                <img src={friend} alt="" />
                Cancel Request
              </button>
            ) : (
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
      {profile.user === user.id && profile.friendRequestIn.length > 0 ? (
        <FriendRequests profile={profile} />
      ) : null}
      <Friends profile={profile} />
    </div>
  );
};

export default ProfileDetail;
