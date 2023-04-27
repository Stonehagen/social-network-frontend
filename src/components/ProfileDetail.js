import { useEffect, useState } from 'react';
import '../styles/ProfileDetail.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
    </div>
  );
};

export default ProfileDetail;
