import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../styles/ProfileDetail.css';

import Friends from './Friends';
import PageProfileMenu from './PageProfileMenu';
import UserProfileMenu from './UserProfileMenu';
import ProfilePostFeed from './ProflePostFeed';

const ProfileDetail = ({ user, profile }) => {
  const [pageProfile, setPageProfile] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const checkIfFriends = () => pageProfile.friends.includes(profile._id);
  const checkIfUserProfile = () => pageProfile.user === user.id;

  const getPageProfile = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile/${id}`)
      .then((res) => setPageProfile(res.data.profile))
      .catch((err) => console.log(err));
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
          {checkIfUserProfile() ? (
            <Link to="/profile/edit">Edit Profile</Link>
          ) : null}
        </div>
      </div>
      {checkIfUserProfile() ? (
        <UserProfileMenu profile={profile} />
      ) : (
        <PageProfileMenu
          profile={profile}
          pageProfile={pageProfile}
          getPageProfile={getPageProfile}
          checkIfFriends={checkIfFriends}
        />
      )}
      <Friends pageProfile={pageProfile} />
      <ProfilePostFeed
        pageProfile={pageProfile}
        checkIfFriends={checkIfFriends}
        checkIfUserProfile={checkIfUserProfile}
        profile={profile}
      />
    </div>
  );
};

export default ProfileDetail;
