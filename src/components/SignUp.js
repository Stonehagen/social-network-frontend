import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKENDSERVER}/user/sign-up`,
        {
          firstName,
          lastName,
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
          console.log(res.data.error);
        } else {
          setErrors([]);
        }
      })
      .then(() => navigate('/login'))
      .catch((err) => {
        if (err.response.data.error) {
          setErrors(err.response.data.error);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="SignUp">
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <div className="formGroup">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            name="passwordConfirm"
            value={passwordCheck}
            id="passwordConfirm"
            placeholder="confirm password"
            type="password"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <div className="messages">
          {errors.map((error, index) => {
            return (
              <p className="errorMessage" key={index}>
                - ! {error.msg}
              </p>
            );
          })}
        </div>
        <button type="submit">Create</button>
        <button
          type="button"
          className="secondoryBtn"
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
