import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/Header.css';
import CornLogo from '../img/corn.svg';
import Close from '../img/close.svg';
import CloseFill from '../img/closeFill.svg';
import Logout from '../img/logout.svg';
import LogoutFill from '../img/logoutFill.svg';

const Header = ({ user, logout, setUserProfile, profile }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [profiles, setProfiles] = useState(null);
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
    setProfiles(null);
  };

  const loggingOut = () => {
    setOpenMenu(false);
    logout();
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      axios
        .get(`${process.env.REACT_APP_BACKENDSERVER}/profile/search/${search}`)
        .then((res) => {
            setProfiles(res.data.profiles);
            handleOpenSearch();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (user) {
      setUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="Header">
      <div>
        <img
          className="CornIcon"
          onClick={() => navigate('/')}
          src={CornLogo}
          alt="Corn Logo"
        />
        <h3 onClick={() => navigate('/')}>CORNECT.ME</h3>
      </div>
      {user ? (
        <div className="headerRight">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="search..."
              id="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {profiles && openSearch ? (
            <div className="SearchMenu">
              <ul onClick={() => handleCloseSearch()}>
                {profiles.map((foundProfile, index) => {
                  return (
                    <li className="searchPreview" key={index}>
                      <img
                        onClick={() => navigate(`/profile/${foundProfile._id}`)}
                        src={`${process.env.REACT_APP_BACKENDSERVER}/images/${foundProfile.photo}`}
                        alt=""
                      />
                      <div className="searchPreviewText">
                        <h4
                          onClick={() =>
                            navigate(`/profile/${foundProfile._id}`)
                          }
                        >{`${foundProfile.firstName} ${foundProfile.lastName}`}</h4>
                      </div>
                    </li>
                  );
                })}
                <li
                  className="CloseButton"
                  onClick={() => handleCloseSearch()}
                  onMouseOver={(e) =>
                    (e.currentTarget.children[0].src = CloseFill)
                  }
                  onMouseOut={(e) => (e.currentTarget.children[0].src = Close)}
                >
                  <img src={Close} alt="" /> CLOSE
                </li>
              </ul>
            </div>
          ) : null}
          <img
            onClick={handleOpenMenu}
            className="profilePicture"
            src={
              profile
                ? `${process.env.REACT_APP_BACKENDSERVER}/images/${profile.photo}`
                : null
            }
            alt=""
          />
          <div className="HeaderMenu">
            {openMenu ? (
              <ul>
                <li
                  className="LogoutButton"
                  onClick={() => loggingOut()}
                  onMouseOver={(e) =>
                    (e.currentTarget.children[0].src = LogoutFill)
                  }
                  onMouseOut={(e) => (e.currentTarget.children[0].src = Logout)}
                >
                  <img src={Logout} alt="" /> LOGOUT
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
