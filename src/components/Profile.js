import '../styles/Profile.css';
import { Link, useNavigate } from 'react-router-dom';

const Profile = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <div className="Profile">
      <div className="ProfileImageDiv">
        <img
          onClick={() => navigate(`/profile/${profile._id}`)}
          src={`${process.env.REACT_APP_BACKENDSERVER}/images/${profile.photo}`}
          alt=""
        />
      </div>
      <div className="ProfileTextDiv">
        <div>
          <h4
            onClick={() => navigate(`/profile/${profile._id}`)}
          >{`${profile.firstName} ${profile.lastName}`}</h4>
        </div>
        <div>
          <p>{`${profile.status}`}</p>
        </div>
        <Link to={`/profile/${profile._id}`}>My Profile</Link>
      </div>
    </div>
  );
};

export default Profile;
