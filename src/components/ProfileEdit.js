import { useEffect, useState } from 'react';
import '../styles/ProfileEdit.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CameraIcon from '../img/camera.svg';

const ProfileEdit = ({ user }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
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
        .then((res) => {
          if (res.data.error) {
            setErrors(res.data.error);
          } else {
            setErrors([]);
          }
        })
        .catch((err) => {
          if (err.response.data.error) {
            setErrors(err.response.data.error);
          } else {
            console.log(err);
          }
        });
    }
    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/profile`,
        {
          firstName,
          lastName,
          status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
        } else {
          setErrors([]);
        }
        navigate('/');
      })
      .catch((err) => {
        if (err.response.data.error) {
          setErrors(err.response.data.error);
        } else {
          console.log(err);
        }
      });
  };

  useEffect(() => {
    if (user) {
      axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
        } else {
          setErrors([]);
          setUserProfile(res.data.profile);
          setStatus(res.data.profile.status);
          setFirstName(res.data.profile.firstName);
          setLastName(res.data.profile.lastName);
        }
      })
      .catch((err) => {
        if (err.response.data.error) {
          setErrors(err.response.data.error);
        } else {
          console.log(err);
        }
      });
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  if (!userProfile) {
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
                  : userProfile.photo
                  ? `${process.env.REACT_APP_BACKENDSERVER}/images/${userProfile.photo}`
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
            onClick={() => navigate(`/profile/${userProfile._id}`)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
