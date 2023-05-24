import { useRef } from 'react';
import { OutsideClick } from '../methods/outsideClick';
import { useNavigate } from 'react-router-dom';

const Logout = '../img/logout.svg';
const LogoutFill = '../img/logoutFill.svg';
const Messenger = '../img/messenger.svg';
const MessengerFill = '../img/messengerFill.svg';

const HeaderMenu = ({ loggingOut, setOpenMenu }) => {
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
