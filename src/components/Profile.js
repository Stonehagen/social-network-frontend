import '../styles/Profile.css';
import { Link } from 'react-router-dom';

const Profile = ({ userProfile }) => {

  return (
    <div className="Profile">
      <div>
        <img
          src={`${process.env.REACT_APP_BACKENDSERVER}/images/${userProfile.photo}`}
          alt=""
        />
      </div>
      <div>
        <h4>{`${userProfile.firstName} ${userProfile.lastName}`}</h4>
      </div>
      <div>
        <p>{`${userProfile.status}`}</p>
      </div>
      <Link to='/profile'>My Profile</Link>
    </div>
  );
};

export default Profile;
