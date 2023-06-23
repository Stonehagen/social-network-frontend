import { useRef } from 'react';
import { OutsideClick } from '../methods/outsideClick';
import { useNavigate } from 'react-router-dom';
import Moon from '../img/moon.svg'
import MoonFill from '../img/moonFill.svg';
import Sun from '../img/sun.svg';
import SunFill from '../img/sunFill.svg';

const Logout = '../img/logout.svg';
const LogoutFill = '../img/logoutFill.svg';
const Messenger = '../img/messenger.svg';
const MessengerFill = '../img/messengerFill.svg';


const HeaderMenu = ({ loggingOut, setOpenMenu, lightMode, setLightMode }) => {
  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef, setOpenMenu);

  const navigate = useNavigate();

  return (
    <ul ref={wrapperRef}>
      <li
        className="LogoutButton"
        onClick={() => {
          navigate('/messenger');
          setOpenMenu(false);
        }}
        onMouseOver={(e) => (e.currentTarget.children[0].src = MessengerFill)}
        onMouseOut={(e) => (e.currentTarget.children[0].src = Messenger)}
      >
        <img src={Messenger} alt="" /> Messenger
      </li>
      <li
        className="LogoutButton"
        onClick={() => {
          setLightMode(!lightMode);
        }}
        onMouseOver={(e) => (e.currentTarget.children[0].src = lightMode ? MoonFill : Sun)}
        onMouseOut={(e) => (e.currentTarget.children[0].src = lightMode ? Moon : SunFill)}
      >
        <img src={lightMode ? Moon : Sun} alt="" />
        {lightMode ? 'Dark Mode' : 'Light Mode' }
      </li>
      <li
        className="LogoutButton"
        onClick={() => loggingOut()}
        onMouseOver={(e) => (e.currentTarget.children[0].src = LogoutFill)}
        onMouseOut={(e) => (e.currentTarget.children[0].src = Logout)}
      >
        <img src={Logout} alt="" /> LOGOUT
      </li>
    </ul>
  );
};

export default HeaderMenu;
