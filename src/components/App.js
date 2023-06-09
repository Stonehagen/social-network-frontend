import axios from 'axios';
import { io } from 'socket.io-client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { setAuthToken, getAuthToken } from '../methods/authToken';
import { setAxiosHeader } from '../methods/setAxiosHeader';
import '../styles/App.css';

import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import Header from './Header';
import Impress from './Impress';
import ProfileDetail from './ProfileDetail';
import ProfileEdit from './ProfileEdit';
import AllFriends from './AllFriends';
import AllFriendRequests from './AllFriendRequests';
import AllFriendRequestsOut from './AllFriendRequestsOut';
import Messenger from './Messenger';

const socket = io(process.env.REACT_APP_BACKENDSERVER);

const App = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [lightMode, setLightMode] = useState(false);
  let socketIdSend = false;

  const [cookies, removeCookie] = useCookies(['jwt_token']);
  const token = getAuthToken(cookies);

  if (token) {
    setAuthToken(token);
  }

  setAxiosHeader();

  const sendSocketId = (profileId) => {
    if (!socketIdSend) {
      socket.emit('setSocketId', { profileId: profileId, socketId: socket.id });
      socketIdSend = true;
    }
  };

  const login = (email, id) => {
    setUser({
      email,
      id,
    });
  };

  const logout = () => {
    removeCookie('jwt_token');
    setAuthToken();
    setUser(null);
    setProfile(null);
  };

  const setUserProfile = async (profile) => {
    await axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile`)
      .then((res) => {
        setProfile(res.data.profile);
        sendSocketId(res.data.profile._id);
      })
      .catch((err) => console.log(err));
  };

  const getUser = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/session`)
      .then((res) =>
        setUser({
          email: res.data.email,
          id: res.data._id,
        }),
      )
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!user && token) {
      getUser();
    } else {
      setLoading(false);
    }
    document.body.classList.toggle('lightmode', lightMode);
  }, [user, token, lightMode]);

  if (loading) {
    return <></>;
  }

  return (
    <BrowserRouter basename="/">
      <Header
        user={user}
        logout={logout}
        setUserProfile={setUserProfile}
        profile={profile}
        lightMode={lightMode}
        setLightMode={setLightMode}
        socket={socket}
      />
      <div className="Main">
        <Routes>
          <Route
            path="/"
            element={<Home user={user} profile={profile} socket={socket} />}
          />
          <Route
            path="/profile/edit"
            element={
              <ProfileEdit user={user} setUserProfile={setUserProfile} />
            }
          />
          <Route
            path="/profile/friendRequests"
            element={<AllFriendRequests user={user} profile={profile} />}
          />
          <Route
            path="/profile/friendRequestsOut"
            element={<AllFriendRequestsOut user={user} profile={profile} />}
          />
          <Route
            path="/profile/:id/friends"
            element={<AllFriends user={user} />}
          />
          <Route
            path="/profile/:id"
            element={<ProfileDetail user={user} profile={profile} />}
          />
          <Route
            path="/messenger"
            element={
              <Messenger user={user} profile={profile} socket={socket} />
            }
          />
          <Route path="/signup" element={<SignUp user={user} />} />
          <Route path="/login" element={<LogIn user={user} login={login} />} />
        </Routes>
        <Impress />
      </div>
    </BrowserRouter>
  );
};

export default App;
