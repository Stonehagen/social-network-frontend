import '../styles/Profile.css';
import { Link } from 'react-router-dom';

const Profile = ({ profile }) => {
  return (
    <div className="Profile">
      <div className='ProfileImageDiv'>
        <img
          src={`${process.env.REACT_APP_BACKENDSERVER}/images/${profile.photo}`}
          alt=""
        />
      </div>
      <div className='ProfileTextDiv'>
        <div>
          <h4>{`${profile.firstName} ${profile.lastName}`}</h4>
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
