import { useEffect, useState } from 'react';
import '../styles/ProfileDetail.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileDetail = ({ user }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [photo, setPhoto] = useState('');

  const navigate = useNavigate();

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);

    axios
      .post(`${process.env.REACT_APP_BACKENDSERVER}/profile/picture`, formData)
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
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
  }, []);

  if (!userProfile) {
    return <></>;
  }

  return (
    <div className="ProfileDetail">
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handlePhoto}
          />
          <button type="submit">Add Photo</button>
        </form>
      </div>
      <div>
        <img
          src={
            userProfile.photo
              ? `${process.env.REACT_APP_BACKENDSERVER}/images/${userProfile.photo}`
              : `${process.env.REACT_APP_BACKENDSERVER}/img/profile.jpg`
          }
          alt=""
        />
      </div>
      <div>
        <h4>{`${userProfile.firstName} ${userProfile.lastName}`}</h4>
      </div>
      <div>
        <p>Here we have a status Mockup!</p>
      </div>
    </div>
  );
};

export default ProfileDetail;
