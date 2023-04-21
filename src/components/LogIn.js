import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import '../styles/LogIn.css';

import { setAuthToken } from '../methods/setAuthToken';

const LogIn = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(['jwt_token']);

  const navigate = useNavigate();

  const saveJWTinCookie = (token) => {
    setCookie('jwt_token', token, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      path: '/',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKENDSERVER}/user/log-in`,
        {
          email,
          password,
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
          saveJWTinCookie(res.data.token);
          setAuthToken(res.data.token);
          login(res.data.user.email, res.data.user.name);
        }
      })
      .then(() => navigate('/'))
      .catch((err) => {
        if (err.response.data.error) {
          setErrors(err.response.data.error);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="LogIn">
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            value={email}
            id="email"
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={password}
            id="password"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
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
        <button type="submit">Log In</button>
        <button
          type="button"
          className="secondoryBtn"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default LogIn;
