import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NewUsers.css';

const NewUsers = () => {
  const [profiles, setProfiles] = useState([]);

  const navigate = useNavigate();

  const getProfiles = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile/latest`)
      .then((res) => setProfiles(res.data.profiles))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="NewUsers">
      <h3>Do you know them?</h3>
      <ul>
        {profiles.map((profile, index) => {
          return (
            <li className="profilePreview" key={index}>
              <img
                onClick={() => navigate(`/profile/${profile._id}`)}
                src={`${process.env.REACT_APP_BACKENDSERVER}/images/${profile.photo}`}
                alt=""
              />
              <div className="profilePreviewText">
                <h4
                  onClick={() => navigate(`/profile/${profile._id}`)}
                >{`${profile.firstName} ${profile.lastName}`}</h4>
                <p>{profile.status}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewUsers;
