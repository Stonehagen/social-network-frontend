import '../styles/Header.css';
import CornLogo from '../img/corn.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = ({ user, logout, profilePicture }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const loggingOut = () => {
    logout();
    setOpenMenu(false);
    navigate('/login');
  };
  return (
    <div className="Header">
      <div>
        <img src={CornLogo} alt="Corn Logo" />
        <h3 onClick={() => navigate('/')}>CORNECT.ME</h3>
      </div>
      {user ? (
        <div>
          <img
            onClick={handleOpenMenu}
            className="profilePicture"
            src={
              profilePicture
                ? `${process.env.REACT_APP_BACKENDSERVER}/images/${profilePicture}`
                : `${process.env.REACT_APP_BACKENDSERVER}/img/profile.jpg`
            }
            alt=""
          />
          <div className="HeaderMenu">
            {openMenu ? (
              <ul>
                <li onClick={loggingOut}>LOGOUT</li>
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
