import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/NewUsers.css';
import { Link, useNavigate } from 'react-router-dom';

const NewUsers = () => {
  const [profiles, setProfiles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile/latest`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        } else {
          setProfiles(res.data.profiles);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="NewUsers">
      <h3>Do you know them?</h3>
      <div>
        {profiles.map((profile, index) => {
          return (
            <div className="profilePreview" key={index}>
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
              <Link to={`/profile/${profile._id}`}>Profile</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewUsers;
