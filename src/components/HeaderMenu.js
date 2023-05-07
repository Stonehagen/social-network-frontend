import { useRef } from 'react';
import Logout from '../img/logout.svg';
import LogoutFill from '../img/logoutFill.svg';
import { OutsideClick } from '../methods/outsideClick';

const HeaderMenu = ({ loggingOut, setOpenMenu }) => {
  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef, setOpenMenu);

  return (
    <ul ref={wrapperRef}>
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
