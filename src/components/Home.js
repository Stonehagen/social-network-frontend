import { useEffect, useState } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import axios from 'axios';

const Home = ({ user }) => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="Home">
      <div>{userProfile ? <Profile userProfile={userProfile} /> : null}</div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Home;
