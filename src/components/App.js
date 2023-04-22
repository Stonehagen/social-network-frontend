import axios from 'axios';
import { useCookies } from 'react-cookie';
import { setAuthToken } from '../methods/setAuthToken';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/App.css';

import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import Header from './Header';
import Impress from './Impress';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [cookies, removeCookie] = useCookies(['jwt_token']);
  const token =
    cookies.jwt_token === 'undefined' ? undefined : cookies.jwt_token;
  if (token) {
    setAuthToken(token);
  }

  const login = (email, id) => {
    setUser({
      email,
      id,
    });
  };

  const logout = () => {
    setUser();
    setAuthToken();
    removeCookie('jwt_token');
  };

  useEffect(() => {
    console.log('1')
    if (!user && token) {
      axios
        .get(`${process.env.REACT_APP_BACKENDSERVER}/session`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          if (res.data.error) {
            setLoading(false);
            return res.data.error;
          } else {
            setUser({
              email: res.data.email,
              id: res.data._id,
            });
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <BrowserRouter basename="/">
      <Header user={user} logout={logout} />
      <div className="Main">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signup" element={<SignUp user={user} />} />
          <Route path="/login" element={<LogIn user={user} login={login} />} />
        </Routes>
        <Impress />
      </div>
    </BrowserRouter>
  );
};

export default App;
