import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/ProfileDetail.css';
import message from '../img/message.svg';
import messageFill from '../img/messageFill.svg';
import friend from '../img/friend.svg';
import friendFill from '../img/friendFill.svg';

const ProfileDetail = ({ user }) => {
  const [userProfile, setUserProfile] = useState(null);
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
        } else {
          setUserProfile(res.data.profile);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userProfile) {
    return <></>;
  }

  return (
    <div className="MainContainer">
      <div className="ProfileDetail">
        <div className="ProfileDetailImageDiv">
          <img
            src={`${process.env.REACT_APP_BACKENDSERVER}/images/${userProfile.photo}`}
            alt=""
          />
        </div>
        <div className="ProfileDetailTextDiv">
          <div>
            <h4>{`${userProfile.firstName} ${userProfile.lastName}`}</h4>
          </div>
          <div>
            <p>{`${userProfile.status}`}</p>
          </div>
          {userProfile.user === user.id ? (
            <Link to="/profile/edit">Edit Profile</Link>
          ) : null}
        </div>
      </div>
      {userProfile.user === user.id ? null : (
        <div className="ProfileMenu">
          <form>
            <button
              onMouseOver={(e) => (e.currentTarget.children[0].src = friendFill)}
              onMouseOut={(e) => (e.currentTarget.children[0].src = friend)}
            >
              <img src={friend} alt="" />
              Add Friend
            </button>
            <button
              onMouseOver={(e) => (e.currentTarget.children[0].src = messageFill)}
              onMouseOut={(e) => (e.currentTarget.children[0].src = message)}
            >
              <img src={message} alt="" />Message</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
