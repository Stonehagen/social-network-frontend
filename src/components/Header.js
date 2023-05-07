import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/Header.css';
import CornLogo from '../img/corn.svg';

import HeaderMenu from './HeaderMenu';
import Search from './Search';

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
            <Search
              profiles={profiles}
              handleCloseSearch={handleCloseSearch}
              setOpenSearch={setOpenSearch}
            />
          ) : null}
          <img
            onClick={() => handleOpenMenu()}
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
              <HeaderMenu loggingOut={loggingOut} setOpenMenu={setOpenMenu} />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
