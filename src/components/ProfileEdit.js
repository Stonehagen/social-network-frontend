import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/ProfileEdit.css';

const CameraIcon = '../img/camera.svg';

const ProfileEdit = ({ user, setUserProfile }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState(null);
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState('');
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo);

    if (preview) {
      axios
        .post(
          `${process.env.REACT_APP_BACKENDSERVER}/profile/picture`,
          formData,
        )
        .then((res) => setErrors(res.data.error ? res.data.error : []))
        .catch((err) => console.log(err));
    }
    axios
      .put(`${process.env.REACT_APP_BACKENDSERVER}/profile`, {
        firstName,
        lastName,
        status,
      })
      .then((res) => setErrors(res.data.error ? res.data.error : []))
      .catch((err) => console.log(err))
      .finally(() => {
        setUserProfile();
        navigate('/');
      });
  };

  const getProfile = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile`)
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
        } else {
          setErrors([]);
          setProfile(res.data.profile);
          setStatus(res.data.profile.status);
          setFirstName(res.data.profile.firstName);
          setLastName(res.data.profile.lastName);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!profile) {
    return <></>;
  }

  return (
    <div className="MainContainer">
      <div className="ProfileEdit">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="changePictureLabel" htmlFor="photoInput">
            <img
              className="profilePic"
              src={
                preview
                  ? preview
                  : profile.photo
                  ? `${process.env.REACT_APP_BACKENDSERVER}/images/${profile.photo}`
                  : `${process.env.REACT_APP_BACKENDSERVER}/img/profile.jpg`
              }
              alt=""
            />
            <img className="Camerabutton" src={CameraIcon} alt="" />
          </label>
          <input
            id="photoInput"
            hidden={true}
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            onChange={handlePhoto}
          />
          <div className="formGroup">
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              value={firstName}
              id="firstName"
              placeholder="first name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="lastName">Last Name</label>
            <input
              name="lastName"
              value={lastName}
              id="lastName"
              placeholder="last name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="status">Status</label>
            <input
              className="statusInput"
              type="text"
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <div className="messages">
            {errors.map((error, index) => {
              return (
                <p className="errorMessage" key={index}>
                  {error.msg}
                </p>
              );
            })}
          </div>
          <button type="submit">Save</button>
          <button
            type="button"
            className="secondoryBtn"
            onClick={() => navigate(`/profile/${profile._id}`)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
